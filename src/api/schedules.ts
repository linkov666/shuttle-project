import axios from 'axios';
import { Schedule } from '../types';

const API_URL = 'https://api.example.com'; // Replace with your actual API URL

const mockSchedules: Schedule[] = [
  {
    id: '1',
    name: 'Morning Shuttle',
    stops: [
      { name: 'Taghazout Village', time: '08:00' },
      { name: 'Taghazout Hotels', time: '08:10' },
      { name: 'Tamraght Main Road', time: '08:20' },
      { name: 'Agadir City Hotels', time: '08:50' },
      { name: 'Souk El Had', time: '09:10' },
      { name: 'Danieland Aquapark', time: '09:30' },
      { name: 'Agadir Golf Courses', time: '10:00' },
    ]
  },
  {
    id: '2',
    name: 'Afternoon Shuttle',
    stops: [
      { name: 'Taghazout Village', time: '12:00' },
      { name: 'Taghazout Hotels', time: '12:10' },
      { name: 'Tamraght Main Road', time: '12:20' },
      { name: 'Agadir City Hotels', time: '12:50' },
      { name: 'Souk El Had', time: '13:10' },
      { name: 'Danieland Aquapark', time: '13:30' },
      { name: 'Agadir Golf Courses', time: '14:00' },
    ]
  }
];

export const fetchSchedules = async (): Promise<Schedule[]> => {
  try {
    const response = await axios.get(`${API_URL}/schedules`);
    return response.data.map((schedule: any) => ({
      id: schedule.id,
      name: schedule.name,
      stops: schedule.stops.map((stop: any) => ({
        name: stop.name,
        time: stop.time
      }))
    }));
  } catch (error) {
    console.error('Error fetching schedules:', error);
    // Return mock data if API call fails
    return mockSchedules;
  }
};

// ... (rest of the file remains unchanged)