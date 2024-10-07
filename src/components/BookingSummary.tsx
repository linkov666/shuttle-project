import React from 'react';
import { Users, Calendar, MapPin, RotateCcw, Package } from 'lucide-react';

interface BookingSummaryProps {
  formData: any;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({ formData }) => {
  const calculateTotalPrice = () => {
    const adultPrice = 7;
    const childPrice = 4;
    const golfPackPrice = 2.5;

    const total = (formData.adults * adultPrice) +
                  (formData.children * childPrice) +
                  (formData.golfPacks * golfPackPrice);

    return total.toFixed(2);
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h3 className="text-xl font-semibold mb-4">Booking Summary</h3>
      <div className="space-y-4">
        {formData.date && (
          <div className="flex items-center">
            <Calendar className="mr-2" size={20} />
            <span>Date: {formData.date.toLocaleDateString()}</span>
          </div>
        )}
        {formData.pickupLocation && (
          <div className="flex items-center">
            <MapPin className="mr-2" size={20} />
            <span>From: {formData.pickupLocation} {formData.pickupHotel && `(${formData.pickupHotel})`} at {formData.pickupTime}</span>
          </div>
        )}
        {formData.dropoffLocation && (
          <div className="flex items-center">
            <MapPin className="mr-2" size={20} />
            <span>To: {formData.dropoffLocation} at {formData.estimatedArrivalTime}</span>
          </div>
        )}
        {(formData.adults || formData.children) && (
          <div className="flex items-center">
            <Users className="mr-2" size={20} />
            <span>Passengers: {formData.adults || 0} Adult(s), {formData.children || 0} Child(ren)</span>
          </div>
        )}
        {formData.golfPacks > 0 && (
          <div className="flex items-center">
            <Package className="mr-2" size={20} />
            <span>Golf Packs: {formData.golfPacks}</span>
          </div>
        )}
        <div className="font-semibold">
          Total Price: €{calculateTotalPrice()}
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;