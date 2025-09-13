import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import NoCalendarBookingPage from './routes/NoCalendarBookingPage.tsx'
import './style.css'

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/booking/confirm" element={<NoCalendarBookingPage isConfirmPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)