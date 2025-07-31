import React from 'react'
import './App.css'
import Header from './components/Header'
import VenueHeader from './components/VenueHeader'
import DateSelector from './components/DateSelector'
import TimeSlotGrid from './components/TimeSlotGrid'
import BookingSelection from './components/BookingSelection'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <VenueHeader />
      <main className="flex-1">
        <DateSelector />
        <TimeSlotGrid />
        <BookingSelection />
      </main>
      <Footer />
    </div>
  )
}

export default App