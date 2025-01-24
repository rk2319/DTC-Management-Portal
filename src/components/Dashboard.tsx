import React, { useState } from 'react';
import { Activity, Bus, MapPin, AlertTriangle, Users, Clock, Calendar, Fuel, ThermometerSun, TrendingUp, BatteryCharging, Route as RouteIcon, AlertOctagon, Filter, Layers } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Circle, LayersControl, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon, divIcon } from 'leaflet';
import { AreaChart, BarChart, Card, Title, Text } from '@tremor/react';

const busIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  shadowSize: [41, 41]
});

const performanceData = [
  {
    date: '2024-03-01',
    'On-Time Performance': 92,
    'Passenger Count': 12500,
    'Fuel Efficiency': 85,
    'Revenue': 125000
  },
  {
    date: '2024-03-02',
    'On-Time Performance': 94,
    'Passenger Count': 13200,
    'Fuel Efficiency': 87,
    'Revenue': 132000
  },
  {
    date: '2024-03-03',
    'On-Time Performance': 91,
    'Passenger Count': 11800,
    'Fuel Efficiency': 84,
    'Revenue': 118000
  },
  {
    date: '2024-03-04',
    'On-Time Performance': 95,
    'Passenger Count': 14100,
    'Fuel Efficiency': 88,
    'Revenue': 141000
  },
  {
    date: '2024-03-05',
    'On-Time Performance': 93,
    'Passenger Count': 13500,
    'Fuel Efficiency': 86,
    'Revenue': 135000
  }
];

const routePerformance = [
  {
    route: 'Route 7A',
    passengers: 4500,
    performance: 95,
    revenue: 45000
  },
  {
    route: 'Route 12B',
    passengers: 3800,
    performance: 88,
    revenue: 38000
  },
  {
    route: 'Route 15C',
    passengers: 3200,
    performance: 92,
    revenue: 32000
  },
  {
    route: 'Route 8D',
    passengers: 4100,
    performance: 90,
    revenue: 41000
  }
];

const busLocations = [
  { id: 1, lat: 28.6139, lng: 77.2090, number: 'DL-01-BP-1234', route: 'Route 7A', speed: '45 km/h', nextStop: 'Connaught Place', load: '75%', driver: 'Rajesh Kumar', status: 'On Time' },
  { id: 2, lat: 28.6329, lng: 77.2195, number: 'DL-01-BP-5678', route: 'Route 12B', speed: '38 km/h', nextStop: 'Nehru Place', load: '60%', driver: 'Suresh Singh', status: 'Delayed (5 min)' },
  { id: 3, lat: 28.6508, lng: 77.2340, number: 'DL-01-BP-9012', route: 'Route 15C', speed: '42 km/h', nextStop: 'Lajpat Nagar', load: '85%', driver: 'Amit Patel', status: 'On Time' },
  { id: 4, lat: 28.6270, lng: 77.2110, number: 'DL-01-BP-3456', route: 'Route 8D', speed: '35 km/h', nextStop: 'Karol Bagh', load: '50%', driver: 'Vikram Singh', status: 'On Time' },
  { id: 5, lat: 28.6180, lng: 77.2280, number: 'DL-01-BP-7890', route: 'Route 5E', speed: '40 km/h', nextStop: 'INA Market', load: '70%', driver: 'Deepak Kumar', status: 'On Time' }
];

const recentIncidents = [
  {
    id: 1,
    type: 'Vehicle Breakdown',
    description: 'Engine malfunction on Route 7A',
    location: 'Near Connaught Place',
    time: '30 minutes ago',
    severity: 'high',
    status: 'Under Investigation',
    assignedTo: 'Maintenance Team A'
  },
  {
    id: 2,
    type: 'Traffic Delay',
    description: 'Heavy traffic affecting Route 12B',
    location: 'Nehru Place',
    time: '45 minutes ago',
    severity: 'medium',
    status: 'Monitoring',
    assignedTo: 'Traffic Control'
  },
  {
    id: 3,
    type: 'Technical Issue',
    description: 'GPS malfunction on Bus DL-01-BP-9012',
    location: 'Lajpat Nagar',
    time: '1 hour ago',
    severity: 'low',
    status: 'Resolved',
    assignedTo: 'Tech Support'
  }
];

const enhancedBusLocations = [
  { 
    id: 1, 
    lat: 28.6139, 
    lng: 77.2090, 
    number: 'DL-01-BP-1234', 
    route: 'Route 7A', 
    speed: '45 km/h', 
    nextStop: 'Connaught Place', 
    load: '75%', 
    driver: 'Rajesh Kumar', 
    status: 'On Time',
    lastUpdated: '2 mins ago',
    fuelLevel: '85%',
    temperature: '28°C',
    passengerCount: 42,
    nextStopETA: '5 mins',
    maintenanceStatus: 'Good',
    type: 'AC'
  }
];

const StatCard = ({ icon: Icon, label, value, trend, color = 'blue', subtext }: { 
  icon: React.ElementType;
  label: string;
  value: string;
  trend: string;
  color?: string;
  subtext?: string;
}) => (
  <div className="bg-white p-6 rounded-xl shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-semibold mt-1">{value}</p>
      </div>
      <div className={`p-3 bg-${color}-50 rounded-lg`}>
        <Icon className={`w-6 h-6 text-${color}-500`} />
      </div>
    </div>
    <p className="text-sm text-gray-600 mt-2">{trend}</p>
    {subtext && <p className="text-xs text-gray-500 mt-1">{subtext}</p>}
  </div>
);

const Dashboard = () => {
  const [selectedBus, setSelectedBus] = useState(null);
  const [mapView, setMapView] = useState('default');
  const [showCongestion, setShowCongestion] = useState(true);
  const [showStops, setShowStops] = useState(true);

  const congestionZones = [
    { center: [28.6139, 77.2090], radius: 500, severity: 'high' },
    { center: [28.6329, 77.2195], radius: 300, severity: 'medium' },
    { center: [28.6508, 77.2340], radius: 400, severity: 'low' },
  ];

  const busStops = [
    { id: 1, name: 'Connaught Place', lat: 28.6139, lng: 77.2090, routes: ['7A', '12B'] },
    { id: 2, name: 'Nehru Place', lat: 28.6329, lng: 77.2195, routes: ['12B', '15C'] },
    { id: 3, name: 'Lajpat Nagar', lat: 28.6508, lng: 77.2340, routes: ['15C', '8D'] },
  ];

  const getBusMarkerIcon = (status) => {
    const color = status.includes('Delayed') ? '#ef4444' : '#22c55e';
    return divIcon({
      className: 'custom-div-icon',
      html: `<div style="background-color: ${color}; width: 10px; height: 10px; border-radius: 50%; border: 2px solid white;"></div>`,
      iconSize: [10, 10],
      iconAnchor: [5, 5]
    });
  };

  const getCongestionColor = (severity) => {
    switch (severity) {
      case 'high': return { color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.2 };
      case 'medium': return { color: '#f59e0b', fillColor: '#f59e0b', fillOpacity: 0.2 };
      case 'low': return { color: '#22c55e', fillColor: '#22c55e', fillOpacity: 0.2 };
      default: return { color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.2 };
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Operations Dashboard</h1>
        <p className="text-gray-600">Real-time overview of your transit operations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={Bus}
          label="Active Vehicles"
          value="22/30"
          trend="↑ 2 more than yesterday"
          color="blue"
          subtext="73% fleet utilization"
        />
        <StatCard
          icon={Activity}
          label="On-Time Performance"
          value="94.2%"
          trend="↑ 3% from last month"
          color="green"
          subtext="Target: 95%"
        />
        <StatCard
          icon={Users}
          label="Total Passengers"
          value="12,458"
          trend="↑ 8% today"
          color="purple"
          subtext="Peak hours: 8-10 AM"
        />
        <StatCard
          icon={AlertTriangle}
          label="Active Incidents"
          value="3"
          trend="↓ 2 less than yesterday"
          color="red"
          subtext="1 high priority"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="flex items-center gap-2 text-blue-600 mb-2">
                <BatteryCharging className="w-5 h-5" />
                <h3 className="font-medium">Fleet Health</h3>
              </div>
              <p className="text-2xl font-bold">87%</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 h-2 bg-gray-200 rounded-full">
                  <div className="w-[87%] h-full bg-blue-600 rounded-full"></div>
                </div>
                <span className="text-sm text-gray-600">Target: 90%</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="flex items-center gap-2 text-green-600 mb-2">
                <RouteIcon className="w-5 h-5" />
                <h3 className="font-medium">Route Coverage</h3>
              </div>
              <p className="text-2xl font-bold">15/15</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 h-2 bg-gray-200 rounded-full">
                  <div className="w-full h-full bg-green-600 rounded-full"></div>
                </div>
                <span className="text-sm text-gray-600">100%</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="flex items-center gap-2 text-purple-600 mb-2">
                <TrendingUp className="w-5 h-5" />
                <h3 className="font-medium">Revenue Today</h3>
              </div>
              <p className="text-2xl font-bold">₹1.35L</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 h-2 bg-gray-200 rounded-full">
                  <div className="w-[85%] h-full bg-purple-600 rounded-full"></div>
                </div>
                <span className="text-sm text-gray-600">↑ 12%</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Live Fleet Status</h2>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setShowCongestion(!showCongestion)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
                    showCongestion ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-600'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  Traffic
                </button>
                <button 
                  onClick={() => setShowStops(!showStops)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
                    showStops ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-600'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  Stops
                </button>
                <div className="relative">
                  <Filter className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
            <div className="h-[500px] rounded-lg overflow-hidden">
              <MapContainer 
                center={[28.6139, 77.2090]} 
                zoom={13} 
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
              >
                <ZoomControl position="bottomright" />
                <LayersControl position="topright">
                  <LayersControl.BaseLayer checked name="Default">
                    <TileLayer
                      url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                      maxZoom={20}
                      subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                      attribution='&copy; Google Maps'
                    />
                  </LayersControl.BaseLayer>
                  <LayersControl.BaseLayer name="Satellite">
                    <TileLayer
                      url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                      maxZoom={20}
                      subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                      attribution='&copy; Google Maps'
                    />
                  </LayersControl.BaseLayer>
                </LayersControl>

                {showCongestion && congestionZones.map((zone, index) => (
                  <Circle
                    key={index}
                    center={zone.center}
                    radius={zone.radius}
                    pathOptions={getCongestionColor(zone.severity)}
                  />
                ))}

                {showStops && busStops.map((stop) => (
                  <Marker
                    key={stop.id}
                    position={[stop.lat, stop.lng]}
                    icon={busIcon}
                  >
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-semibold">{stop.name}</h3>
                        <p className="text-sm text-gray-600">Routes: {stop.routes.join(', ')}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}

                {busLocations.map((bus) => (
                  <Marker
                    key={bus.id}
                    position={[bus.lat, bus.lng]}
                    icon={getBusMarkerIcon(bus.status)}
                    eventHandlers={{
                      click: () => setSelectedBus(bus)
                    }}
                  >
                    <Popup>
                      <div className="p-3">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{bus.number}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            bus.status.includes('Delayed') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {bus.status}
                          </span>
                        </div>
                        <div className="space-y-2 text-sm">
                          <p className="text-gray-600">{bus.route}</p>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <p className="text-gray-500">Driver</p>
                              <p className="font-medium">{bus.driver}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Speed</p>
                              <p className="font-medium">{bus.speed}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Load</p>
                              <p className="font-medium">{bus.load}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Next Stop</p>
                              <p className="font-medium">{bus.nextStop}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
            {selectedBus && (
              <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Selected Vehicle Details</h3>
                  <button 
                    onClick={() => setSelectedBus(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Vehicle Number</p>
                    <p className="font-medium">{selectedBus.number}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Route</p>
                    <p className="font-medium">{selectedBus.route}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Driver</p>
                    <p className="font-medium">{selectedBus.driver}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className={`font-medium ${
                      selectedBus.status.includes('Delayed') ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {selectedBus.status}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <Title>Performance Trends</Title>
              <Text>Daily metrics for the past week</Text>
              <AreaChart
                className="h-72 mt-4"
                data={performanceData}
                index="date"
                categories={['On-Time Performance', 'Fuel Efficiency']}
                colors={['blue', 'green']}
                valueFormatter={(number: number) => `${number}%`}
              />
            </Card>

            <Card>
              <Title>Route Performance</Title>
              <Text>Top performing routes</Text>
              <BarChart
                className="h-72 mt-4"
                data={routePerformance}
                index="route"
                categories={['performance']}
                colors={['blue']}
                valueFormatter={(number: number) => `${number}%`}
              />
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span>Average Wait Time</span>
                </div>
                <span className="font-semibold">4.5 mins</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-green-500" />
                  <span>Routes Operating</span>
                </div>
                <span className="font-semibold">15/15</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Fuel className="w-5 h-5 text-orange-500" />
                  <span>Avg. Fuel Efficiency</span>
                </div>
                <span className="font-semibold">92%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ThermometerSun className="w-5 h-5 text-red-500" />
                  <span>Average Temperature</span>
                </div>
                <span className="font-semibold">28°C</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Recent Incidents</h2>
              <AlertOctagon className="w-5 h-5 text-red-500" />
            </div>
            <div className="space-y-4">
              {recentIncidents.map((incident) => (
                <div key={incident.id} className="p-4 border rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 bg-${incident.severity === 'high' ? 'red' : incident.severity === 'medium' ? 'yellow' : 'blue'}-50 rounded-lg`}>
                      <AlertTriangle className={`w-5 h-5 text-${incident.severity === 'high' ? 'red' : incident.severity === 'medium' ? 'yellow' : 'blue'}-500`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{incident.type}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {incident.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                        <MapPin className="w-4 h-4" />
                        <span>{incident.location}</span>
                        <span>•</span>
                        <span>{incident.time}</span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">
                          Assigned to: {incident.assignedTo}
                        </span>
                        <span className={`text-xs font-medium ${
                          incident.status === 'Resolved' ? 'text-green-600' :
                          incident.status === 'Under Investigation' ? 'text-red-600' :
                          'text-yellow-600'
                        }`}>
                          {incident.status}
                        </span>
                      </div>
                    </div>
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

export default Dashboard;