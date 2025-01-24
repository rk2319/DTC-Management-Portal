import React from 'react';
import { Battery, Calendar, Filter, MoreVertical, RefreshCcw, Settings, ThermometerSun, PenTool as Tool } from 'lucide-react';

interface VehicleData {
  id: string;
  vehicleNumber: string;
  status: 'Active' | 'In Transit' | 'Maintenance' | 'Out of Service';
  driver: string;
  route: string;
  fuelLevel: number;
  temperature: number;
  lastMaintenance: string;
  nextService: string;
  mileage: number;
  healthScore: number;
}

const mockVehicles: VehicleData[] = [
  {
    id: '1',
    vehicleNumber: 'DL-01-BP-1234',
    status: 'Active',
    driver: 'Rajesh Kumar',
    route: 'Route 7A - Central Delhi',
    fuelLevel: 75,
    temperature: 82,
    lastMaintenance: '2024-02-15',
    nextService: '2024-03-15',
    mileage: 45280,
    healthScore: 92
  },
  {
    id: '2',
    vehicleNumber: 'DL-01-BP-5678',
    status: 'Maintenance',
    driver: 'Suresh Singh',
    route: 'Route 12B - South Delhi',
    fuelLevel: 30,
    temperature: 85,
    lastMaintenance: '2024-01-20',
    nextService: '2024-02-20',
    mileage: 62150,
    healthScore: 68
  },
  {
    id: '3',
    vehicleNumber: 'DL-01-BP-9012',
    status: 'In Transit',
    driver: 'Amit Patel',
    route: 'Route 15C - East Delhi',
    fuelLevel: 45,
    temperature: 78,
    lastMaintenance: '2024-02-01',
    nextService: '2024-03-01',
    mileage: 38420,
    healthScore: 88
  },
  {
    id: '4',
    vehicleNumber: 'DL-01-BP-3456',
    status: 'Out of Service',
    driver: 'Unassigned',
    route: 'Unassigned',
    fuelLevel: 10,
    temperature: 75,
    lastMaintenance: '2024-01-15',
    nextService: '2024-02-15',
    mileage: 71890,
    healthScore: 45
  },
  {
    id: '5',
    vehicleNumber: 'DL-01-BP-7890',
    status: 'Active',
    driver: 'Vikram Singh',
    route: 'Route 5E - North Delhi',
    fuelLevel: 85,
    temperature: 79,
    lastMaintenance: '2024-02-20',
    nextService: '2024-03-20',
    mileage: 32150,
    healthScore: 95
  },
  {
    id: '6',
    vehicleNumber: 'DL-01-BP-2468',
    status: 'In Transit',
    driver: 'Rahul Sharma',
    route: 'Route 9F - West Delhi',
    fuelLevel: 60,
    temperature: 81,
    lastMaintenance: '2024-02-10',
    nextService: '2024-03-10',
    mileage: 41230,
    healthScore: 87
  },
  {
    id: '7',
    vehicleNumber: 'DL-01-BP-1357',
    status: 'Active',
    driver: 'Deepak Kumar',
    route: 'Route 3G - South West Delhi',
    fuelLevel: 70,
    temperature: 80,
    lastMaintenance: '2024-02-18',
    nextService: '2024-03-18',
    mileage: 28760,
    healthScore: 91
  },
  {
    id: '8',
    vehicleNumber: 'DL-01-BP-9876',
    status: 'Maintenance',
    driver: 'Unassigned',
    route: 'Unassigned',
    fuelLevel: 25,
    temperature: 77,
    lastMaintenance: '2024-01-25',
    nextService: '2024-02-25',
    mileage: 55430,
    healthScore: 62
  },
  {
    id: '9',
    vehicleNumber: 'DL-01-BP-5432',
    status: 'Active',
    driver: 'Sanjay Verma',
    route: 'Route 11H - North West Delhi',
    fuelLevel: 80,
    temperature: 83,
    lastMaintenance: '2024-02-12',
    nextService: '2024-03-12',
    mileage: 36890,
    healthScore: 89
  },
  {
    id: '10',
    vehicleNumber: 'DL-01-BP-8642',
    status: 'In Transit',
    driver: 'Arun Kumar',
    route: 'Route 14I - East Delhi',
    fuelLevel: 55,
    temperature: 82,
    lastMaintenance: '2024-02-05',
    nextService: '2024-03-05',
    mileage: 43670,
    healthScore: 85
  },
  {
    id: '11',
    vehicleNumber: 'DL-01-BP-9753',
    status: 'Active',
    driver: 'Manoj Tiwari',
    route: 'Route 6J - Central Delhi',
    fuelLevel: 90,
    temperature: 78,
    lastMaintenance: '2024-02-22',
    nextService: '2024-03-22',
    mileage: 31240,
    healthScore: 94
  },
  {
    id: '12',
    vehicleNumber: 'DL-01-BP-3579',
    status: 'Out of Service',
    driver: 'Unassigned',
    route: 'Unassigned',
    fuelLevel: 15,
    temperature: 76,
    lastMaintenance: '2024-01-18',
    nextService: '2024-02-18',
    mileage: 68920,
    healthScore: 48
  },
  {
    id: '13',
    vehicleNumber: 'DL-01-BP-1598',
    status: 'Active',
    driver: 'Rakesh Singh',
    route: 'Route 8K - South Delhi',
    fuelLevel: 65,
    temperature: 80,
    lastMaintenance: '2024-02-16',
    nextService: '2024-03-16',
    mileage: 39780,
    healthScore: 88
  },
  {
    id: '14',
    vehicleNumber: 'DL-01-BP-7531',
    status: 'In Transit',
    driver: 'Vinod Kumar',
    route: 'Route 13L - West Delhi',
    fuelLevel: 50,
    temperature: 81,
    lastMaintenance: '2024-02-08',
    nextService: '2024-03-08',
    mileage: 47520,
    healthScore: 86
  },
  {
    id: '15',
    vehicleNumber: 'DL-01-BP-4680',
    status: 'Active',
    driver: 'Praveen Sharma',
    route: 'Route 4M - North Delhi',
    fuelLevel: 85,
    temperature: 79,
    lastMaintenance: '2024-02-19',
    nextService: '2024-03-19',
    mileage: 34890,
    healthScore: 93
  },
  {
    id: '16',
    vehicleNumber: 'DL-01-BP-2345',
    status: 'Active',
    driver: 'Ankit Kumar',
    route: 'Route 7A - Central Delhi',
    fuelLevel: 82,
    temperature: 77,
    lastMaintenance: '2024-02-25',
    nextService: '2024-03-25',
    mileage: 29870,
    healthScore: 96
  },
  {
    id: '17',
    vehicleNumber: 'DL-01-BP-6789',
    status: 'Maintenance',
    driver: 'Unassigned',
    route: 'Unassigned',
    fuelLevel: 20,
    temperature: 76,
    lastMaintenance: '2024-01-30',
    nextService: '2024-02-28',
    mileage: 58940,
    healthScore: 58
  },
  {
    id: '18',
    vehicleNumber: 'DL-01-BP-0123',
    status: 'In Transit',
    driver: 'Nitin Verma',
    route: 'Route 12B - South Delhi',
    fuelLevel: 65,
    temperature: 80,
    lastMaintenance: '2024-02-14',
    nextService: '2024-03-14',
    mileage: 42360,
    healthScore: 89
  },
  {
    id: '19',
    vehicleNumber: 'DL-01-BP-4567',
    status: 'Active',
    driver: 'Rajiv Singh',
    route: 'Route 15C - East Delhi',
    fuelLevel: 78,
    temperature: 78,
    lastMaintenance: '2024-02-21',
    nextService: '2024-03-21',
    mileage: 35680,
    healthScore: 92
  },
  {
    id: '20',
    vehicleNumber: 'DL-01-BP-8901',
    status: 'In Transit',
    driver: 'Sandeep Kumar',
    route: 'Route 8D - North Delhi',
    fuelLevel: 55,
    temperature: 81,
    lastMaintenance: '2024-02-11',
    nextService: '2024-03-11',
    mileage: 44890,
    healthScore: 84
  },
  {
    id: '21',
    vehicleNumber: 'DL-01-BP-3579',
    status: 'Active',
    driver: 'Alok Sharma',
    route: 'Route 5E - North Delhi',
    fuelLevel: 88,
    temperature: 76,
    lastMaintenance: '2024-02-23',
    nextService: '2024-03-23',
    mileage: 31240,
    healthScore: 95
  },
  {
    id: '22',
    vehicleNumber: 'DL-01-BP-7890',
    status: 'Out of Service',
    driver: 'Unassigned',
    route: 'Unassigned',
    fuelLevel: 12,
    temperature: 75,
    lastMaintenance: '2024-01-16',
    nextService: '2024-02-16',
    mileage: 65780,
    healthScore: 42
  },
  {
    id: '23',
    vehicleNumber: 'DL-01-BP-2468',
    status: 'Active',
    driver: 'Rohit Gupta',
    route: 'Route 9F - West Delhi',
    fuelLevel: 72,
    temperature: 79,
    lastMaintenance: '2024-02-17',
    nextService: '2024-03-17',
    mileage: 38960,
    healthScore: 90
  },
  {
    id: '24',
    vehicleNumber: 'DL-01-BP-1357',
    status: 'In Transit',
    driver: 'Vijay Kumar',
    route: 'Route 3G - South West Delhi',
    fuelLevel: 58,
    temperature: 82,
    lastMaintenance: '2024-02-09',
    nextService: '2024-03-09',
    mileage: 46730,
    healthScore: 87
  },
  {
    id: '25',
    vehicleNumber: 'DL-01-BP-9876',
    status: 'Active',
    driver: 'Kamal Singh',
    route: 'Route 11H - North West Delhi',
    fuelLevel: 85,
    temperature: 77,
    lastMaintenance: '2024-02-24',
    nextService: '2024-03-24',
    mileage: 33450,
    healthScore: 93
  },
  {
    id: '26',
    vehicleNumber: 'DL-01-BP-5432',
    status: 'Maintenance',
    driver: 'Unassigned',
    route: 'Unassigned',
    fuelLevel: 28,
    temperature: 76,
    lastMaintenance: '2024-01-28',
    nextService: '2024-02-28',
    mileage: 52670,
    healthScore: 65
  },
  {
    id: '27',
    vehicleNumber: 'DL-01-BP-8642',
    status: 'Active',
    driver: 'Dinesh Kumar',
    route: 'Route 14I - East Delhi',
    fuelLevel: 76,
    temperature: 80,
    lastMaintenance: '2024-02-20',
    nextService: '2024-03-20',
    mileage: 37840,
    healthScore: 91
  },
  {
    id: '28',
    vehicleNumber: 'DL-01-BP-9753',
    status: 'In Transit',
    driver: 'Pankaj Verma',
    route: 'Route 6J - Central Delhi',
    fuelLevel: 62,
    temperature: 81,
    lastMaintenance: '2024-02-13',
    nextService: '2024-03-13',
    mileage: 43560,
    healthScore: 86
  },
  {
    id: '29',
    vehicleNumber: 'DL-01-BP-3579',
    status: 'Active',
    driver: 'Mukesh Singh',
    route: 'Route 13L - West Delhi',
    fuelLevel: 80,
    temperature: 78,
    lastMaintenance: '2024-02-22',
    nextService: '2024-03-22',
    mileage: 34780,
    healthScore: 94
  },
  {
    id: '30',
    vehicleNumber: 'DL-01-BP-1598',
    status: 'Out of Service',
    driver: 'Unassigned',
    route: 'Unassigned',
    fuelLevel: 8,
    temperature: 75,
    lastMaintenance: '2024-01-19',
    nextService: '2024-02-19',
    mileage: 69840,
    healthScore: 40
  }
];

const StatusBadge = ({ status }: { status: VehicleData['status'] }) => {
  const colors = {
    'Active': 'bg-green-100 text-green-800',
    'In Transit': 'bg-blue-100 text-blue-800',
    'Maintenance': 'bg-yellow-100 text-yellow-800',
    'Out of Service': 'bg-red-100 text-red-800'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors[status]}`}>
      {status}
    </span>
  );
};

const HealthIndicator = ({ score }: { score: number }) => {
  const getColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="flex items-center gap-2">
      <div className="w-24 h-2 bg-gray-200 rounded-full">
        <div 
          className={`h-full rounded-full ${getColor(score)}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-sm font-medium">{score}%</span>
    </div>
  );
};

const FleetManagement = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Fleet Management</h1>
          <p className="text-gray-600">Monitor and manage your entire fleet in real-time</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <RefreshCcw className="w-4 h-4" />
            Refresh
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Settings className="w-4 h-4" />
            Manage Fleet
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Total Vehicles</h3>
            <span className="text-2xl font-bold">30</span>
          </div>
          <div className="flex gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              Active (12)
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              Inactive (18)
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Average Fuel Level</h3>
            <Battery className="w-6 h-6 text-blue-500" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div className="w-[65%] h-full bg-blue-500 rounded-full"></div>
            </div>
            <span className="font-semibold">65%</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Maintenance Due</h3>
            <Tool className="w-6 h-6 text-yellow-500" />
          </div>
          <div className="text-2xl font-bold text-yellow-500">4</div>
          <p className="text-sm text-gray-600">Vehicles need attention</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Fleet Health</h3>
            <ThermometerSun className="w-6 h-6 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-green-500">85%</div>
          <p className="text-sm text-gray-600">Overall fleet condition</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Vehicle Details</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Vehicle</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Driver</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Route</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Fuel</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Temperature</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Next Service</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Health Score</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600"></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {mockVehicles.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div>
                      <div className="font-medium">{vehicle.vehicleNumber}</div>
                      <div className="text-sm text-gray-500">{vehicle.mileage.toLocaleString()} km</div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={vehicle.status} />
                  </td>
                  <td className="px-4 py-3">{vehicle.driver}</td>
                  <td className="px-4 py-3">{vehicle.route}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${vehicle.fuelLevel}%` }}
                        />
                      </div>
                      <span className="text-sm">{vehicle.fuelLevel}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`${vehicle.temperature > 80 ? 'text-red-600' : 'text-gray-900'}`}>
                      {vehicle.temperature}°F
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>{vehicle.nextService}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <HealthIndicator score={vehicle.healthScore} />
                  </td>
                  <td className="px-4 py-3">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FleetManagement;