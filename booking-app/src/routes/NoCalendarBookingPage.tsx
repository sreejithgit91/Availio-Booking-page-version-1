import React from 'react'
import { useSearchParams } from 'react-router-dom'
import NoCalendarBooking from '@/components/NoCalendarBooking'

interface Props { isConfirmPage?: boolean }

const NoCalendarBookingPage: React.FC<Props> = ({ isConfirmPage = false }) => {
  const [_params] = useSearchParams()
  const blockedMessage = 'Booking in advance is posssible only upto 4 days'

  return (
    <div style={{ backgroundColor: '#f4f7fa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 40px' }}>
        <NoCalendarBooking
          bookingBlocked={false}
          blockedMessage={blockedMessage}
          isConfirmPage={isConfirmPage}
        />
      </div>
    </div>
  )
}

export default NoCalendarBookingPage


