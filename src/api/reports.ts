import axios from 'axios';

const API_URL = 'https://api.example.com'; // Replace with your actual API URL

export const getReports = async (startDate: string, endDate: string) => {
  const response = await axios.get(`${API_URL}/reports`, { params: { startDate, endDate } });
  return response.data;
};

export const exportReportCSV = async (startDate: string, endDate: string) => {
  const response = await axios.get(`${API_URL}/reports/export/csv`, {
    params: { startDate, endDate },
    responseType: 'blob',
  });
  return response.data;
};

export const exportReportPDF = async (startDate: string, endDate: string) => {
  const response = await axios.get(`${API_URL}/reports/export/pdf`, {
    params: { startDate, endDate },
    responseType: 'blob',
  });
  return response.data;
};