import React, { useState, useEffect, forwardRef } from 'react'

const agadirHotels = [
  'Sofitel Agadir Thalassa Sea & Spa',
  'Royal Atlas & Spa',
  'Hotel Riu Palace Tikida Agadir',
  'Hotel Atlantic Palace Agadir Golf Thalasso & Casino Resort',
  'Riu Tikida Beach (Adults Only)',
  'Tikida Golf Palace',
  'Kenzi Europa Hotel',
  'Sofitel Agadir Royal Bay Resort',
  'Iberostar Founty Beach',
  'Timoulay Hotel & Spa Agadir',
  'Hotel Tildi & Spa',
  'Labranda Dunes d\'Or Resort',
  'Allegro Agadir',
  'Odyssee Park Hotel',
  'Anezi Tower Hotel & Apartments',
  'LTI Agadir Beach Club',
  'Hôtel Club Al Moggar Garden Beach',
  'Bianca Beach Family & Resort'
]

const taghazoutHotels = [
  'Hyatt Regency Taghazout',
  'Fairmont Taghazout Bay',
  'Hilton Taghazout Bay Beach Resort & Spa',
  'Hyatt Place Taghazout Bay',
  'Riu Palace Tikida Taghazout',
  'Radisson Blu Resort Taghazout Bay Surf Village',
  'Sol House Taghazout Bay - Surf',
  'White Beach Resort Taghazout',
  'Paradis Plage Surf Yoga & Spa Resort'
]

interface HotelAutocompleteProps {
  value: string
  onChange: (value: string) => void
  placeholder: string
  error?: string
  location: string
}

const HotelAutocomplete = forwardRef<HTMLInputElement, HotelAutocompleteProps>(
  ({ value, onChange, placeholder, error, location }, ref) => {
    const [inputValue, setInputValue] = useState(value || '')
    const [suggestions, setSuggestions] = useState<string[]>([])

    const hotels = location === 'Agadir City Hotels' ? agadirHotels : taghazoutHotels

    useEffect(() => {
      setInputValue(value || '')
    }, [value])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setInputValue(newValue)
      onChange(newValue)

      if (newValue.length > 0) {
        const filteredSuggestions = hotels.filter(hotel =>
          hotel.toLowerCase().includes(newValue.toLowerCase())
        )
        setSuggestions(filteredSuggestions)
      } else {
        setSuggestions([])
      }
    }

    const handleSuggestionClick = (suggestion: string) => {
      setInputValue(suggestion)
      onChange(suggestion)
      setSuggestions([])
    }

    return (
      <div className="relative">
        <input
          type="text"
          ref={ref}
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full p-2 border rounded"
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        {suggestions.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
)

export default HotelAutocomplete