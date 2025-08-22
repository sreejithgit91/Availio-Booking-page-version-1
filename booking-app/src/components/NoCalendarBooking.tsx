import React, { useState } from 'react'

interface NoCalendarBookingProps {
  onBack: () => void
  onBook: () => void
}

const NoCalendarBooking: React.FC<NoCalendarBookingProps> = ({ onBack, onBook }) => {
  // State for managing section visibility
  const [showCourtSection, setShowCourtSection] = useState(false)
  const [showConfirmationSection, setShowConfirmationSection] = useState(false)
  
  // State for selections
  const [selectedStartTime, setSelectedStartTime] = useState('')
  const [selectedCourt, setSelectedCourt] = useState('')
  const [selectedDuration, setSelectedDuration] = useState('')
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Credit Card')
  
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
    { minutes: 60, label: '60min', price: 20 }
  ]
  
  const paymentMethods = ['Credit Card', 'PayPal']
  
  // Handle start time selection
  const handleStartTimeSelect = (time: string) => {
    setSelectedStartTime(time)
    setShowCourtSection(true)
  }
  
  // Handle court and duration selection
  const handleCourtDurationSelect = (court: string, duration: string) => {
    setSelectedCourt(court)
    setSelectedDuration(duration)
    setShowConfirmationSection(true)
  }
  
  // Calculate total price
  const selectedCourtData = courts.find(c => c.id === selectedCourt)
  const selectedDurationData = durations.find(d => d.minutes.toString() === selectedDuration)
  const basePrice = selectedCourtData?.price || 0
  const durationPrice = selectedDurationData?.price || 0
  const totalPrice = basePrice + durationPrice
  
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
      fontWeight: 700 as const,
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
      width: '100%',
      padding: '20px',
      backgroundColor: '#28a745',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
      minHeight: '60px'
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
    }
  }

  return (
    <div style={styles.container}>
      {/* Back Button */}
      <button 
        style={styles.backButton}
        onClick={onBack}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5a6268'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6c757d'}
      >
        ← Back to Calendar
      </button>

      {/* Section 1: Select Start Time */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Select Start Time</div>
        <div style={styles.timeGrid}>
          {timeSlots.map((time) => (
            <button
              key={time}
              style={selectedStartTime === time ? styles.timeButtonSelected : styles.timeButton}
              onClick={() => handleStartTimeSelect(time)}
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

      {/* Section 2: Select Court and Booking Duration */}
      {showCourtSection && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Select Court and Booking Duration</div>
          <div style={styles.courtList}>
            {courts.map((court) => {
              const isSelected = selectedCourt === court.id && selectedDuration === '60'
              return (
                <div key={court.id} style={styles.courtRow}>
                  <div style={{ ...styles.courtName, marginBottom: 0 }}>{court.name}</div>
                  <button
                    style={isSelected ? styles.optionCardSelected : styles.optionCard}
                    onClick={(e) => {
                      e.stopPropagation()
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
                    <div style={isSelected ? { ...styles.optionPrice, color: '#fff' } : styles.optionPrice}>{`CHF ${durations[0].price.toFixed(2)}`}</div>
                    <div style={isSelected ? { ...styles.optionMinutes, color: '#fff' } : styles.optionMinutes}>{durations[0].label}</div>
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Section 3: Booking Details, Price and Confirm */}
      {showConfirmationSection && (
        <div style={styles.section}>
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
          <div style={styles.summarySection}>
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
            style={styles.bookButton}
            onClick={onBook}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#218838'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#28a745'}
          >
            Book Now
          </button>
        </div>
      )}
    </div>
  )
}

export default NoCalendarBooking
