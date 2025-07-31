import React, { useState, useRef, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid'
import interactionPlugin from '@fullcalendar/interaction'

// Shadcn UI Components
import { BookingDrawer } from '@/components/ui/drawer'
import ParticipantsModal from '@/components/ParticipantsModal'

// Define types for better type safety
interface BookingData {
  date: string
  startTime: string
  endTime: string
  duration: number
  courtId: string
  courtName: string
  basePrice: number
}

interface Participant {
  id: string
  name: string
  isOrganizer: boolean
}



const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('29.07')
  const [activeTab, setActiveTab] = useState('Booking')
  const [isCalendarEnabled, setIsCalendarEnabled] = useState(true) // Calendar toggle state
  
  // Booking system states
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [bookingData, setBookingData] = useState<BookingData | null>(null)
  const [selectedStartTime, setSelectedStartTime] = useState('')
  const [selectedDuration, setSelectedDuration] = useState(60)
  
  // Participants modal state
  const [isParticipantsModalOpen, setIsParticipantsModalOpen] = useState(false)
  const [selectedEventParticipants, setSelectedEventParticipants] = useState<Participant[]>([])
  const [selectedEventTime, setSelectedEventTime] = useState('')
  const [selectedEventCourt, setSelectedEventCourt] = useState('')
  
  // Reference to FullCalendar component for programmatic control
  const calendarRef = useRef<FullCalendar>(null)

  // Debug effect to monitor drawer state
  useEffect(() => {
    console.log('Drawer state changed:', isDrawerOpen)
  }, [isDrawerOpen])



  // Convert selected date from DD.MM format to full date for FullCalendar
  const getFullDate = (dateStr: string) => {
    const [day, month] = dateStr.split('.')
    const year = '2025' // Using 2025 as shown in your design
    return `${year}-${month}-${day}`
  }

  // Calendar dates matching the HTML structure
  const dates = [
    { day: 'Fr', date: '25.07' },
    { day: 'Sa', date: '26.07' },
    { day: 'Su', date: '27.07' },
    { day: 'Mo', date: '28.07' },
    { day: 'Tu', date: '29.07' },
    { day: 'We', date: '30.07' },
    { day: 'Th', date: '31.07' },
    { day: 'Fr', date: '01.08' },
    { day: 'Sa', date: '02.08' },
    { day: 'Su', date: '03.08' },
    { day: 'Mo', date: '04.08' },
    { day: 'Tu', date: '05.08' },
    { day: 'We', date: '06.0' }
  ]

  // Define court resources for FullCalendar
  const courtResources = [
    { id: 'court1', title: 'Court 1' },
    { id: 'court2', title: 'Court 2' },
    { id: 'court3', title: 'Court 3' }
  ]

  // Duration options
  const durationOptions = [
    { minutes: 60, label: '60min', price: 25 },
    { minutes: 90, label: '90min', price: 35 },
    { minutes: 120, label: '120min', price: 45 }
  ]



  // Mock participant data for bookings
  const mockParticipants = {
    '1': [
      { id: '1', name: 'Daniel Schweri', isOrganizer: true },
      { id: '2', name: 'David Herzog', isOrganizer: false },
      { id: '3', name: 'Tobias Nafzger', isOrganizer: false }
    ],
    '3': [
      { id: '4', name: 'Maria Garcia', isOrganizer: true },
      { id: '5', name: 'Carlos Rodriguez', isOrganizer: false }
    ]
  }

  // Sample booking events with color coding
  const generateEventsForDate = (date: string) => {
    return [
      {
        id: '1',
        resourceId: 'court1',
        title: 'Booked',
        start: `${date}T08:00:00`,
        end: `${date}T09:30:00`,
        backgroundColor: '#ef4444',
        borderColor: '#dc2626',
        organizer: 'Daniel Schweri',
        participants: mockParticipants['1']
      },
      {
        id: '3',
        resourceId: 'court2',
        title: 'Booked',
        start: `${date}T14:00:00`,
        end: `${date}T16:00:00`,
        backgroundColor: '#ef4444',
        borderColor: '#dc2626',
        organizer: 'Maria Garcia',
        participants: mockParticipants['3']
      },
      {
        id: '4',
        resourceId: 'court3',
        title: 'Maintenance',
        start: `${date}T09:00:00`,
        end: `${date}T12:00:00`,
        backgroundColor: '#f59e0b',
        borderColor: '#d97706'
      }
    ]
  }

  // Handle date selection from horizontal picker
  const handleDateSelect = (dateStr: string) => {
    setSelectedDate(dateStr)
    
    // Update FullCalendar to show the selected date
    const calendarApi = calendarRef.current?.getApi()
    if (calendarApi) {
      const fullDate = getFullDate(dateStr)
      calendarApi.gotoDate(fullDate)
      
      // Clear existing events and add new ones for the selected date
      calendarApi.removeAllEvents()
      const newEvents = generateEventsForDate(fullDate)
      newEvents.forEach(event => calendarApi.addEvent(event))
    }
  }

  // Handle event click on FullCalendar
  const handleEventClick = (clickInfo: any) => {
    const event = clickInfo.event
    const eventData = event.extendedProps
    
    // Only show participants modal for booked events
    if (event.title === 'Booked' && eventData.participants) {
      const startTime = event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      const endTime = event.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      const timeRange = `${startTime} – ${endTime}`
      
      setSelectedEventParticipants(eventData.participants)
      setSelectedEventTime(timeRange)
      setSelectedEventCourt(event.getResources()[0]?.title || 'Unknown Court')
      setIsParticipantsModalOpen(true)
    } else {
      // For non-booked events, show a simple alert
      alert(`Clicked on: ${event.title} for ${event.getResources()[0]?.title || 'Unknown Court'}`)
    }
  }

  // Handle time slot selection on FullCalendar - Open drawer (S1)
  const handleTimeSlotSelect = (selectInfo: any) => {
    console.log('Time slot selected:', selectInfo) // Debug log
    const courtResource = selectInfo.resource
    const startTime = selectInfo.start
    const endTime = selectInfo.end
    
    // Calculate duration in minutes
    const duration = (endTime.getTime() - startTime.getTime()) / (1000 * 60)
    
    // Set booking data
    const booking: BookingData = {
      date: selectedDate,
      startTime: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      endTime: endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      duration: duration,
      courtId: courtResource.id,
      courtName: courtResource.title,
      basePrice: 25 // Default base price
    }
    
    setBookingData(booking)
    setSelectedStartTime(booking.startTime)
    setSelectedDuration(duration)
    setIsDrawerOpen(true)
    console.log('Drawer should be open now, isDrawerOpen:', true) // Debug log
  }



  // Handle calendar toggle
  const handleCalendarToggle = (enabled: boolean) => {
    setIsCalendarEnabled(enabled)
    
    if (!enabled) {
      // Calendar OFF: Hide calendar and open drawer
      setIsDrawerOpen(true)
      
      // Set default booking data for manual selection
      setBookingData({
        date: selectedDate,
        startTime: '17:00',
        endTime: '18:00',
        duration: 60,
        courtId: 'court1',
        courtName: 'Court 1',
        basePrice: 25
      })
      setSelectedStartTime('17:00')
      setSelectedDuration(60)
    } else {
      // Calendar ON: Close drawer if open and show calendar
      setIsDrawerOpen(false)
    }
  }

  return (
    <>
      <style>
        {`
          @keyframes slideUp {
            from {
              transform: translateY(100%);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          
          /* Responsive drawer styles for different screen sizes */
          @media (max-width: 768px) {
            .drawer-content {
              padding: 20px 20px !important;
            }
            .drawer-button {
              flex: 1 1 calc(50% - 5px) !important;
              max-width: none !important;
            }
          }
          
          @media (max-width: 480px) {
            .drawer-content {
              padding: 20px 15px !important;
            }
            .drawer-button {
              flex: 1 1 100% !important;
              max-width: none !important;
            }
          }
        `}
      </style>
      <div style={{ 
        fontFamily: 'Roboto, sans-serif', 
        backgroundColor: '#f4f7fa', 
        color: '#333', 
        margin: 0, 
        padding: 0,
        minHeight: '100vh'
      }}>
      {/* Header */}
      <header style={{ 
        backgroundColor: '#fff', 
        padding: '20px 0', 
        display: 'flex', 
        justifyContent: 'center'
      }}>
        <div style={{ 
          width: '100%',
          maxWidth: '1200px',
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: '0 40px'
        }}>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>AVAILIO</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Time spent well - powered by Fairgate</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span>EN</span>
              <span>▼</span>
            </div>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              backgroundColor: '#4ade80', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'white'
            }}>
              👤
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div style={{ 
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{ 
          width: '100%',
          maxWidth: '1200px',
          padding: '0 40px'
        }}>
          {/* Club Name */}
          <div style={{ 
            fontSize: '20px', 
            fontWeight: '500', 
            padding: '15px 0',
            marginBottom: '10px'
          }}>
            Pits Soccer Club
          </div>

          {/* Tabs */}
          <div style={{ 
            display: 'flex', 
            borderBottom: '2px solid #ddd', 
            marginBottom: '20px'
          }}>
            {['Booking', 'Info'].map((tab) => (
              <div
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{ 
                  padding: '10px 0', 
                  marginRight: '30px',
                  cursor: 'pointer', 
                  fontWeight: '500',
                  borderBottom: activeTab === tab ? '2px solid #000' : 'none'
                }}
              >
                {tab}
              </div>
            ))}
          </div>

          {/* Main Content */}
          {activeTab === 'Booking' && (
            <div style={{ 
              padding: '20px 0', 
              backgroundColor: '#fff',
              borderRadius: '8px',
              marginBottom: '20px'
            }}>
              {/* Year and Today Button */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '0 30px',
                marginBottom: '20px'
              }}>
                <div style={{ fontSize: '18px', fontWeight: '500' }}>2025</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button style={{
                    padding: '6px 12px',
                    backgroundColor: '#f0f0f0',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}>
                    today
                  </button>
                  <span style={{ fontSize: '16px' }}>📅</span>
                </div>
              </div>

              {/* Date Picker */}
              <div style={{ 
                display: 'flex', 
                overflowX: 'auto', 
                padding: '10px 30px',
                gap: '1px',
                backgroundColor: '#f0f0f0',
                margin: '0 30px',
                borderRadius: '6px'
              }}>
                {dates.map((dateObj) => (
                  <div
                    key={dateObj.date}
                    onClick={() => handleDateSelect(dateObj.date)}
                    style={{ 
                      padding: '12px 8px', 
                      textAlign: 'center', 
                      cursor: 'pointer', 
                      borderRadius: '6px', 
                      minWidth: '80px',
                      backgroundColor: selectedDate === dateObj.date ? '#008dcc' : 'white',
                      color: selectedDate === dateObj.date ? '#fff' : '#333',
                      fontSize: '14px'
                    }}
                  >
                    <div style={{ fontWeight: '500' }}>{dateObj.day}</div>
                    <div>{dateObj.date}</div>
                  </div>
                ))}
              </div>

              {/* Gray separator line */}
              <div style={{ 
                width: 'calc(100% - 60px)', 
                height: '1px', 
                backgroundColor: '#ddd', 
                margin: '25px 30px'
              }}></div>

              {/* Toggle Switch */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                margin: '20px 30px' 
              }}>
                <div
                  onClick={() => handleCalendarToggle(!isCalendarEnabled)}
                  style={{
                    width: '44px',
                    height: '24px',
                    backgroundColor: isCalendarEnabled ? '#008dcc' : '#ccc',
                    borderRadius: '12px',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                    marginRight: '10px'
                  }}
                >
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      backgroundColor: '#fff',
                      borderRadius: '50%',
                      position: 'absolute',
                      top: '2px',
                      left: isCalendarEnabled ? '22px' : '2px',
                      transition: 'left 0.3s ease',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}
                  />
                </div>
                <label 
                  onClick={() => handleCalendarToggle(!isCalendarEnabled)}
                  style={{ cursor: 'pointer', color: '#666' }}
                >
                  calendar
                </label>
              </div>

              {/* FullCalendar Resource TimeGrid - Only show when calendar is enabled */}
              {isCalendarEnabled && (
                <>
                  <div style={{ 
                    fontSize: '18px', 
                    fontWeight: '600', 
                    marginBottom: '15px',
                    padding: '0 30px'
                  }}>
                    Court Availability Timeline
                  </div>
                  
                  <div style={{ 
                    padding: '0 30px',
                    marginBottom: '30px'
                  }}>
                    <div style={{ 
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      overflow: 'hidden'
                    }}>
                      <FullCalendar
                        ref={calendarRef}
                        plugins={[resourceTimeGridPlugin, interactionPlugin]}
                        initialView="resourceTimeGridDay"
                        initialDate={getFullDate(selectedDate)}
                        headerToolbar={false}
                        resources={courtResources}
                        events={generateEventsForDate(getFullDate(selectedDate))}
                        eventClick={handleEventClick}
                        select={handleTimeSlotSelect}
                        selectable={true}
                        selectMirror={true}
                        eventContent={(arg) => {
                          const event = arg.event
                          const organizer = event.extendedProps.organizer
                          
                          return {
                            html: `
                              <div style="padding: 2px 4px; font-size: 11px; line-height: 1.2; cursor: pointer;">
                                <div style="font-weight: 500;">${event.title}</div>
                                ${organizer ? `<div style="font-size: 10px; opacity: 0.9;">${organizer}</div>` : ''}
                              </div>
                            `
                          }
                        }}

                        height="500px"
                        slotMinTime="07:00:00"
                        slotMaxTime="22:00:00"
                        slotDuration="00:30:00"
                        slotLabelInterval="01:00:00"
                        allDaySlot={false}
                        editable={false}
                        dayMaxEvents={true}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Info Tab */}
          {activeTab === 'Info' && (
            <div style={{ 
              padding: '40px', 
              backgroundColor: '#fff', 
              textAlign: 'center',
              borderRadius: '8px'
            }}>
              <p>Info content would go here</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer style={{ 
        textAlign: 'center', 
        padding: '20px', 
        color: '#555', 
        fontSize: '14px' 
      }}>
        <button style={{ 
          padding: '10px 20px', 
          background: '#777', 
          color: '#fff', 
          border: 'none', 
          borderRadius: '5px', 
          cursor: 'pointer',
          marginBottom: '15px'
        }}>
          Sign out
        </button>
        <p style={{ margin: '5px 0' }}>Copyright © Fairgate AG. 2025 All rights reserved</p>
        <p style={{ margin: '5px 0' }}>
          <span style={{ color: '#007acc', cursor: 'pointer' }}>Fairgate Privacy Policy</span>
          {' | '}
          <span style={{ color: '#007acc', cursor: 'pointer' }}>Fairgate Terms and Conditions</span>
        </p>
      </footer>

      {/* Booking Drawer Component */}
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 9998
            }}
            onClick={() => setIsDrawerOpen(false)}
          />
          
          {/* Drawer - Matches calendar container width and positioning */}
          <div 
            className="drawer-content"
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              width: '100vw', // Full viewport width
              backgroundColor: 'white',
              borderTopLeftRadius: '10px',
              borderTopRightRadius: '10px',
              padding: '20px 40px', // Matches main content wrapper padding
              maxHeight: '80vh',
              overflowY: 'auto',
              zIndex: 9999,
              animation: 'slideUp 0.3s ease-out',
              boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.15)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <BookingDrawer
              date={bookingData?.date ? `${bookingData.date}.2025` : '30.07.2025'}
              selectedTime={selectedStartTime}
              selectedDuration={selectedDuration.toString()}
              basePrice={`${durationOptions.find(opt => opt.minutes === selectedDuration)?.price || 25} CHF`}
              onBack={() => {
                setIsDrawerOpen(false)
                // If calendar is disabled, re-enable it when going back
                if (!isCalendarEnabled) {
                  setIsCalendarEnabled(true)
                }
              }}
              onNext={() => {
                // Reset booking state and close drawer
                setIsDrawerOpen(false)
                setBookingData(null)
                setSelectedStartTime('')
                setSelectedDuration(60)
              }}
            />
          </div>
        </>
      )}

      {/* Participants Modal */}
      <ParticipantsModal
        isOpen={isParticipantsModalOpen}
        onClose={() => setIsParticipantsModalOpen(false)}
        participants={selectedEventParticipants}
        bookingTime={selectedEventTime}
        courtName={selectedEventCourt}
      />
      

      </div>
    </>
  )
}

export default App 