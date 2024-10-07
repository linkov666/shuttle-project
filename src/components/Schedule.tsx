import React from 'react'
import { useQuery } from 'react-query'
import { fetchSchedules } from '../api/schedules'

const Schedule: React.FC = () => {
  const { data: schedule, isLoading, error } = useQuery('schedules', fetchSchedules)

  if (isLoading) return <div className="text-center py-10">Loading schedules...</div>
  if (error) return <div className="text-center py-10 text-red-600">Error loading schedules</div>
  if (!schedule) return <div className="text-center py-10">No schedules available</div>

  return (
    <section id="schedule" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Shuttle Schedules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {schedule.map((route, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-blue-600">{route.name}</h3>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left">Location</th>
                    <th className="text-left">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {route.stops.map((stop, stopIndex) => (
                    <tr key={stopIndex} className="border-t">
                      <td className="py-2">{stop.name}</td>
                      <td className="py-2">{stop.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Schedule