import React, { useMemo, useState, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
// import ParticipantsModal from './ParticipantsModal'

interface NoCalendarBookingProps {
  bookingBlocked?: boolean
  blockedMessage?: string
  isConfirmPage?: boolean
  selectedBookingData?: {
    startTime: string;
    courtId: string;
    duration: number;
  } | null;
  onBook?: () => void
}

const NoCalendarBooking: React.FC<NoCalendarBookingProps> = ({ bookingBlocked = false, blockedMessage: _blockedMessage, isConfirmPage = false, selectedBookingData, onBook }) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const confirmButtonRef = useRef<HTMLButtonElement>(null)
  // State for managing section visibility
     const [showCourtSection, setShowCourtSection] = useState(false)
   const [showConfirmationSection, setShowConfirmationSection] = useState(false)
   const [showAddPlayersSection, setShowAddPlayersSection] = useState(false)
  const [isParticipantsModalOpen, setIsParticipantsModalOpen] = useState(false)
  const [selectedEventParticipants, setSelectedEventParticipants] = useState<any[]>([])
  // const [isAddPlayersOpen, setIsAddPlayersOpen] = useState(false)
  const [playerType, setPlayerType] = useState<'member' | 'guest'>('member')
  const [memberSearch, setMemberSearch] = useState('')
  const [guestName, setGuestName] = useState('')
  const [guestSurname, setGuestSurname] = useState('')
  const [guestEmail, setGuestEmail] = useState('')
  
  // State for selections
  const urlDefaults = useMemo(() => ({
    date: searchParams.get('date') || '',
    start: searchParams.get('start') || '',
    duration: searchParams.get('duration') || '',
    resourceId: searchParams.get('resourceId') || '',
    price: searchParams.get('price') || '20',
    currency: searchParams.get('currency') || 'CHF',
    payment: searchParams.get('payment') || 'Credit Card'
  }), [searchParams])

  const [selectedStartTime, setSelectedStartTime] = useState(urlDefaults.start)
  const [selectedCourt, setSelectedCourt] = useState(urlDefaults.resourceId)
  const [selectedDuration, setSelectedDuration] = useState(urlDefaults.duration)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(urlDefaults.payment)

  // Pre-populate from selectedBookingData if available
  useEffect(() => {
    if (selectedBookingData) {
      setSelectedStartTime(selectedBookingData.startTime)
      setSelectedCourt(selectedBookingData.courtId)
      setSelectedDuration(selectedBookingData.duration.toString())
      
      // Auto-scroll to Confirm Booking button after a short delay
      setTimeout(() => {
        if (confirmButtonRef.current) {
          confirmButtonRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          })
        }
      }, 100)
    }
  }, [selectedBookingData])
  
  // Available options
  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
    '20:00', '20:30', '21:00', '21:30'
  ]
  
  const courts = [
    { id: 'court1', name: 'Court 1', price: 0 },
    { id: 'court2', name: 'Platz 2', price: 0 },
    { id: 'court3', name: 'Court 3', price: 0 }
  ]
  
  // For the no-calendar view, the design shows one option card per court
  // with a single duration of 60 minutes priced at CHF 20.00
  const durations = [
    { minutes: 60, label: '60min', price: Number(urlDefaults.price) || 20 }
  ]
  
     const paymentMethods = ['Credit Card', 'PayPal']
  
  // Initialize with default organizer
  React.useEffect(() => {
    if (selectedEventParticipants.length === 0) {
      setSelectedEventParticipants([
        {
          id: 'organizer',
          name: 'John',
          surname: 'Doe',
          email: 'john.doe@example.com',
          type: 'member' as const
        }
      ])
    }
  }, [])

  // Pre-open sections based on URL defaults
  React.useEffect(() => {
    if (selectedStartTime) {
      setShowCourtSection(true)
    }
    if (selectedStartTime && selectedCourt && selectedDuration) {
      setShowAddPlayersSection(true)
      setShowConfirmationSection(true)
    }
  }, [selectedStartTime, selectedCourt, selectedDuration])
  
  // Handle start time selection
  const handleStartTimeSelect = (time: string) => {
    if (bookingBlocked) return
    setSelectedStartTime(time)
    setShowCourtSection(true)
  }
  
  // Handle court and duration selection
  const handleCourtDurationSelect = (court: string, duration: string) => {
    setSelectedCourt(court)
    setSelectedDuration(duration)
    setShowAddPlayersSection(true)
  }
  
  // Calculate total price
  const selectedCourtData = courts.find(c => c.id === selectedCourt)
  const selectedDurationData = durations.find(d => d.minutes.toString() === selectedDuration)
  const basePrice = selectedCourtData?.price || 0
  const durationPrice = selectedDurationData?.price || 0
  const totalPrice = basePrice + durationPrice

  const handleBook = () => {
    if (isConfirmPage) {
      // Navigate to confirmation with current data
      const params = new URLSearchParams({
        date: urlDefaults.date,
        start: selectedStartTime,
        duration: selectedDuration,
        resourceId: selectedCourt,
        price: totalPrice.toString(),
        currency: urlDefaults.currency,
        payment: selectedPaymentMethod
      })
      navigate(`/booking/confirm?${params.toString()}`)
    } else if (onBook) {
      onBook()
    }
  }
  
  const styles = {
    container: {
      fontFamily: "'Segoe UI', Arial, sans-serif",
      width: '100%',
      maxWidth: '100%',
      margin: '0',
      padding: '20px'
    },
    section: {
      marginBottom: '30px',
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      width: '100%'
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: '#333'
    },
    timeGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(64px, auto))',
      gap: '8px',
      marginBottom: '20px',
      width: '100%'
    },
    timeButton: {
      padding: '6px 10px',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      backgroundColor: '#f3f4f6',
      color: '#111827',
      cursor: 'pointer',
      fontSize: '14px',
      lineHeight: 1.2,
      transition: 'all 0.2s ease',
      width: 'auto',
      minWidth: '64px',
      height: '36px'
    },
    timeButtonSelected: {
      padding: '6px 10px',
      border: '1px solid #0e78a8',
      borderRadius: '12px',
      backgroundColor: '#0e8fc6',
      color: '#fff',
      cursor: 'pointer',
      fontSize: '14px',
      lineHeight: 1.2,
      transition: 'all 0.2s ease',
      width: 'auto',
      minWidth: '64px',
      height: '36px'
    },
    courtList: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '24px',
      marginBottom: '10px',
      width: '100%'
    },
    courtRow: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'flex-start' as const,
      gap: '8px'
    },
    courtName: {
      fontSize: '16px',
      fontWeight: 'bold',
      marginBottom: '10px'
    },
    optionCard: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      width: '120px',
      height: '60px',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      backgroundColor: '#f3f4f6',
      color: '#111827',
      boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
      cursor: 'pointer'
    },
    optionCardSelected: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      width: '120px',
      height: '60px',
      border: '1px solid #0e78a8',
      borderRadius: '12px',
      backgroundColor: '#0e8fc6',
      color: '#fff',
      boxShadow: '0 6px 14px rgba(14, 143, 198, 0.35)',
      cursor: 'pointer',
      outline: 'none'
    },
    optionPrice: {
      fontSize: '14px',
      fontWeight: 400 as const,
      color: '#111827',
      lineHeight: 1.1,
      marginBottom: '2px'
    },
    optionMinutes: {
      fontSize: '12px',
      color: '#4b5563',
      lineHeight: 1.1
    },
    paymentGrid: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: '10px',
      marginBottom: '20px',
      width: '100%'
    },
    paymentButton: {
      padding: '10px 14px',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      backgroundColor: '#f3f4f6',
      color: '#111827',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'all 0.2s ease',
      width: 'auto',
      minHeight: '40px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
    },
    paymentButtonSelected: {
      padding: '10px 14px',
      border: '1px solid #0e78a8',
      borderRadius: '12px',
      backgroundColor: '#0e8fc6',
      color: '#fff',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'all 0.2s ease',
      width: 'auto',
      minHeight: '40px',
      boxShadow: '0 6px 14px rgba(14, 143, 198, 0.35)'
    },
    summarySection: {
      backgroundColor: '#f8f9fa',
      padding: '25px',
      borderRadius: '8px',
      marginBottom: '20px',
      width: '100%'
    },
    summaryRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '10px',
      fontSize: '14px'
    },
    totalRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '15px',
      paddingTop: '15px',
      borderTop: '1px solid #ddd',
      fontSize: '16px',
      fontWeight: 'bold'
    },
    bookButton: {
      width: 'auto',
      padding: '15px 30px',
      backgroundColor: '#28a745',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
      minHeight: '50px',
      alignSelf: 'flex-start'
    },
    backButton: {
      padding: '15px 25px',
      backgroundColor: '#6c757d',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      fontSize: '14px',
      cursor: 'pointer',
      marginBottom: '20px',
      transition: 'background-color 0.2s ease',
      width: '100%',
      maxWidth: '200px'
    },

  }

     // Guest quota modal state
   const [isGuestQuotaModalOpen, setIsGuestQuotaModalOpen] = useState(false)
   
   // Guest quota constants
   const MAX_GUESTS_PER_BOOKING = 3

  // Guest management functions
     const handleAddGuest = () => {
     if (guestName.trim() && guestSurname.trim() && guestEmail.trim()) {
       // Check if adding this guest would exceed the quota
       const currentGuestCount = selectedEventParticipants.filter(p => p.type === 'guest').length
       
       if (currentGuestCount >= MAX_GUESTS_PER_BOOKING) {
         setIsGuestQuotaModalOpen(true)
         return
       }
       
       const newGuest = {
         id: Date.now().toString(),
         name: guestName.trim(),
         surname: guestSurname.trim(),
         email: guestEmail.trim(),
         type: 'guest' as const
       }
       setSelectedEventParticipants(prev => [...prev, newGuest])
       setGuestName('')
       setGuestSurname('')
       setGuestEmail('')
       setPlayerType('member') // Reset to member tab
     }
   }

  const handleRemoveParticipant = (participantId: string) => {
    setSelectedEventParticipants(prev => prev.filter(p => p.id !== participantId))
  }

  const handleOpenParticipantsModal = () => {
    setIsParticipantsModalOpen(true)
  }

  const handleCloseParticipantsModal = () => {
    setIsParticipantsModalOpen(false)
  }

  return (
    <div style={styles.container}>

             {/* Section 1: Select Start Time - Show by default when no booking data, or when time is selected */}
       {(!selectedBookingData || selectedStartTime) && (
         <div id="start-time" style={styles.section}>
           <div style={styles.sectionTitle}>Select Start Time</div>
           <div style={styles.timeGrid}>
             {timeSlots.map((time) => (
               <button
                 key={time}
                 style={selectedStartTime === time ? styles.timeButtonSelected : styles.timeButton}
                 onClick={() => {
                   if (bookingBlocked) {
                     // Show advance booking message instead of selecting time
                     alert('Advance booking is possible only until 4 days before')
                     return
                   }
                   handleStartTimeSelect(time)
                 }}
                 onMouseEnter={(e) => {
                   if (selectedStartTime !== time) {
                     e.currentTarget.style.backgroundColor = '#f8fafc'
                     e.currentTarget.style.borderColor = '#cbd5e1'
                   }
                 }}
                 onMouseLeave={(e) => {
                   if (selectedStartTime !== time) {
                     e.currentTarget.style.backgroundColor = '#f3f4f6'
                     e.currentTarget.style.borderColor = '#e5e7eb'
                   }
                 }}
               >
                 {time}
               </button>
             ))}
           </div>
         </div>
       )}

             {/* Section 2: Select Court and Booking Duration - Only show when a valid slot is selected */}
       {selectedStartTime && showCourtSection && (
         <div id="court-duration" style={styles.section}>
           <div style={styles.sectionTitle}>Select Court and Booking Duration</div>
           <div style={styles.courtList}>
             {courts.map((court) => {
               const isSelected = selectedCourt === court.id && selectedDuration === '60'
               
               return (
                 <div key={court.id} style={styles.courtRow}>
                   <div style={{ ...styles.courtName, marginBottom: 0 }}>{court.name}</div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                   <button
                       style={isSelected ? styles.optionCardSelected : styles.optionCard}
                     onClick={(e) => {
                       e.stopPropagation()
                       if (bookingBlocked) {
                         // Show advance booking message instead of selecting court
                         alert('Advance booking is possible only until 4 days before')
                         return
                       }
                       handleCourtDurationSelect(court.id, '60')
                     }}
                     onMouseEnter={(e) => {
                       if (!isSelected) {
                         const btn = e.currentTarget as HTMLButtonElement
                           btn.style.backgroundColor = '#f8fafc'
                           btn.style.borderColor = '#cbd5e1'
                           btn.style.boxShadow = '0 4px 10px rgba(0,0,0,0.08)'
                       }
                     }}
                     onMouseLeave={(e) => {
                       if (!isSelected) {
                         const btn = e.currentTarget as HTMLButtonElement
                           btn.style.backgroundColor = '#f3f4f6'
                         btn.style.borderColor = '#e5e7eb'
                           btn.style.boxShadow = '0 2px 6px rgba(0,0,0,0.06)'
                       }
                     }}
                     >
                       {bookingBlocked ? (
                         <>
                           <div style={{ fontSize: '16px', marginBottom: '4px' }}>🔒</div>
                           <div style={{ fontSize: '10px', color: '#9ca3af' }}>Advance</div>
                         </>
                       ) : (
                         <>
                     <div style={isSelected ? { ...styles.optionPrice, color: '#fff' } : styles.optionPrice}>{`CHF ${(durations && durations[0] ? durations[0].price : 20).toFixed(2)}`}</div>
                     <div style={isSelected ? { ...styles.optionMinutes, color: '#fff' } : styles.optionMinutes}>{(durations && durations[0] ? durations[0].label : '60min')}</div>
                         </>
                       )}
                   </button>
                   </div>
                 </div>
               )
             })}
           </div>
         </div>
       )}

             {/* Section 3: Add Players - Only show when a valid slot is selected */}
       {selectedStartTime && showAddPlayersSection && (
         <div id="players" style={styles.section}>
                      <div style={styles.sectionTitle}>
              Add Players
            </div>
           <div style={{ marginBottom: '20px' }}>
             <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '15px' }}>Current Players</div>
             
             <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '20px' }}>
               {/* Display actual participants from state */}
               {selectedEventParticipants.map((participant) => (
                 <div key={participant.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', position: 'relative' }}>
                   <div 
                     style={{
                       width: '50px',
                       height: '50px',
                       borderRadius: '50%',
                       backgroundColor: participant.type === 'member' ? '#0e8fc6' : '#10b981',
                       border: '2px solid #e5e7eb',
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                       color: '#fff',
                       cursor: 'pointer',
                       transition: 'all 0.2s ease'
                     }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.transform = 'scale(1.05)'
                       e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.transform = 'scale(1)'
                       e.currentTarget.style.boxShadow = 'none'
                     }}
                   >
                     <span style={{ fontSize: '18px', fontWeight: '600' }}>
                       {participant.name.charAt(0)}
                     </span>
                   </div>
                   <div style={{ fontSize: '12px', textAlign: 'center', maxWidth: '60px' }}>
                     <div style={{ fontWeight: '500', color: '#111827' }}>
                       {participant.name} {participant.surname}
                     </div>
                     <div style={{ 
                       fontSize: '10px', 
                       color: participant.type === 'member' ? '#0e8fc6' : '#10b981', 
                       fontWeight: '500' 
                     }}>
                       {participant.type === 'member' ? 'Member' : 'Guest'}
                     </div>
                   </div>
                   <button
                     style={{
                       position: 'absolute',
                       top: '-5px',
                       right: '-5px',
                       width: '20px',
                       height: '20px',
                       borderRadius: '50%',
                       background: '#dc3545',
                       border: '2px solid white',
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                       cursor: 'pointer',
                       color: 'white',
                       fontSize: '10px',
                       fontWeight: 'bold',
                       boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                       transition: 'all 0.2s ease'
                     }}
                     aria-label={`Remove ${participant.name}`}
                     title={`Remove ${participant.name}`}
                     onClick={(e) => {
                       e.stopPropagation()
                       handleRemoveParticipant(participant.id)
                     }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.background = '#c82333'
                       e.currentTarget.style.transform = 'scale(1.1)'
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.background = '#dc3545'
                       e.currentTarget.style.transform = 'scale(1)'
                     }}
                   >
                     ✖
                   </button>
                 </div>
               ))}
               
               {/* Add User Button */}
               <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                 <button
                   style={{
                     width: '50px',
                     height: '50px',
                     borderRadius: '50%',
                     border: '2px dashed #cbd5e1',
                     background: '#f8fafc',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     cursor: 'pointer',
                     color: '#64748b',
                     transition: 'all 0.2s ease'
                   }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.borderColor = '#0e8fc6'
                     e.currentTarget.style.background = '#eff6ff'
                     e.currentTarget.style.color = '#0e8fc6'
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.borderColor = '#cbd5e1'
                     e.currentTarget.style.background = '#f8fafc'
                     e.currentTarget.style.color = '#64748b'
                   }}
                   onClick={handleOpenParticipantsModal}
                   aria-label="Add new player"
                   title="Add new player"
                 >
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                   </svg>
                 </button>
                 <div style={{ fontSize: '12px', textAlign: 'center', maxWidth: '60px', color: '#64748b' }}>
                   Add User
                 </div>
               </div>
             </div>
                       </div>
           </div>
       )}

      {/* Section 4: Booking Details, Price and Confirm */}
      {showConfirmationSection && (
        <div id="payment" style={styles.section}>
          <div style={styles.sectionTitle}>Booking Details, Price and Confirm</div>
          
          {/* Payment Method Selection */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '15px' }}>Payment Method</div>
            <div style={styles.paymentGrid}>
              {paymentMethods.map((method) => (
                <button
                  key={method}
                  style={selectedPaymentMethod === method ? styles.paymentButtonSelected : styles.paymentButton}
                  onClick={() => setSelectedPaymentMethod(method)}
                  onMouseEnter={(e) => {
                    if (selectedPaymentMethod !== method) {
                      e.currentTarget.style.backgroundColor = '#f8fafc'
                      e.currentTarget.style.borderColor = '#cbd5e1'
                      ;(e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 10px rgba(0,0,0,0.08)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedPaymentMethod !== method) {
                      e.currentTarget.style.backgroundColor = '#f3f4f6'
                      e.currentTarget.style.borderColor = '#e5e7eb'
                      ;(e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 6px rgba(0,0,0,0.06)'
                    }
                  }}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          {/* Price Summary */}
          <div id="summary" style={styles.summarySection}>
            <div style={styles.summaryRow}>
              <span>Court Fee:</span>
              <span>{basePrice} CHF</span>
            </div>
            <div style={styles.summaryRow}>
              <span>Duration Fee:</span>
              <span>{durationPrice} CHF</span>
            </div>
            <div style={styles.totalRow}>
              <span>Total:</span>
              <span>{totalPrice} CHF</span>
            </div>
          </div>

                     {/* Book Button */}
           <button
             ref={confirmButtonRef}
             style={styles.bookButton}
             onClick={handleBook}
             onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#218838'}
             onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#28a745'}
           >
             Confirm Booking
           </button>
        </div>
      )}

      {/* Add Players Modal */}
      {isParticipantsModalOpen && (
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
              zIndex: 10000
            }}
            onClick={handleCloseParticipantsModal}
          />
          
          {/* Modal */}
          <div 
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '32px',
              maxWidth: '500px',
              width: '90%',
              maxHeight: '80vh',
              overflowY: 'auto',
              zIndex: 10001,
              boxShadow: '0 20px 25px rgba(0, 0, 0, 0.2)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '700', margin: '0 0 8px 0', color: '#111827' }}>
                Add Players
              </h2>
              <p style={{ fontSize: '16px', color: '#6b7280', margin: 0 }}>
                Add members or guests to your booking
              </p>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', marginBottom: '24px', borderBottom: '1px solid #e5e7eb' }}>
              <button
                onClick={() => setPlayerType('member')}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  border: 'none',
                  background: 'none',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: playerType === 'member' ? '#0e8fc6' : '#9ca3af',
                  borderBottom: playerType === 'member' ? '2px solid #0e8fc6' : '2px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                Members
              </button>
              <button
                onClick={() => setPlayerType('guest')}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  border: 'none',
                  background: 'none',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: playerType === 'guest' ? '#0e8fc6' : '#9ca3af',
                  borderBottom: playerType === 'guest' ? '2px solid #0e8fc6' : '2px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                Guests
              </button>
            </div>

                         {/* Member Tab */}
             {playerType === 'member' && (
               <div>
                 <div style={{ marginBottom: '16px' }}>
                   <input
                     type="text"
                     placeholder="Search members..."
                     value={memberSearch}
                     onChange={(e) => setMemberSearch(e.target.value)}
                     style={{
                       width: '100%',
                       padding: '12px 16px',
                       border: '1px solid #d1d5db',
                       borderRadius: '8px',
                       fontSize: '16px',
                       outline: 'none'
                     }}
                   />
                 </div>
                 
                 {/* Add Member Button */}
                 <button
                   onClick={() => {
                     if (memberSearch.trim()) {
                       const newMember = {
                         id: Date.now().toString(),
                         name: memberSearch.trim(),
                         surname: '',
                         email: '',
                         type: 'member' as const
                       }
                       setSelectedEventParticipants(prev => [...prev, newMember])
                       setMemberSearch('')
                     }
                   }}
                   disabled={!memberSearch.trim()}
                   style={{
                     width: '100%',
                     padding: '12px 24px',
                     backgroundColor: memberSearch.trim() ? '#0e8fc6' : '#9ca3af',
                     color: 'white',
                     border: 'none',
                     borderRadius: '8px',
                     fontSize: '16px',
                     fontWeight: '600',
                     cursor: memberSearch.trim() ? 'pointer' : 'not-allowed',
                     transition: 'background-color 0.2s ease',
                     marginTop: '12px'
                   }}
                   onMouseEnter={(e) => {
                     if (memberSearch.trim()) {
                       e.currentTarget.style.backgroundColor = '#0d7bb8'
                     }
                   }}
                   onMouseLeave={(e) => {
                     if (memberSearch.trim()) {
                       e.currentTarget.style.backgroundColor = '#0e8fc6'
                     }
                   }}
                                   >
                    Add Guests
                  </button>
               </div>
             )}

            {/* Guest Tab */}
            {playerType === 'guest' && (
              <div>
                
                
                {/* Guest Quota Limit Banner */}
                {selectedEventParticipants.filter(p => p.type === 'guest').length >= MAX_GUESTS_PER_BOOKING && (
                  <div style={{ 
                    marginBottom: '16px', 
                    padding: '16px', 
                    backgroundColor: '#fef3c7', 
                    borderRadius: '8px',
                    border: '1px solid #f59e0b',
                    textAlign: 'center'
                  }}>
                    <div style={{ 
                      fontSize: '16px', 
                      fontWeight: '600', 
                      color: '#92400e',
                      marginBottom: '8px'
                    }}>
                      Your guest quota limit reached for the day
                    </div>
                    <div style={{ 
                      fontSize: '14px', 
                      color: '#92400e',
                      marginBottom: '12px'
                    }}>
                      Will get reset tomorrow
                    </div>
                    <button
                      onClick={() => {
                        // This would navigate to bookings view in a real app
                        alert('Navigate to View My Bookings')
                      }}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#f59e0b',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#d97706'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#f59e0b'
                      }}
                    >
                      View my Bookings
                    </button>
                  </div>
                )}
                
                {/* Guest Form - Disabled when quota reached */}
                <div style={{ 
                  opacity: selectedEventParticipants.filter(p => p.type === 'guest').length >= MAX_GUESTS_PER_BOOKING ? 0.5 : 1,
                  pointerEvents: selectedEventParticipants.filter(p => p.type === 'guest').length >= MAX_GUESTS_PER_BOOKING ? 'none' : 'auto'
                }}>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none',
                      marginBottom: '12px'
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={guestSurname}
                    onChange={(e) => setGuestSurname(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none',
                      marginBottom: '12px'
                    }}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none'
                    }}
                  />
                  
                  <button
                    onClick={handleAddGuest}
                    disabled={!guestName.trim() || !guestSurname.trim() || !guestEmail.trim() || selectedEventParticipants.filter(p => p.type === 'guest').length >= MAX_GUESTS_PER_BOOKING}
                    style={{
                      width: '100%',
                      padding: '12px 24px',
                      backgroundColor: selectedEventParticipants.filter(p => p.type === 'guest').length >= MAX_GUESTS_PER_BOOKING ? '#9ca3af' : '#0e8fc6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: selectedEventParticipants.filter(p => p.type === 'guest').length >= MAX_GUESTS_PER_BOOKING ? 'not-allowed' : 'pointer',
                      transition: 'background-color 0.2s ease',
                      marginTop: '12px'
                    }}
                    onMouseEnter={(e) => {
                      if (guestName.trim() && guestSurname.trim() && guestEmail.trim() && selectedEventParticipants.filter(p => p.type === 'guest').length < MAX_GUESTS_PER_BOOKING) {
                        e.currentTarget.style.backgroundColor = '#0d7bb8'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (guestName.trim() && guestSurname.trim() && guestEmail.trim() && selectedEventParticipants.filter(p => p.type === 'guest').length < MAX_GUESTS_PER_BOOKING) {
                        e.currentTarget.style.backgroundColor = '#0e8fc6'
                      }
                    }}
                  >
                    {selectedEventParticipants.filter(p => p.type === 'guest').length >= MAX_GUESTS_PER_BOOKING ? 'Guest Quota Reached' : 'Add Guest'}
                  </button>
                </div>
                
                {/* Remove the old quota reached message since we now have the banner */}
              </div>
            )}

            

            {/* Close Button */}
            <div style={{ marginTop: '24px', textAlign: 'center' }}>
              <button
                onClick={handleCloseParticipantsModal}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#4b5563'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#6b7280'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}
      
      
      
      {/* Guest Quota Modal */}
      {isGuestQuotaModalOpen && (
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
              zIndex: 10000
            }}
            onClick={() => setIsGuestQuotaModalOpen(false)}
          />
          
          {/* Modal Dialog */}
          <div 
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '32px',
              maxWidth: '400px',
              width: '90%',
              zIndex: 10001,
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Icon */}
            <button
              onClick={() => setIsGuestQuotaModalOpen(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                color: '#9ca3af',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6'
                e.currentTarget.style.color = '#6b7280'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = '#9ca3af'
              }}
            >
              ✕
            </button>
            
            {/* Title */}
            <div style={{ 
              fontSize: '24px', 
              fontWeight: '700', 
              color: '#111827',
              marginBottom: '16px',
              textAlign: 'center'
            }}>
              Guest Quota Limit
            </div>
            
            {/* Content */}
            <div style={{ 
              fontSize: '16px', 
              color: '#6b7280',
              lineHeight: '1.5',
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              <div style={{ marginBottom: '8px' }}>
                You have reached your quota limit for adding guests.
              </div>
              <div>
                Maximum {MAX_GUESTS_PER_BOOKING} guests allowed per booking.
              </div>
            </div>
            
            {/* Primary Button */}
            <button
              onClick={() => setIsGuestQuotaModalOpen(false)}
              style={{
                width: '100%',
                backgroundColor: '#0e8fc6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#0d7bb8'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#0e8fc6'
              }}
            >
              Understood
            </button>
          </div>
        </>
      )}
      
      {/* Add Players Modal */}
    </div>
  )
}

export default NoCalendarBooking
