import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getBookings, updateBooking, deleteBooking } from '../../api/bookings';
import { Booking, BookingFilter } from '../../types';
import { format } from 'date-fns';
import { useWebSocket } from '../../contexts/WebSocketContext';

const ITEMS_PER_PAGE = 20;

const BookingManagement: React.FC = () => {
  const [filter, setFilter] = useState<BookingFilter>({ date: '', location: '', status: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const { socket } = useWebSocket();

  const { data, isLoading, error } = useQuery(
    ['bookings', filter, currentPage],
    () => getBookings(filter, currentPage, ITEMS_PER_PAGE),
    { keepPreviousData: true }
  );

  const updateMutation = useMutation(updateBooking, {
    onSuccess: () => queryClient.invalidateQueries('bookings'),
  });

  const deleteMutation = useMutation(deleteBooking, {
    onSuccess: () => queryClient.invalidateQueries('bookings'),
  });

  useEffect(() => {
    if (socket) {
      socket.on('bookingUpdate', (updatedBooking: Booking) => {
        queryClient.setQueryData(['bookings', filter, currentPage], (oldData: any) => {
          if (!oldData) return oldData;
          const updatedBookings = oldData.bookings.map((booking: Booking) =>
            booking.id === updatedBooking.id ? updatedBooking : booking
          );
          return { ...oldData, bookings: updatedBookings };
        });
      });
    }

    return () => {
      if (socket) {
        socket.off('bookingUpdate');
      }
    };
  }, [socket, queryClient, filter, currentPage]);

  if (isLoading) return <div>Loading bookings...</div>;
  if (error) return <div>Error loading bookings</div>;

  const { bookings, totalPages, totalItems } = data || { bookings: [], totalPages: 0, totalItems: 0 };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Booking Management</h2>
      
      {/* Filter controls */}
      <div className="mb-4 flex space-x-4">
        <input
          type="date"
          value={filter.date}
          onChange={(e) => setFilter({ ...filter, date: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          value={filter.location}
          onChange={(e) => setFilter({ ...filter, location: e.target.value })}
          placeholder="Location"
          className="border p-2 rounded"
        />
        <select
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">All Statuses</option>
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Bookings table */}
      <table className="w-full bg-white shadow-md rounded">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Date</th>
            <th className="py-3 px-6 text-left">Pickup</th>
            <th className="py-3 px-6 text-left">Dropoff</th>
            <th className="py-3 px-6 text-left">Passengers</th>
            <th className="py-3 px-6 text-left">Total Price</th>
            <th className="py-3 px-6 text-left">Status</th>
            <th className="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {bookings.map((booking: Booking) => (
            <tr key={booking.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6">{format(new Date(booking.date), 'yyyy-MM-dd')}</td>
              <td className="py-3 px-6">{booking.pickupLocation}</td>
              <td className="py-3 px-6">{booking.dropoffLocation}</td>
              <td className="py-3 px-6">{booking.passengers}</td>
              <td className="py-3 px-6">€{booking.totalPrice.toFixed(2)}</td>
              <td className="py-3 px-6">{booking.status}</td>
              <td className="py-3 px-6">
                <button
                  onClick={() => updateMutation.mutate({ ...booking, status: 'confirmed' })}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  Confirm
                </button>
                <button
                  onClick={() => deleteMutation.mutate(booking.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <div>
          Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, totalItems)} of {totalItems} bookings
        </div>
        <div>
          <button
            onClick={() => setCurrentPage(page => Math.max(page - 1, 1))}
            disabled={currentPage === 1}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2 disabled:bg-gray-300"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(page => Math.min(page + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingManagement;