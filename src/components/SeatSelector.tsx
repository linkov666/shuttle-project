import React from 'react'

interface SeatSelectorProps {
  totalSeats: number
  selectedSeats: number[]
  onSeatSelect: (seats: number[]) => void
}

const SeatSelector: React.FC<SeatSelectorProps> = ({ totalSeats, selectedSeats, onSeatSelect }) => {
  const handleSeatClick = (seatNumber: number) => {
    const updatedSeats = selectedSeats.includes(seatNumber)
      ? selectedSeats.filter(seat => seat !== seatNumber)
      : [...selectedSeats, seatNumber]
    onSeatSelect(updatedSeats)
  }

  const renderSeat = (seatNumber: number) => {
    const isSelected = selectedSeats.includes(seatNumber)
    return (
      <button
        key={seatNumber}
        onClick={() => handleSeatClick(seatNumber)}
        className={`w-12 h-12 m-1 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
          isSelected
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        {seatNumber}
      </button>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h4 className="text-lg font-semibold mb-4">Select Your Seats</h4>
      <div className="flex flex-wrap justify-center max-w-md mx-auto">
        <div className="w-full flex justify-center mb-4">
          <div className="w-16 h-8 bg-gray-400 rounded-t-lg flex items-center justify-center text-white text-sm">
            Driver
          </div>
        </div>
        {Array.from({ length: totalSeats }, (_, index) => renderSeat(index + 1))}
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Selected seats: {selectedSeats.sort((a, b) => a - b).join(', ')}
        </p>
        <p className="text-sm text-gray-600">
          Total cost: €{(selectedSeats.length * 1.5).toFixed(2)}
        </p>
      </div>
    </div>
  )
}

export default SeatSelector