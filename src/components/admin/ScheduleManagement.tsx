import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getSchedules, createSchedule, updateSchedule, deleteSchedule } from '../../api/schedules';
import { Schedule } from '../../types';

const ScheduleManagement: React.FC = () => {
  const [newSchedule, setNewSchedule] = useState<Partial<Schedule>>({});
  const queryClient = useQueryClient();

  const { data: schedules, isLoading, error } = useQuery('schedules', getSchedules);

  const createMutation = useMutation(createSchedule, {
    onSuccess: () => {
      queryClient.invalidateQueries('schedules');
      setNewSchedule({});
    },
  });

  const updateMutation = useMutation(updateSchedule, {
    onSuccess: () => queryClient.invalidateQueries('schedules'),
  });

  const deleteMutation = useMutation(deleteSchedule, {
    onSuccess: () => queryClient.invalidateQueries('schedules'),
  });

  if (isLoading) return <div>Loading schedules...</div>;
  if (error) return <div>Error loading schedules</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Schedule Management</h2>
      {/* Add your schedule management UI here */}
    </div>
  );
};

export default ScheduleManagement;