import React from 'react'
import { User, DollarSign, Info } from "lucide-react"

interface BookingDrawerProps {
  date?: string
  onBack?: () => void
  onNext?: () => void
  selectedTime?: string
  selectedDuration?: string
  basePrice?: string
  resource?: string
}

const BookingDrawer: React.FC<BookingDrawerProps> = ({
  date = "28.08.2025",
  onBack,
  onNext,
  selectedTime = "17:00",
  selectedDuration = "60",
  basePrice = "25 CHF",
  resource = "Court 1"
}) => {
  // State for managing the two-step booking flow
  const [currentStep, setCurrentStep] = React.useState<'step1' | 'step2'>('step1')
  const [time, setTime] = React.useState(selectedTime)
  const [duration, setDuration] = React.useState(selectedDuration)
  const [selectedMemberType, setSelectedMemberType] = React.useState<string>('')
  const [selectedPaymentOption, setSelectedPaymentOption] = React.useState<string>('')
  
  // State for the Add Players modal
  const [isAddPlayersOpen, setIsAddPlayersOpen] = React.useState(false)
  const [playerType, setPlayerType] = React.useState<'members' | 'guests'>('members')
  const [memberSearch, setMemberSearch] = React.useState('')
  const [guestName, setGuestName] = React.useState('')
  const [guestSurname, setGuestSurname] = React.useState('')
  const [guestEmail, setGuestEmail] = React.useState('')
  const [showInfoTooltip, setShowInfoTooltip] = React.useState(false)

  // Debug modal state changes
  React.useEffect(() => {
    console.log('Modal state changed to:', isAddPlayersOpen)
  }, [isAddPlayersOpen])

  // Sample players data
  const samplePlayers = [
    { id: 1, name: 'Edwin Jacob', type: 'member', hasGuestFee: false },
    { id: 2, name: 'Thomas Cook', type: 'guest', hasGuestFee: true }
  ]

  // Time slots for step 1
  const timeSlots = ["17:00", "17:15", "17:30", "17:45", "18:00", "18:15", "18:30", "18:45"]
  
  // Duration options for step 1
  const durationOptions = ["60", "90", "120"]
  

  
  // Payment options for step 2
  const paymentOptions = ["Instant Payment", "Invoice", "Cash"]

  // Helper function to calculate end time
  const calculateEndTime = (startTime: string, duration: string): string => {
    const timeParts = startTime.split(':')
    if (timeParts.length !== 2) {
      return startTime // Return original time if parsing fails
    }
    
    const hours = parseInt(timeParts[0]!)
    const minutes = parseInt(timeParts[1]!)
    
    if (isNaN(hours) || isNaN(minutes)) {
      return startTime // Return original time if parsing fails
    }
    
    const durationMinutes = parseInt(duration)
    const totalMinutes = hours * 60 + minutes + durationMinutes
    const endHours = Math.floor(totalMinutes / 60)
    const endMinutes = totalMinutes % 60
    return `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`
  }

  // Calculate pricing for step 2
  const basePriceValue = 25
  const selectedPlayer = samplePlayers.find(player => player.name === selectedMemberType)
  const guestFee = selectedPlayer?.hasGuestFee ? 5 : 0
  const vat = (basePriceValue + guestFee) * 0.10
  const total = basePriceValue + guestFee + vat

  // Handle next button click in step 1
  const handleStep1Next = () => {
    setCurrentStep('step2')
  }

  // Handle back button click in step 2
  const handleStep2Back = () => {
    setCurrentStep('step1')
  }

  // Handle final booking confirmation
  const handleBookNow = () => {
    // Here you would typically send the booking data to your backend
    console.log('Booking confirmed:', {
      date,
      time,
      duration,
      memberType: selectedMemberType,
      paymentOption: selectedPaymentOption,
      total
    })
    // Close the drawer by calling the parent's onNext
    if (onNext) onNext()
  }

  // Handle + Add button click
  const handleAddPlayers = () => {
    console.log('Add Players button clicked!')
    setIsAddPlayersOpen(true)
    console.log('Modal state set to:', true)
  }

  // Handle player selection confirmation
  const handleSelectPlayers = () => {
    // Here you would typically add the selected players to the booking
    console.log('Players selected:', {
      type: playerType,
      memberSearch,
      guestName,
      guestSurname,
      guestEmail
    })
    setIsAddPlayersOpen(false)
    // Reset form
    setPlayerType('members')
    setMemberSearch('')
    setGuestName('')
    setGuestSurname('')
    setGuestEmail('')
  }

  // Handle modal close
  const handleCloseModal = () => {
    setIsAddPlayersOpen(false)
    // Reset form
    setPlayerType('members')
    setMemberSearch('')
    setGuestName('')
    setGuestSurname('')
    setGuestEmail('')
  }

  const styles = {
    // Main drawer container - spans full width of parent
    drawerContainer: {
      border: "1px solid #ccc",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      background: "#fff",
      borderRadius: "6px 6px 0 0",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column" as const,
      justifyContent: "space-between",
      padding: "16px",
      fontFamily: "Helvetica Neue, sans-serif",
      width: "100%" // Ensure full width utilization
    },
    // Content wrapper to left-align all content within the full-width drawer
    contentWrapper: {
      width: "100%", // Use full available width
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "flex-start" as const, // Left align all content horizontally
      gap: "20px" // Add consistent spacing between sections
    },
    // Date header styling - left aligned
    drawerDate: {
      fontWeight: "600",
      fontSize: "16px",
      marginBottom: "14px",
      textAlign: "left" as const
    },
    // Section container for each form group - left aligned content
    drawerSection: {
      width: "100%", // Use full width
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "flex-start" as const // Left align section content
    },
    // Label styling for form sections - left aligned
    drawerLabel: {
      display: "block",
      fontSize: "14px",
      marginBottom: "6px",
      fontWeight: "500",
      textAlign: "left" as const // Left align labels
    },
    // Container for button rows (time slots, duration options) - left aligned
    drawerButtonRow: {
      display: "flex",
      flexWrap: "wrap" as const,
      gap: "10px",
      justifyContent: "flex-start" as const, // Left align buttons
      width: "100%" // Use full width
    },
    // Default button styling for unselected options
    drawerButton: {
      background: "#eee",
      border: "none",
      padding: "10px 14px",
      borderRadius: "4px",
      cursor: "pointer",
      minWidth: "60px",
      fontSize: "14px",
      transition: "background 0.2s ease",
      flex: "0 0 auto" // Prevent stretching
    },
    // Selected button styling
    drawerButtonSelected: {
      background: "#007bff",
      color: "white",
      border: "none",
      padding: "10px 14px",
      borderRadius: "4px",
      cursor: "pointer",
      minWidth: "60px",
      fontSize: "14px",
      transition: "background 0.2s ease",
      flex: "0 0 auto" // Prevent stretching
    },
    // Price section container - for inline label and value, left aligned
    drawerPriceSection: {
      width: "100%", // Use full width
      display: "flex",
      flexDirection: "row" as const, // Horizontal layout
      alignItems: "center" as const, // Center vertically
      justifyContent: "flex-start" as const, // Left align horizontally
      gap: "10px" // Space between label and value
    },
    // Price label styling - inline
    drawerPriceLabel: {
      fontSize: "14px",
      fontWeight: "500",
      color: "#333"
    },
    // Price display box styling - inline
    drawerPriceBox: {
      background: "#f5f7fa",
      padding: "10px 14px",
      borderRadius: "4px",
      fontWeight: "500",
      color: "#5a5a5a",
      display: "inline-block",
      fontSize: "14px",
      textAlign: "left" as const
    },
    // Footer container with navigation and summary - left aligned
    drawerFooter: {
      borderTop: "1px solid #ddd",
      paddingTop: "14px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "16px",
      flexWrap: "wrap" as const,
      gap: "10px",
      width: "100%"
    },
    // Back button styling
    drawerBack: {
      background: "#eee",
      border: "none",
      padding: "10px 20px",
      borderRadius: "4px",
      fontSize: "14px",
      cursor: "pointer",
      transition: "background 0.2s ease",
      flex: "0 0 auto"
    },
    // Next button styling
    drawerNext: {
      background: "#eee",
      border: "none",
      padding: "10px 20px",
      borderRadius: "4px",
      fontSize: "14px",
      cursor: "pointer",
      transition: "background 0.2s ease",
      flex: "0 0 auto"
    },
    // Summary text container in footer - left aligned
    drawerSummary: {
      display: "flex",
      gap: "14px",
      alignItems: "center",
      fontSize: "14px",
      flex: "1",
      justifyContent: "flex-start" as const, // Left align the summary
      flexWrap: "wrap" as const
    },
    // Step 2 specific styles
    // Title for step 2
    drawerTitle: {
      fontWeight: "600",
      fontSize: "18px",
      marginBottom: "20px",
      textAlign: "left" as const,
      color: "#333"
    },
    // Step indicator container
    stepContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "column" as const,
      gap: "20px"
    },
    // Step title styling
    stepTitle: {
      fontSize: "16px",
      fontWeight: "600",
      marginBottom: "10px",
      color: "#333"
    },
    // Member type button styling (wider buttons)
    memberTypeButton: {
      background: "#eee",
      border: "none",
      padding: "12px 20px",
      borderRadius: "4px",
      cursor: "pointer",
      minWidth: "140px",
      fontSize: "14px",
      transition: "background 0.2s ease",
      flex: "0 0 auto"
    },
    memberTypeButtonSelected: {
      background: "#007bff",
      color: "white",
      border: "none",
      padding: "12px 20px",
      borderRadius: "4px",
      cursor: "pointer",
      minWidth: "140px",
      fontSize: "14px",
      transition: "background 0.2s ease",
      flex: "0 0 auto"
    },
    // Payment option button styling
    paymentButton: {
      background: "#eee",
      border: "none",
      padding: "12px 20px",
      borderRadius: "4px",
      cursor: "pointer",
      minWidth: "120px",
      fontSize: "14px",
      transition: "background 0.2s ease",
      flex: "0 0 auto"
    },
    paymentButtonSelected: {
      background: "#007bff",
      color: "white",
      border: "none",
      padding: "12px 20px",
      borderRadius: "4px",
      cursor: "pointer",
      minWidth: "120px",
      fontSize: "14px",
      transition: "background 0.2s ease",
      flex: "0 0 auto"
    },
    // Summary section styling (light blue background)
    summarySection: {
      background: "#e3f2fd",
      padding: "16px",
      borderRadius: "6px",
      width: "100%",
      marginTop: "20px"
    },
    // Summary row styling
    summaryRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "8px",
      fontSize: "14px"
    },
    // Summary label styling
    summaryLabel: {
      color: "#333",
      fontWeight: "500"
    },
    // Summary value styling
    summaryValue: {
      color: "#333",
      fontWeight: "600"
    },
    // Total row styling (emphasized)
    totalRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "12px",
      paddingTop: "12px",
      borderTop: "1px solid #ccc",
      fontSize: "16px",
      fontWeight: "600"
    },
    // Book now button styling
    bookNowButton: {
      background: "#28a745",
      color: "white",
      border: "none",
      padding: "12px 24px",
      borderRadius: "4px",
      fontSize: "14px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "background 0.2s ease",
      flex: "0 0 auto"
    },
    // Booking slot details styling
    bookingSlotDetails: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "10px",
      padding: "8px 12px",
      background: "#f0f7ff",
      borderRadius: "4px",
      fontSize: "14px",
      fontWeight: "500",
      color: "#333"
    }
  }

  // Step 1: Time and Duration Selection
  const renderStep1 = () => (
    <>
      {/* Date header - left aligned */}
      <div style={styles.drawerDate}>{date}</div>

      {/* Start Time Selection Section */}
      <div style={styles.drawerSection}>
        <label style={styles.drawerLabel}>Select Start Time</label>
        <div style={styles.drawerButtonRow}>
          {timeSlots.map((slot) => (
            <button
              key={slot}
              className="drawer-button"
              style={time === slot ? styles.drawerButtonSelected : styles.drawerButton}
              onClick={() => setTime(slot)}
              onMouseEnter={(e) => {
                if (time !== slot) {
                  e.currentTarget.style.background = "#ddd"
                }
              }}
              onMouseLeave={(e) => {
                if (time !== slot) {
                  e.currentTarget.style.background = "#eee"
                }
              }}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      {/* Duration Selection Section */}
      <div style={styles.drawerSection}>
        <label style={styles.drawerLabel}>Select Duration</label>
        <div style={styles.drawerButtonRow}>
          {durationOptions.map((option) => (
            <button
              key={option}
              className="drawer-button"
              style={duration === option ? styles.drawerButtonSelected : styles.drawerButton}
              onClick={() => setDuration(option)}
              onMouseEnter={(e) => {
                if (duration !== option) {
                  e.currentTarget.style.background = "#ddd"
                }
              }}
              onMouseLeave={(e) => {
                if (duration !== option) {
                  e.currentTarget.style.background = "#eee"
                }
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Base Price Display Section */}
      <div style={styles.drawerSection}>
        <div style={styles.drawerPriceSection}>
          <span style={styles.drawerPriceLabel}>Base Price:</span>
          <div style={styles.drawerPriceBox}>{basePrice}</div>
        </div>
      </div>

      {/* Footer with Navigation and Summary */}
      <div style={styles.drawerFooter}>
        <button 
          style={styles.drawerBack} 
          onClick={onBack}
          onMouseEnter={(e) => e.currentTarget.style.background = "#ddd"}
          onMouseLeave={(e) => e.currentTarget.style.background = "#eee"}
        >
          Back
        </button>
        <div style={styles.drawerSummary}>
          <span>{date}</span>
          <span>{time} {duration === "60" ? "18:00" : duration === "90" ? "18:30" : "19:00"}</span>
          <span style={styles.drawerPriceBox}>{basePrice}</span>
        </div>
        <button 
          style={styles.drawerNext} 
          onClick={handleStep1Next}
          onMouseEnter={(e) => e.currentTarget.style.background = "#ddd"}
          onMouseLeave={(e) => e.currentTarget.style.background = "#eee"}
        >
          Next
        </button>
      </div>
    </>
  )

  // Step 2: Booking Confirmation
  const renderStep2 = () => (
    <>
      {/* Title with Booking Details */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div style={styles.drawerTitle}>Booking Confirmation</div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '6px 12px',
          background: '#f0f7ff',
          borderRadius: '6px',
          fontSize: '13px',
          fontWeight: '600',
          color: '#333',
          gap: '8px',
          lineHeight: '1',
          marginTop: '2px'
        }}>
          <span style={{ fontWeight: '600' }}>{date}</span>
          <span style={{ fontWeight: '600' }}>•</span>
          <span style={{ fontWeight: '600' }}>{time} - {calculateEndTime(time, duration)}</span>
          <span style={{ fontWeight: '600' }}>•</span>
          <span style={{ fontWeight: '600' }}>{duration}min</span>
          <span style={{ fontWeight: '600' }}>•</span>
          <span style={{ fontWeight: '600' }}>{resource}</span>
        </div>
      </div>

      {/* Step 1: Add Players */}
      <div style={styles.stepContainer}>
        <div style={styles.drawerSection}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div style={styles.stepTitle}>1: Add Players</div>
            <div style={{ position: 'relative', marginLeft: 'auto' }}>
              <Info 
                size={16} 
                style={{ cursor: 'pointer', color: '#666' }}
                onMouseEnter={() => setShowInfoTooltip(true)}
                onMouseLeave={() => setShowInfoTooltip(false)}
              />
              {showInfoTooltip && (
                <div style={{
                  position: 'absolute',
                  top: '25px',
                  right: '0',
                  background: '#333',
                  color: 'white',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  whiteSpace: 'nowrap',
                  zIndex: 1001,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                }}>
                  Additional fee may apply
                </div>
              )}
            </div>
          </div>
          <div style={styles.drawerButtonRow}>
            {samplePlayers.map((player) => (
              <div key={player.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', position: 'relative' }}>
                <div style={{ position: 'relative' }}>
                  <button
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      border: '2px solid #ddd',
                      background: selectedMemberType === player.name ? '#007bff' : '#f8f9fa',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      color: selectedMemberType === player.name ? 'white' : '#333'
                    }}
                    onClick={() => setSelectedMemberType(player.name)}
                    onMouseEnter={(e) => {
                      if (selectedMemberType !== player.name) {
                        e.currentTarget.style.borderColor = '#007bff'
                        e.currentTarget.style.background = '#e3f2fd'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedMemberType !== player.name) {
                        e.currentTarget.style.borderColor = '#ddd'
                        e.currentTarget.style.background = '#f8f9fa'
                      }
                    }}
                  >
                    {player.hasGuestFee ? (
                      <DollarSign size={24} />
                    ) : (
                      <User size={24} />
                    )}
                  </button>
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
                    onClick={(e) => {
                      e.stopPropagation()
                      // Remove the player logic here
                      console.log('Remove player:', player.name)
                      if (selectedMemberType === player.name) {
                        setSelectedMemberType('')
                      }
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#c82333'
                      e.currentTarget.style.transform = 'scale(1.1)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#dc3545'
                      e.currentTarget.style.transform = 'scale(1)'
                    }}
                    title="Remove player"
                  >
                    ×
                  </button>
                </div>
                <span style={{
                  fontSize: '12px',
                  textAlign: 'center',
                  color: '#333',
                  fontWeight: '500',
                  maxWidth: '80px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {player.name}
                </span>
              </div>
            ))}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <button
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  border: '2px solid #ddd',
                  background: '#f8f9fa',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  color: '#333',
                  fontSize: '20px',
                  fontWeight: 'bold'
                }}
                onClick={handleAddPlayers}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#007bff'
                  e.currentTarget.style.background = '#e3f2fd'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#ddd'
                  e.currentTarget.style.background = '#f8f9fa'
                }}
              >
                +
              </button>
              <span style={{
                fontSize: '12px',
                textAlign: 'center',
                color: '#333',
                fontWeight: '500'
              }}>
                Add
              </span>
            </div>
          </div>
        </div>

        {/* Step 2: Choose Payment Option */}
        <div style={styles.drawerSection}>
          <div style={styles.stepTitle}>2: Choose Payment Option</div>
          <div style={styles.drawerButtonRow}>
            {paymentOptions.map((option) => (
              <button
                key={option}
                style={selectedPaymentOption === option ? styles.paymentButtonSelected : styles.paymentButton}
                onClick={() => setSelectedPaymentOption(option)}
                onMouseEnter={(e) => {
                  if (selectedPaymentOption !== option) {
                    e.currentTarget.style.background = "#ddd"
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedPaymentOption !== option) {
                    e.currentTarget.style.background = "#eee"
                  }
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div style={styles.summarySection}>
        <div style={styles.summaryRow}>
          <span style={styles.summaryLabel}>Base Price:</span>
          <span style={styles.summaryValue}>{basePriceValue} CHF</span>
        </div>
        <div style={styles.summaryRow}>
          <span style={styles.summaryLabel}>Guest Fee:</span>
          <span style={styles.summaryValue}>{guestFee} CHF</span>
        </div>
        <div style={styles.summaryRow}>
          <span style={styles.summaryLabel}>Total VAT (10%):</span>
          <span style={styles.summaryValue}>{vat.toFixed(2)} CHF</span>
        </div>
        <div style={styles.totalRow}>
          <span style={styles.summaryLabel}>Total Booking:</span>
          <span style={styles.summaryValue}>{total.toFixed(2)} CHF</span>
        </div>
      </div>

      {/* Footer with Back and Confirm Booking Buttons */}
      <div style={styles.drawerFooter}>
        <button 
          style={styles.drawerBack} 
          onClick={handleStep2Back}
          onMouseEnter={(e) => e.currentTarget.style.background = "#ddd"}
          onMouseLeave={(e) => e.currentTarget.style.background = "#eee"}
        >
          Back
        </button>
        <button 
          style={styles.bookNowButton}
          onClick={handleBookNow}
          onMouseEnter={(e) => e.currentTarget.style.background = "#218838"}
          onMouseLeave={(e) => e.currentTarget.style.background = "#28a745"}
        >
          Confirm Booking
        </button>
      </div>
    </>
  )

  return (
    <div style={styles.drawerContainer}>
      {/* Content wrapper to left-align all content within the full-width drawer */}
      <div style={styles.contentWrapper}>
        {currentStep === 'step1' ? renderStep1() : renderStep2()}
      </div>

      {/* Add Players Modal Dialog */}
      {isAddPlayersOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            fontFamily: 'Arial, sans-serif',
          }}
          onClick={handleCloseModal}
        >
          <div
            style={{
              width: '280px',
              border: '1px solid #000',
              borderRadius: '8px',
              padding: '16px',
              position: 'relative',
              background: '#fff',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <span 
              className="close-btn"
              style={{
                position: 'absolute',
                top: '8px',
                right: '12px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
              onClick={handleCloseModal}
            >
              ✖
            </span>
            
            <h3 style={{ marginTop: 0 }}>Add players</h3>

            <div className="section" style={{ marginBottom: '16px' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
                Members
              </label>
              <div className="radio-group" style={{ display: 'flex', alignItems: 'flex-start' }}>
                <input 
                  type="radio" 
                  name="playerType" 
                  id="members"
                  checked={playerType === 'members'}
                  onChange={() => setPlayerType('members')}
                  style={{ marginRight: '8px', marginTop: '5px' }}
                  aria-label="Select Members"
                />
                <div 
                  className="search-box"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid #000',
                    padding: '4px 6px',
                    borderRadius: '4px',
                    flex: 1,
                  }}
                >
                  <input 
                    type="text" 
                    placeholder="Search" 
                    value={memberSearch}
                    onChange={(e) => setMemberSearch(e.target.value)}
                    style={{ border: 'none', outline: 'none', flex: 1 }}
                  />
                  <span 
                    className="mic"
                    style={{ marginLeft: '4px', cursor: 'pointer' }}
                  >
                    🎤
                  </span>
                </div>
              </div>
            </div>

            <div className="section" style={{ marginBottom: '16px' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
                Guests
              </label>
              <div className="radio-group" style={{ display: 'flex', alignItems: 'flex-start' }}>
                <input 
                  type="radio" 
                  name="playerType" 
                  id="guests"
                  checked={playerType === 'guests'}
                  onChange={() => setPlayerType('guests')}
                  style={{ marginRight: '8px', marginTop: '5px' }}
                  aria-label="Select Guests"
                />
                <div className="guest-inputs">
                  <input 
                    type="text" 
                    placeholder="Name"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    style={{
                      display: 'block',
                      width: '100%',
                      marginBottom: '6px',
                      padding: '6px',
                      border: '1px solid #aaa',
                      borderRadius: '4px',
                    }}
                  />
                  <input 
                    type="text" 
                    placeholder="Surname"
                    value={guestSurname}
                    onChange={(e) => setGuestSurname(e.target.value)}
                    style={{
                      display: 'block',
                      width: '100%',
                      marginBottom: '6px',
                      padding: '6px',
                      border: '1px solid #aaa',
                      borderRadius: '4px',
                    }}
                  />
                  <input 
                    type="email" 
                    placeholder="E-Mail"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    style={{
                      display: 'block',
                      width: '100%',
                      marginBottom: '6px',
                      padding: '6px',
                      border: '1px solid #aaa',
                      borderRadius: '4px',
                    }}
                  />
                </div>
              </div>
            </div>

            <button 
              className="select-btn"
              onClick={handleSelectPlayers}
              style={{
                display: 'block',
                marginLeft: 'auto',
                padding: '6px 16px',
                backgroundColor: '#ddd',
                border: '1px solid #000',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Select
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export { BookingDrawer } 