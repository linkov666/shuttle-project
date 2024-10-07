import axios from 'axios';
import { Booking, BookingFilter, PaginatedResponse } from '../types';

const API_URL = 'https://api.example.com'; // Replace with your actual API URL

export const getBookings = async (
  filter: BookingFilter,
  page: number = 1,
  limit: number = 20
): Promise<PaginatedResponse<Booking>> => {
  const response = await axios.get(`${API_URL}/bookings`, {
    params: { ...filter, page, limit },
  });
  return response.data;
};

export const createBooking = async (booking: Omit<Booking, 'id'>): Promise<Booking> => {
  const response = await axios.post(`${API_URL}/bookings`, booking);
  return response.data;
};

export const updateBooking = async (id: string, updates: Partial<Booking>): Promise<Booking> => {
  const response = await axios.put(`${API_URL}/bookings/${id}`, updates);
  return response.data;
};

export const deleteBooking = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/bookings/${id}`);
};

export const getBookingStats = async (): Promise<any> => {
  const response = await axios.get(`${API_URL}/bookings/stats`);
  return response.data;
};