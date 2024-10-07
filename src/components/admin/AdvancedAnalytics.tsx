import React from 'react';
import { useQuery } from 'react-query';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getAdvancedAnalytics } from '../../api/analytics';

const AdvancedAnalytics: React.FC = () => {
  const { data, isLoading, error } = useQuery('advancedAnalytics', getAdvancedAnalytics);

  if (isLoading) return <div>Loading advanced analytics...</div>;
  if (error) return <div>Error loading advanced analytics</div>;

  const { revenueForecasts, demandPredictions } = data;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Advanced Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Revenue Forecast</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueForecasts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="actualRevenue" stroke="#8884d8" name="Actual Revenue" />
              <Line type="monotone" dataKey="forecastRevenue" stroke="#82ca9d" name="Forecast Revenue" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Demand Prediction</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={demandPredictions}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="actualDemand" stroke="#8884d8" name="Actual Demand" />
              <Line type="monotone" dataKey="predictedDemand" stroke="#82ca9d" name="Predicted Demand" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdvancedAnalytics;