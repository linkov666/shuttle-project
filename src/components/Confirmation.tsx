import React from 'react'
import { Link } from 'react-router-dom'

const Confirmation: React.FC = () => {
  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-600">Booking Confirmed!</h2>
      <p className="mb-4 text-center">
        Thank you for booking with us. Your shuttle reservation has been confirmed.
      </p>
      <p className="mb-4 text-center">
        A confirmation email with your booking details has been sent to your email address.
      </p>
      <div className="text-center">
        <Link
          to="/"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Return to Home
        </Link>
      </div>
    </div>
  )
}

export default Confirmation