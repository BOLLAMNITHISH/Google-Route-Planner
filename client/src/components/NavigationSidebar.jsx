import { NavLink } from 'react-router-dom';
import { HomeIcon, MapIcon, ChartBarIcon, Cog8ToothIcon as CogIcon } from '@heroicons/react/24/outline';
import GlassPanel from './ui/GlassPanel';

const navItems = [
  { name: 'Dashboard', path: '/', icon: HomeIcon, color: 'cyan' },
  { name: 'Planner', path: '/planner', icon: MapIcon, color: 'magenta' },
  { name: 'Analytics', path: '/analytics', icon: ChartBarIcon, color: 'cyan' },
  { name: 'Settings', path: '/settings', icon: CogIcon, color: 'purple' },
];

export default function NavigationSidebar() {
  return (
    <GlassPanel as="nav" className="w-20 md:w-64 h-full flex flex-col justify-between py-6 rounded-none border-y-0 border-l-0 shadow-[4px_0_24px_rgba(0,0,0,0.5)] z-20 shrink-0">
      <div className="flex flex-col items-center md:items-start gap-8">
        <div className="px-4 text-center md:text-left w-full hidden md:block">
          <h1 className="text-3xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-magenta neon-text-cyan select-none">
            A-GRAV
          </h1>
        </div>
        <div className="flex flex-col gap-4 w-full px-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => `flex items-center justify-center md:justify-start gap-4 p-3 rounded-xl transition-all duration-300 w-full outline-none focus-visible:ring-2 focus-visible:ring-neon-${item.color} hover:bg-white/10 ${
                isActive ? `text-neon-${item.color} bg-white/5` : 'text-gray-400'
              }`}
              aria-label={item.name}
            >
              {({ isActive }) => (
                <>
                  <item.icon className={`h-6 w-6 ${isActive ? `drop-shadow-[0_0_8px_var(--color-neon-${item.color})]` : ''}`} />
                  <span className="hidden md:block font-medium tracking-wider uppercase text-sm mt-1">{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="px-4 hidden md:flex items-center gap-4">
        <div className="h-10 w-10 shrink-0 rounded-full border border-neon-purple shadow-[0_0_15px_var(--color-neon-purple)] bg-black/50 backdrop-blur-md" />
        <div className="flex flex-col">
            <span className="text-xs text-neon-purple font-mono uppercase tracking-widest neon-text-purple">Pilot_01</span>
            <span className="text-[10px] text-gray-500 uppercase">Online</span>
        </div>
      </div>
    </GlassPanel>
  );
}
