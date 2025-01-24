export interface Vehicle {
  id: string;
  routeId: string;
  status: 'active' | 'inactive' | 'maintenance';
  location: {
    lat: number;
    lng: number;
  };
  currentSpeed: number;
  fuelLevel: number;
  driverName: string;
  lastUpdated: string;
}

export interface Route {
  id: string;
  name: string;
  startPoint: string;
  endPoint: string;
  status: 'active' | 'suspended' | 'planned';
  distance: number;
  estimatedDuration: number;
  stops: number;
  activeVehicles: number;
}