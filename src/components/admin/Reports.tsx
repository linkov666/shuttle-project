import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getReports, exportReportCSV, exportReportPDF } from '../../api/reports';
import { format } from 'date-fns';

const Reports: React.FC = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const { data: reports, isLoading, error } = useQuery(['reports', startDate, endDate], () => getReports(startDate, endDate));

  const handleExportCSV = async () => {
    const csvData = await exportReportCSV(startDate, endDate);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `report_${format(new Date(), 'yyyy-MM-dd')}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleExportPDF = async () => {
    const pdfBlob = await exportReportPDF(startDate, endDate);
    const url = window.URL.createObjectURL(pdfBlob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `report_${format(new Date(), 'yyyy-MM-dd')}.pdf`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (isLoading) return <div>Loading reports...</div>;
  if (error) return <div>Error loading reports</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Reports</h2>
      
      <div className="mb-4 flex space-x-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 rounded"
        />
        <button onClick={handleExportCSV} className="bg-blue-500 text-white px-4 py-2 rounded">
          Export CSV
        </button>
        <button onClick={handleExportPDF} className="bg-green-500 text-white px-4 py-2 rounded">
          Export PDF
        </button>
      </div>

      <table className="w-full bg-white shadow-md rounded">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Date</th>
            <th className="py-3 px-6 text-left">Total Bookings</th>
            <th className="py-3 px-6 text-left">Total Revenue</th>
            <th className="py-3 px-6 text-left">Average Occupancy</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {reports?.map((report) => (
            <tr key={report.date} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6">{report.date}</td>
              <td className="py-3 px-6">{report.totalBookings}</td>
              <td className="py-3 px-6">€{report.totalRevenue.toFixed(2)}</td>
              <td className="py-3 px-6">{(report.averageOccupancy * 100).toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;