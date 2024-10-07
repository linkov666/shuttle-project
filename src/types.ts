export interface Booking {
  id: string
  date: string
  pickupLocation: string
  dropoffLocation: string
  pickupTime: string
  returnPickupTime: string
  adults: number
  children: number
  golfPacks: number
  firstName: string
  lastName: string
  email: string
  totalPrice: number
}

// ... (keep any existing types)