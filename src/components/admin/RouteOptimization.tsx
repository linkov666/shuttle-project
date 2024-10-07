import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getBookings } from '../../api/bookings';

const RouteOptimization: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const { data: bookings, isLoading, error } = useQuery('bookings', getBookings);

  if (isLoading) return <div>Loading route data...</div>;
  if (error) return <div>Error loading route data</div>;

  const filteredBookings = selectedDate
    ? bookings.filter(booking => booking.date === selectedDate)
    : bookings;

  const routeData = filteredBookings.reduce((acc, booking) => {
    const route = `${booking.pickupLocation} to ${booking.dropoffLocation}`;
    if (!acc[route]) {
      acc[route] = { count: 0, passengers: 0 };
    }
    acc[route].count += 1;
    acc[route].passengers += booking.adults + booking.children;
    return acc;
  }, {});

  const sortedRoutes = Object.entries(routeData).sort((a, b) => b[1].passengers - a[1].passengers);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Route Optimization</h2>
      
      <div className="mb-4">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Popular Routes</h3>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Route</th>
              <th className="py-3 px-6 text-left">Bookings</th>
              <th className="py-3 px-6 text-left">Total Passengers</th>
              <th className="py-3 px-6 text-left">Recommended Shuttles</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {sortedRoutes.map(([route, data]) => (
              <tr key={route} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6">{route}</td>
                <td className="py-3 px-6">{data.count}</td>
                <td className="py-3 px-6">{data.passengers}</td>
                <td className="py-3 px-6">{Math.ceil(data.passengers / 18)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Optimization Recommendations</h3>
        <ul className="list-disc pl-5">
          <li>Consider adding more shuttles for the most popular routes.</li>
          <li>Optimize pickup times based on passenger demand.</li>
          <li>Explore options for express routes between high-traffic locations.</li>
          <li>Monitor underperforming routes for potential schedule adjustments.</li>
        </ul>
      </div>
    </div>
  );
};

export default RouteOptimization;