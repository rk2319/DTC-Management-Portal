import React, { useState } from 'react';
import { Calendar, Clock, Users, AlertCircle, Bus, Route, Coffee } from 'lucide-react';
import { format } from 'date-fns';

interface CrewMember {
  id: string;
  name: string;
  status: 'On Duty' | 'Resting' | 'Available';
  hoursWorked: number;
  currentBus?: string;
  restStartTime?: string;
}

interface ShiftData {
  id: string;
  driver: string;
  vehicle: string;
  route: string;
  startTime: string;
  endTime: string;
  status: 'On Duty' | 'Starting Soon' | 'Completed' | 'Delayed';
  type: 'Linked' | 'Unlinked';
  restPeriod?: string;
}

const crewMembers: CrewMember[] = [
  { id: '1', name: 'Rajesh Kumar', status: 'On Duty', hoursWorked: 4, currentBus: 'DL-01-BP-1234' },
  { id: '2', name: 'Suresh Singh', status: 'Resting', hoursWorked: 6, restStartTime: '2024-03-10T12:00:00' },
  { id: '3', name: 'Amit Patel', status: 'On Duty', hoursWorked: 3, currentBus: 'DL-01-BP-5678' },
  { id: '4', name: 'Vikram Singh', status: 'On Duty', hoursWorked: 5, currentBus: 'DL-01-BP-9012' },
  { id: '5', name: 'Deepak Kumar', status: 'Available', hoursWorked: 0 },
  { id: '6', name: 'Rahul Sharma', status: 'On Duty', hoursWorked: 2, currentBus: 'DL-01-BP-3456' },
  { id: '7', name: 'Sanjay Verma', status: 'Resting', hoursWorked: 5, restStartTime: '2024-03-10T13:00:00' },
  { id: '8', name: 'Arun Kumar', status: 'On Duty', hoursWorked: 4, currentBus: 'DL-01-BP-7890' },
  { id: '9', name: 'Manoj Tiwari', status: 'Available', hoursWorked: 0 },
  { id: '10', name: 'Rakesh Singh', status: 'On Duty', hoursWorked: 3, currentBus: 'DL-01-BP-2468' },
  { id: '11', name: 'Vinod Kumar', status: 'Resting', hoursWorked: 7, restStartTime: '2024-03-10T11:30:00' },
  { id: '12', name: 'Praveen Sharma', status: 'On Duty', hoursWorked: 1, currentBus: 'DL-01-BP-1357' },
  { id: '13', name: 'Ajay Gupta', status: 'Available', hoursWorked: 0 },
  { id: '14', name: 'Ravi Kumar', status: 'On Duty', hoursWorked: 2, currentBus: 'DL-01-BP-9876' },
  { id: '15', name: 'Mohit Singh', status: 'On Duty', hoursWorked: 4, currentBus: 'DL-01-BP-5432' }
];

const shifts: ShiftData[] = [
  {
    id: '1',
    driver: 'Rajesh Kumar',
    vehicle: 'DL-01-BP-1234',
    route: 'Route 7A',
    startTime: '2024-03-10T06:00:00',
    endTime: '2024-03-10T14:00:00',
    status: 'On Duty',
    type: 'Linked'
  },
  {
    id: '2',
    driver: 'Suresh Singh',
    vehicle: 'DL-01-BP-5678',
    route: 'Route 12B',
    startTime: '2024-03-10T14:00:00',
    endTime: '2024-03-10T22:00:00',
    status: 'Starting Soon',
    type: 'Unlinked',
    restPeriod: '12:00-13:00'
  },
  {
    id: '3',
    driver: 'Amit Patel',
    vehicle: 'DL-01-BP-9012',
    route: 'Route 15C',
    startTime: '2024-03-10T07:00:00',
    endTime: '2024-03-10T15:00:00',
    status: 'On Duty',
    type: 'Linked'
  },
  {
    id: '4',
    driver: 'Vikram Singh',
    vehicle: 'DL-01-BP-3456',
    route: 'Route 8D',
    startTime: '2024-03-10T05:00:00',
    endTime: '2024-03-10T13:00:00',
    status: 'On Duty',
    type: 'Linked'
  },
  {
    id: '5',
    driver: 'Rahul Sharma',
    vehicle: 'DL-01-BP-7890',
    route: 'Route 5E',
    startTime: '2024-03-10T08:00:00',
    endTime: '2024-03-10T16:00:00',
    status: 'On Duty',
    type: 'Unlinked',
    restPeriod: '11:30-12:30'
  },
  {
    id: '6',
    driver: 'Arun Kumar',
    vehicle: 'DL-01-BP-2468',
    route: 'Route 9F',
    startTime: '2024-03-10T06:30:00',
    endTime: '2024-03-10T14:30:00',
    status: 'On Duty',
    type: 'Linked'
  },
  {
    id: '7',
    driver: 'Rakesh Singh',
    vehicle: 'DL-01-BP-1357',
    route: 'Route 3G',
    startTime: '2024-03-10T07:30:00',
    endTime: '2024-03-10T15:30:00',
    status: 'On Duty',
    type: 'Unlinked',
    restPeriod: '12:30-13:30'
  },
  {
    id: '8',
    driver: 'Praveen Sharma',
    vehicle: 'DL-01-BP-9876',
    route: 'Route 11H',
    startTime: '2024-03-10T09:00:00',
    endTime: '2024-03-10T17:00:00',
    status: 'On Duty',
    type: 'Linked'
  },
  {
    id: '9',
    driver: 'Ravi Kumar',
    vehicle: 'DL-01-BP-5432',
    route: 'Route 14I',
    startTime: '2024-03-10T08:30:00',
    endTime: '2024-03-10T16:30:00',
    status: 'On Duty',
    type: 'Linked'
  },
  {
    id: '10',
    driver: 'Mohit Singh',
    vehicle: 'DL-01-BP-8642',
    route: 'Route 6J',
    startTime: '2024-03-10T06:00:00',
    endTime: '2024-03-10T14:00:00',
    status: 'On Duty',
    type: 'Unlinked',
    restPeriod: '10:30-11:30'
  },
  {
    id: '11',
    driver: 'Deepak Kumar',
    vehicle: 'DL-01-BP-9753',
    route: 'Route 4K',
    startTime: '2024-03-10T14:00:00',
    endTime: '2024-03-10T22:00:00',
    status: 'Starting Soon',
    type: 'Linked'
  },
  {
    id: '12',
    driver: 'Sanjay Verma',
    vehicle: 'DL-01-BP-3579',
    route: 'Route 13L',
    startTime: '2024-03-10T15:00:00',
    endTime: '2024-03-10T23:00:00',
    status: 'Starting Soon',
    type: 'Unlinked',
    restPeriod: '19:00-20:00'
  },
  {
    id: '13',
    driver: 'Manoj Tiwari',
    vehicle: 'DL-01-BP-1598',
    route: 'Route 2M',
    startTime: '2024-03-10T13:00:00',
    endTime: '2024-03-10T21:00:00',
    status: 'Starting Soon',
    type: 'Linked'
  },
  {
    id: '14',
    driver: 'Ajay Gupta',
    vehicle: 'DL-01-BP-7531',
    route: 'Route 10N',
    startTime: '2024-03-10T16:00:00',
    endTime: '2024-03-10T00:00:00',
    status: 'Starting Soon',
    type: 'Unlinked',
    restPeriod: '20:00-21:00'
  },
  {
    id: '15',
    driver: 'Vinod Kumar',
    vehicle: 'DL-01-BP-4680',
    route: 'Route 1P',
    startTime: '2024-03-10T14:30:00',
    endTime: '2024-03-10T22:30:00',
    status: 'Starting Soon',
    type: 'Linked'
  }
];

const StatusBadge = ({ status, type }: { status: ShiftData['status']; type?: ShiftData['type'] }) => {
  const colors = {
    'On Duty': 'bg-green-100 text-green-800',
    'Starting Soon': 'bg-blue-100 text-blue-800',
    'Completed': 'bg-gray-100 text-gray-800',
    'Delayed': 'bg-red-100 text-red-800',
    'Resting': 'bg-yellow-100 text-yellow-800',
    'Available': 'bg-green-100 text-green-800'
  };

  return (
    <div className="flex gap-2">
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors[status]}`}>
        {status}
      </span>
      {type && (
        <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
          {type}
        </span>
      )}
    </div>
  );
};

const Scheduling = () => {
  const [scheduleType, setScheduleType] = useState<'Linked' | 'Unlinked'>('Linked');

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Shift Scheduling</h1>
          <p className="text-gray-600">Manage driver shifts and vehicle assignments</p>
        </div>
        <div className="flex gap-3">
          <div className="flex rounded-lg border overflow-hidden">
            <button
              onClick={() => setScheduleType('Linked')}
              className={`px-4 py-2 ${
                scheduleType === 'Linked'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Linked Duty
            </button>
            <button
              onClick={() => setScheduleType('Unlinked')}
              className={`px-4 py-2 ${
                scheduleType === 'Unlinked'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Unlinked Duty
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Clock className="w-4 h-4" />
            Create New Schedule
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Active Shifts</h3>
            <Clock className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-2xl font-semibold">8</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Available Crew</h3>
            <Users className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl font-semibold">5</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Resting Crew</h3>
            <Coffee className="w-5 h-5 text-yellow-500" />
          </div>
          <p className="text-2xl font-semibold">3</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Active Buses</h3>
            <Bus className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-2xl font-semibold">12</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Current Shifts</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Driver</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Vehicle</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Route</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Time</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Rest Period</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {shifts.map((shift) => (
                  <tr key={shift.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{shift.driver}</td>
                    <td className="px-4 py-3">{shift.vehicle}</td>
                    <td className="px-4 py-3">{shift.route}</td>
                    <td className="px-4 py-3">
                      {format(new Date(shift.startTime), 'HH:mm')} - {format(new Date(shift.endTime), 'HH:mm')}
                    </td>
                    <td className="px-4 py-3">{shift.restPeriod || '-'}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={shift.status} type={shift.type} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Crew Status</h2>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {crewMembers.map((crew) => (
                <div key={crew.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{crew.name}</h3>
                    <StatusBadge status={crew.status} />
                  </div>
                  <div className="text-sm text-gray-500 space-y-1">
                    {crew.currentBus && (
                      <div className="flex items-center gap-2">
                        <Bus className="w-4 h-4" />
                        <span>Bus: {crew.currentBus}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Hours Worked: {crew.hoursWorked}h</span>
                    </div>
                    {crew.restStartTime && (
                      <div className="flex items-center gap-2">
                        <Coffee className="w-4 h-4" />
                        <span>Rest Started: {format(new Date(crew.restStartTime), 'HH:mm')}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scheduling;