import React from 'react';
import { useQuery } from 'react-query';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';
import { getBookings } from '../../api/bookings';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

const PerformanceAnalytics: React.FC = () => {
  const { data: bookings, isLoading, error } = useQuery('bookings', getBookings);

  if (isLoading) return <div>Loading performance data...</div>;
  if (error) return <div>Error loading performance data</div>;

  const seatUtilization = bookings.reduce((acc, booking) => {
    const totalSeats = 18; // Assuming 18 seats per shuttle
    const occupiedSeats = booking.adults + booking.children;
    acc.occupied += occupiedSeats;
    acc.empty += totalSeats - occupiedSeats;
    return acc;
  }, { occupied: 0, empty: 0 });

  const routePopularity = bookings.reduce((acc, booking) => {
    const route = `${booking.pickupLocation} to ${booking.dropoffLocation}`;
    acc[route] = (acc[route] || 0) + 1;
    return acc;
  }, {});

  const pieChartData = {
    labels: ['Occupied Seats', 'Empty Seats'],
    datasets: [
      {
        data: [seatUtilization.occupied, seatUtilization.empty],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
      },
    ],
  };

  const lineChartData = {
    labels: Object.keys(routePopularity),
    datasets: [
      {
        label: 'Route Popularity',
        data: Object.values(routePopularity),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Performance Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Seat Utilization</h3>
          <Pie data={pieChartData} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Route Popularity</h3>
          <Line data={lineChartData} />
        </div>
      </div>

      <div className="mt-6 bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Key Performance Indicators</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h4 className="font-semibold">Average Occupancy Rate</h4>
            <p className="text-2xl font-bold text-blue-600">
              {((seatUtilization.occupied / (seatUtilization.occupied + seatUtilization.empty)) * 100).toFixed(2)}%
            </p>
          </div>
          <div>
            <h4 className="font-semibold">Most Popular Route</h4>
            <p className="text-2xl font-bold text-green-600">
              {Object.entries(routePopularity).reduce((a, b) => a[1] > b[1] ? a : b)[0]}
            </p>
          </div>
          <div>
            <h4 className="font-semibold">Total Trips</h4>
            <p className="text-2xl font-bold text-purple-600">
              {bookings.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceAnalytics;