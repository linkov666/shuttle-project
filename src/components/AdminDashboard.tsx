import React from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import { BarChart2, Calendar, Users, FileText, Settings } from 'lucide-react'

// Placeholder components (we'll implement these later)
import Overview from './admin/Overview'
import BookingManagement from './admin/BookingManagement'
import ScheduleManagement from './admin/ScheduleManagement'
import UserManagement from './admin/UserManagement'
import Reports from './admin/Reports'

const AdminDashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        </div>
        <nav className="mt-4">
          <Link to="/admin" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
            <BarChart2 className="inline-block mr-2" size={18} />
            Overview
          </Link>
          <Link to="/admin/bookings" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
            <Calendar className="inline-block mr-2" size={18} />
            Bookings
          </Link>
          <Link to="/admin/schedules" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
            <Settings className="inline-block mr-2" size={18} />
            Schedules
          </Link>
          <Link to="/admin/users" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
            <Users className="inline-block mr-2" size={18} />
            Users
          </Link>
          <Link to="/admin/reports" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
            <FileText className="inline-block mr-2" size={18} />
            Reports
          </Link>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <div className="container mx-auto px-6 py-8">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/bookings" element={<BookingManagement />} />
            <Route path="/schedules" element={<ScheduleManagement />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard