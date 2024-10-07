import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getBookings } from '../../api/bookings';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RevenueReport: React.FC = () => {
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const { data: bookings, isLoading, error } = useQuery('bookings', getBookings);

  if (isLoading) return <div>Loading revenue data...</div>;
  if (error) return <div>Error loading revenue data</div>;

  const filteredBookings = bookings?.filter(booking => 
    (!dateRange.start || booking.date >= dateRange.start) &&
    (!dateRange.end || booking.date <= dateRange.end)
  );

  const revenueByDate = filteredBookings?.reduce((acc, booking) => {
    acc[booking.date] = (acc[booking.date] || 0) + booking.totalPrice;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(revenueByDate || {}),
    datasets: [
      {
        label: 'Daily Revenue',
        data: Object.values(revenueByDate || {}),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const totalRevenue = filteredBookings?.reduce((sum, booking) => sum + booking.totalPrice, 0) || 0;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Revenue Report</h2>

      <div className="mb-4 flex space-x-4">
        <input
          type="date"
          value={dateRange.start}
          onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={dateRange.end}
          onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
          className="border p-2 rounded"
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
        <p className="text-3xl font-bold text-green-600">€{totalRevenue.toFixed(2)}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Daily Revenue</h3>
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default RevenueReport;