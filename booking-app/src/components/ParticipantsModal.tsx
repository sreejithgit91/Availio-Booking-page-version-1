import React from 'react'

interface Participant {
  id: string
  name: string
  isOrganizer: boolean
}

interface ParticipantsModalProps {
  isOpen: boolean
  onClose: () => void
  participants: Participant[]
  bookingTime: string
  courtName: string
}

const ParticipantsModal: React.FC<ParticipantsModalProps> = ({
  isOpen,
  onClose,
  participants,
  bookingTime,
  courtName,
}) => {
  // Separate organizer from other participants
  const organizer = participants.find(p => p.isOrganizer)
  const otherParticipants = participants.filter(p => !p.isOrganizer)

  return (
    <>
      {isOpen && (
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
            onClick={onClose}
          />
          
          {/* Modal */}
          <div 
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '24px',
              maxWidth: '400px',
              width: '90%',
              maxHeight: '80vh',
              overflowY: 'auto',
              zIndex: 10001,
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 8px 0' }}>
                Booking Participants
              </h2>
              <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
                View the list of participants for this booking
              </p>
            </div>
            
            {/* Booking details */}
            <div style={{ textAlign: 'center', marginBottom: '20px', fontSize: '14px', color: '#666' }}>
              <p style={{ fontWeight: '500', margin: '0 0 4px 0' }}>{bookingTime}</p>
              <p style={{ margin: 0 }}>{courtName}</p>
            </div>

            {/* Organizer section */}
            {organizer && (
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '500', color: '#666', margin: '0 0 8px 0' }}>
                  Organizer
                </h3>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px', 
                  padding: '12px', 
                  backgroundColor: '#eff6ff', 
                  borderRadius: '8px' 
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#3b82f6',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    {organizer.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p style={{ fontWeight: '500', margin: '0 0 2px 0' }}>{organizer.name}</p>
                    <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>Organizer</p>
                  </div>
                </div>
              </div>
            )}

            {/* Other participants section */}
            {otherParticipants.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '500', color: '#666', margin: '0 0 8px 0' }}>
                  Participants ({otherParticipants.length})
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {otherParticipants.map((participant) => (
                    <div key={participant.id} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '12px', 
                      padding: '12px', 
                      backgroundColor: '#f9fafb', 
                      borderRadius: '8px' 
                    }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        backgroundColor: '#6b7280',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}>
                        {participant.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <p style={{ fontWeight: '500', margin: 0 }}>{participant.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Empty state */}
            {otherParticipants.length === 0 && (
              <div style={{ textAlign: 'center', padding: '16px', color: '#666' }}>
                <p style={{ fontSize: '14px', margin: 0 }}>No additional participants</p>
              </div>
            )}

            {/* Close button */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'none',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                color: '#666',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ×
            </button>
          </div>
        </>
      )}
    </>
  )
}

export default ParticipantsModal 