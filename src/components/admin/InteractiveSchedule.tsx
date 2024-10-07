import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getSchedules, updateSchedule } from '../../api/schedules';

const localizer = momentLocalizer(moment);

interface ScheduleEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resourceId: string;
}

const InteractiveSchedule: React.FC = () => {
  const [view, setView] = useState('week');
  const queryClient = useQueryClient();

  const { data: schedules, isLoading, error } = useQuery('schedules', getSchedules);

  const updateMutation = useMutation(updateSchedule, {
    onSuccess: () => queryClient.invalidateQueries('schedules'),
  });

  if (isLoading) return <div>Loading schedules...</div>;
  if (error) return <div>Error loading schedules</div>;

  const events: ScheduleEvent[] = schedules?.map((schedule: any) => ({
    id: schedule.id,
    title: `${schedule.name} - ${schedule.availableSeats} seats`,
    start: new Date(schedule.startTime),
    end: new Date(schedule.endTime),
    resourceId: schedule.shuttleId,
  })) || [];

  const handleEventDrop = ({ event, start, end }: any) => {
    updateMutation.mutate({
      id: event.id,
      startTime: start,
      endTime: end,
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Interactive Schedule</h2>
      <div style={{ height: '500px' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView={view}
          onView={setView}
          onEventDrop={handleEventDrop}
          resizable
          selectable
          style={{ height: '100%' }}
        />
      </div>
    </div>
  );
};

export default InteractiveSchedule;