import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import FleetManagement from './components/FleetManagement';
import RouteManagement from './components/RouteManagement';
import Scheduling from './components/Scheduling';
import Analytics from './components/Analytics';
import Login from './components/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'fleet' | 'routes' | 'scheduling' | 'analytics'>('dashboard');

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'fleet':
        return <FleetManagement />;
      case 'routes':
        return <RouteManagement />;
      case 'scheduling':
        return <Scheduling />;
      case 'analytics':
        return <Analytics />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar onNavigate={(view) => setCurrentView(view)} currentView={currentView} />
      <div className="ml-64">
        <Header onLogout={() => setIsAuthenticated(false)} />
        <main className="pt-16">
          {renderView()}
        </main>
      </div>
    </div>
  );
}

export default App;