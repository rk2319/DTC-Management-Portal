import React from 'react';
import { 
  Bus, 
  LayoutDashboard, 
  Map, 
  Calendar, 
  Settings, 
  BarChart3, 
  AlertCircle 
} from 'lucide-react';

interface SidebarProps {
  currentView: 'dashboard' | 'fleet' | 'routes' | 'scheduling' | 'analytics';
  onNavigate: (view: 'dashboard' | 'fleet' | 'routes' | 'scheduling' | 'analytics') => void;
}

const Sidebar = ({ currentView, onNavigate }: SidebarProps) => {
  const navItems = [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', view: 'dashboard' as const },
    { icon: <Bus className="w-5 h-5" />, label: 'Fleet Management', view: 'fleet' as const },
    { icon: <Map className="w-5 h-5" />, label: 'Routes', view: 'routes' as const },
    { icon: <Calendar className="w-5 h-5" />, label: 'Scheduling', view: 'scheduling' as const },
    { icon: <BarChart3 className="w-5 h-5" />, label: 'Analytics', view: 'analytics' as const },
    { icon: <AlertCircle className="w-5 h-5" />, label: 'Incidents' },
    { icon: <Settings className="w-5 h-5" />, label: 'Settings' }
  ];

  return (
    <div className="w-64 h-screen bg-slate-800 text-white p-4 fixed left-0 top-0">
      <div className="flex items-center gap-2 mb-8">
        <Bus className="w-8 h-8" />
        <div>
          <h1 className="text-xl font-bold">DTC Portal</h1>
          <p className="text-xs text-gray-400">Management System</p>
        </div>
      </div>
      
      <nav className="space-y-2">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => item.view && onNavigate(item.view)}
            className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg transition-colors ${
              currentView === item.view
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-slate-700'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;