import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Users, Calendar, MapPin, RotateCcw, Package } from 'lucide-react';
import HotelAutocomplete from './HotelAutocomplete';
import ProgressBar from './ProgressBar';
import BookingSummary from './BookingSummary';
import { createBooking } from '../api/bookings';
import { fetchSchedules, getAvailableTimesForLocation, getEstimatedArrivalTime } from '../api/schedules';
import { useQuery } from 'react-query';

const BookingForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const { control, handleSubmit, watch, setValue } = useForm();
  const [availablePickupTimes, setAvailablePickupTimes] = useState<string[]>([]);
  const [availableReturnTimes, setAvailableReturnTimes] = useState<string[]>([]);
  const [estimatedArrivalTime, setEstimatedArrivalTime] = useState<string | null>(null);

  const { data: schedules, isLoading, error } = useQuery('schedules', fetchSchedules);

  useEffect(() => {
    if (schedules) {
      const pickupLocation = watch('pickupLocation');
      if (pickupLocation) {
        const times = getAvailableTimesForLocation(schedules, pickupLocation);
        setAvailablePickupTimes(times);
      }
    }
  }, [schedules, watch('pickupLocation')]);

  const onSubmit = async (data: any) => {
    try {
      const booking = await createBooking(data);
      console.log('Booking created:', booking);
      // Handle successful booking (e.g., show confirmation, reset form)
    } catch (error) {
      console.error('Error creating booking:', error);
      // Handle error (e.g., show error message)
    }
  };

  if (isLoading) return <div>Loading schedules...</div>;
  if (error) return <div>Error loading schedules. Please try again later.</div>;

  return (
    <section id="booking" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Book Your Shuttle</h2>
        <ProgressBar currentStep={step} totalSteps={4} />
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-2/3 px-4">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              {/* Add your form fields here */}
            </form>
          </div>
          <div className="w-full lg:w-1/3 px-4">
            <BookingSummary formData={watch()} />
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <h3 className="text-xl font-semibold mb-4">Booking Instructions</h3>
              {/* Add booking instructions here */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;