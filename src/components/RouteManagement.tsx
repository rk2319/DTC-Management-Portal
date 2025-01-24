import React, { useState } from 'react';
import { Map, Route, AlertCircle, Users, Clock, Search, Filter, Plus } from 'lucide-react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

interface RouteData {
  id: string;
  name: string;
  startPoint: string;
  endPoint: string;
  stops: number;
  distance: string;
  duration: string;
  activeVehicles: number;
  passengers: number;
  status: 'Active' | 'Delayed' | 'Suspended';
  coordinates: [number, number][];
  overlap?: string[];
}

const customIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  shadowSize: [41, 41]
});

const routes: RouteData[] = [
  {
    id: '1',
    name: 'Route 7A',
    startPoint: 'Connaught Place',
    endPoint: 'Dwarka Sector 21',
    stops: 24,
    distance: '25.5 km',
    duration: '55 min',
    activeVehicles: 5,
    passengers: 450,
    status: 'Active',
    coordinates: [[28.6139, 77.2090], [28.5955, 77.1937], [28.5823, 77.1571]],
    overlap: ['Route 12B']
  },
  {
    id: '2',
    name: 'Route 12B',
    startPoint: 'Nehru Place',
    endPoint: 'Rohini Sector 18',
    stops: 18,
    distance: '22.3 km',
    duration: '45 min',
    activeVehicles: 4,
    passengers: 380,
    status: 'Delayed',
    coordinates: [[28.5485, 77.2513], [28.6139, 77.2090], [28.7131, 77.1311]]
  },
  {
    id: '3',
    name: 'Route 15C',
    startPoint: 'Lajpat Nagar',
    endPoint: 'Mayur Vihar Phase 3',
    stops: 15,
    distance: '18.7 km',
    duration: '40 min',
    activeVehicles: 3,
    passengers: 290,
    status: 'Active',
    coordinates: [[28.5707, 77.2433], [28.6080, 77.2659], [28.6127, 77.3387]]
  },
  {
    id: '4',
    name: 'Route 8D',
    startPoint: 'Karol Bagh',
    endPoint: 'Noida Sector 62',
    stops: 22,
    distance: '28.1 km',
    duration: '65 min',
    activeVehicles: 6,
    passengers: 520,
    status: 'Active',
    coordinates: [[28.6520, 77.1902], [28.6139, 77.2090], [28.6266, 77.3649]]
  },
  {
    id: '5',
    name: 'Route 5E',
    startPoint: 'INA Market',
    endPoint: 'Shahdara',
    stops: 20,
    distance: '19.8 km',
    duration: '50 min',
    activeVehicles: 4,
    passengers: 340,
    status: 'Active',
    coordinates: [[28.5735, 77.2094], [28.6139, 77.2090], [28.6697, 77.2917]]
  },
  {
    id: '6',
    name: 'Route 9F',
    startPoint: 'Vasant Kunj',
    endPoint: 'Anand Vihar ISBT',
    stops: 25,
    distance: '26.4 km',
    duration: '60 min',
    activeVehicles: 5,
    passengers: 420,
    status: 'Delayed',
    coordinates: [[28.5253, 77.1553], [28.6139, 77.2090], [28.6469, 77.3157]]
  },
  {
    id: '7',
    name: 'Route 3G',
    startPoint: 'Saket',
    endPoint: 'Kashmere Gate',
    stops: 16,
    distance: '20.2 km',
    duration: '45 min',
    activeVehicles: 4,
    passengers: 310,
    status: 'Active',
    coordinates: [[28.5244, 77.2158], [28.6139, 77.2090], [28.6667, 77.2309]]
  },
  {
    id: '8',
    name: 'Route 11H',
    startPoint: 'Hauz Khas',
    endPoint: 'Dilshad Garden',
    stops: 23,
    distance: '24.7 km',
    duration: '55 min',
    activeVehicles: 5,
    passengers: 390,
    status: 'Active',
    coordinates: [[28.5494, 77.2001], [28.6139, 77.2090], [28.6825, 77.3235]]
  },
  {
    id: '9',
    name: 'Route 14I',
    startPoint: 'Malviya Nagar',
    endPoint: 'Jahangirpuri',
    stops: 21,
    distance: '23.5 km',
    duration: '50 min',
    activeVehicles: 4,
    passengers: 360,
    status: 'Suspended',
    coordinates: [[28.5362, 77.2098], [28.6139, 77.2090], [28.7297, 77.1674]]
  },
  {
    id: '10',
    name: 'Route 6J',
    startPoint: 'Munirka',
    endPoint: 'Seemapuri',
    stops: 19,
    distance: '25.8 km',
    duration: '58 min',
    activeVehicles: 5,
    passengers: 430,
    status: 'Active',
    coordinates: [[28.5577, 77.1742], [28.6139, 77.2090], [28.6867, 77.3399]]
  },
  {
    id: '11',
    name: 'Route 4K',
    startPoint: 'Safdarjung',
    endPoint: 'Seelampur',
    stops: 17,
    distance: '21.3 km',
    duration: '48 min',
    activeVehicles: 4,
    passengers: 350,
    status: 'Active',
    coordinates: [[28.5679, 77.2099], [28.6139, 77.2090], [28.6681, 77.2726]]
  },
  {
    id: '12',
    name: 'Route 13L',
    startPoint: 'Dhaula Kuan',
    endPoint: 'Welcome',
    stops: 20,
    distance: '22.9 km',
    duration: '52 min',
    activeVehicles: 5,
    passengers: 400,
    status: 'Delayed',
    coordinates: [[28.5921, 77.1691], [28.6139, 77.2090], [28.6631, 77.2789]]
  },
  {
    id: '13',
    name: 'Route 2M',
    startPoint: 'Palam',
    endPoint: 'Shastri Park',
    stops: 24,
    distance: '27.6 km',
    duration: '62 min',
    activeVehicles: 6,
    passengers: 480,
    status: 'Active',
    coordinates: [[28.5859, 77.0874], [28.6139, 77.2090], [28.6765, 77.2520]]
  },
  {
    id: '14',
    name: 'Route 10N',
    startPoint: 'IGI Airport',
    endPoint: 'Nand Nagri',
    stops: 26,
    distance: '29.4 km',
    duration: '65 min',
    activeVehicles: 6,
    passengers: 510,
    status: 'Active',
    coordinates: [[28.5562, 77.1000], [28.6139, 77.2090], [28.6914, 77.3051]]
  },
  {
    id: '15',
    name: 'Route 1P',
    startPoint: 'Mahipalpur',
    endPoint: 'Yamuna Vihar',
    stops: 22,
    distance: '26.8 km',
    duration: '58 min',
    activeVehicles: 5,
    passengers: 440,
    status: 'Active',
    coordinates: [[28.5494, 77.1220], [28.6139, 77.2090], [28.6872, 77.2777]]
  }
];

const StatusBadge = ({ status }: { status: RouteData['status'] }) => {
  const colors = {
    'Active': 'bg-green-100 text-green-800',
    'Delayed': 'bg-yellow-100 text-yellow-800',
    'Suspended': 'bg-red-100 text-red-800'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors[status]}`}>
      {status}
    </span>
  );
};

const RouteManagement = () => {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [showOverlaps, setShowOverlaps] = useState(false);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Route Management</h1>
          <p className="text-gray-600">Monitor and optimize transit routes</p>
        </div>
        <div className="flex gap-3">
          <button 
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
            onClick={() => setShowOverlaps(!showOverlaps)}
          >
            <Filter className="w-4 h-4" />
            {showOverlaps ? 'Hide Overlaps' : 'Show Overlaps'}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4" />
            Add New Route
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Route Map</h2>
            </div>
            <div className="h-[600px]">
              <MapContainer 
                center={[28.6139, 77.2090]} 
                zoom={12} 
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                  maxZoom={20}
                  subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                  attribution='&copy; Google Maps'
                />
                {routes.map((route) => (
                  <React.Fragment key={route.id}>
                    <Polyline
                      positions={route.coordinates}
                      color={selectedRoute === route.id ? '#2563eb' : '#64748b'}
                      weight={3}
                      onClick={() => setSelectedRoute(route.id)}
                    />
                    {route.coordinates.map((coord, index) => (
                      <Marker
                        key={`${route.id}-${index}`}
                        position={coord}
                        icon={customIcon}
                      >
                        <Popup>
                          <div className="p-2">
                            <h3 className="font-semibold">{route.name}</h3>
                            <p className="text-sm text-gray-600">
                              {index === 0 ? 'Start: ' + route.startPoint :
                               index === route.coordinates.length - 1 ? 'End: ' + route.endPoint :
                               'Stop ' + index}
                            </p>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </React.Fragment>
                ))}
              </MapContainer>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search routes..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Route Details</h2>
            </div>
            <div className="divide-y">
              {routes.map((route) => (
                <div
                  key={route.id}
                  className={`p-4 cursor-pointer hover:bg-gray-50 ${
                    selectedRoute === route.id ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedRoute(route.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{route.name}</h3>
                    <StatusBadge status={route.status} />
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>{route.startPoint} → {route.endPoint}</p>
                    <div className="flex items-center gap-4">
                      <span>{route.distance}</span>
                      <span>•</span>
                      <span>{route.stops} stops</span>
                    </div>
                    {showOverlaps && route.overlap && (
                      <div className="mt-2">
                        <p className="text-xs font-medium text-orange-600">
                          Overlaps with: {route.overlap.join(', ')}
                        </p>
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

export default RouteManagement;