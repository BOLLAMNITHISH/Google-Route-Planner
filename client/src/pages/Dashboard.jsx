import { motion } from 'framer-motion';
import { useEffect } from 'react';
import GlassPanel from '../components/ui/GlassPanel';
import NeonButton from '../components/ui/NeonButton';

export default function Dashboard() {
  useEffect(() => {
    window.renderMap = () => {
      if (!window.google) return;
      
      const center = { lat: 17.3850, lng: 78.4867 };
      const map = new window.google.maps.Map(document.getElementById("map"), {
        zoom: 6,
        center: center,
        styles: [
          { elementType: "geometry", stylers: [{ color: "#050816" }] },
          { elementType: "labels.text.stroke", stylers: [{ color: "#050816" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#00ffff" }] }
        ]
      });

      const locations = [
        { lat: 17.3850, lng: 78.4867 }, // Hyderabad
        { lat: 16.5062, lng: 80.6480 }, // Vijayawada
        { lat: 13.0827, lng: 80.2707 }  // Chennai
      ];

      locations.forEach(loc => {
        new window.google.maps.Marker({
          position: loc,
          map: map
        });
      });

      const routePath = new window.google.maps.Polyline({
        path: locations,
        geodesic: true,
        strokeColor: "#00ffff",
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });

      routePath.setMap(map);
    };

    if (window.mapReady || window.google) {
      window.renderMap();
    }
    
    return () => {
      window.renderMap = null;
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="max-w-7xl mx-auto space-y-8 pb-10"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <motion.h1 variants={itemVariants} className="text-3xl md:text-5xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-2">
            Welcome Back
          </motion.h1>
          <motion.p variants={itemVariants} className="text-neon-cyan font-mono text-sm md:text-base neon-text-cyan flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-neon-cyan shadow-[0_0_10px_var(--color-neon-cyan)] block animate-pulse" /> 
            Systems online. Telemetry optimal.
          </motion.p>
        </div>
        <motion.div variants={itemVariants}>
          <NeonButton color="magenta" className="text-sm">Initiate Route</NeonButton>
        </motion.div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariants}>
          <GlassPanel className="flex flex-col gap-2 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <h3 className="text-sm text-gray-400 uppercase tracking-wider">Total Est. Distance</h3>
            <p className="text-3xl font-mono font-bold text-neon-cyan neon-text-cyan">14,204.5 <span className="text-lg text-white/50">km</span></p>
          </GlassPanel>
        </motion.div>
        <motion.div variants={itemVariants}>
          <GlassPanel className="flex flex-col gap-2 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-neon-magenta/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <h3 className="text-sm text-gray-400 uppercase tracking-wider">Active Routes</h3>
            <p className="text-3xl font-mono font-bold text-neon-magenta neon-text-magenta">03</p>
          </GlassPanel>
        </motion.div>
        <motion.div variants={itemVariants} className="sm:hidden lg:block">
          <GlassPanel className="flex flex-col gap-2 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <h3 className="text-sm text-gray-400 uppercase tracking-wider">Energy Efficiency</h3>
            <p className="text-3xl font-mono font-bold text-white">94.2 <span className="text-lg text-white/50">%</span></p>
          </GlassPanel>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassPanel className="lg:col-span-2 h-[400px] flex items-center justify-center relative overflow-hidden p-0 border-neon-cyan/30">
            <div id="map" style={{ width: '100%', height: '100%', borderRadius: '15px' }}></div>
        </GlassPanel>
        
        <GlassPanel className="h-[400px] flex flex-col gap-4">
          <h2 className="text-sm uppercase font-bold tracking-widest text-gray-400 border-b border-glass-border pb-4">Recent Transits</h2>
          <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
             {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="p-4 rounded-xl bg-black/40 border border-white/5 hover:border-neon-cyan/50 hover:bg-white/5 transition-all cursor-pointer group flex justify-between items-center">
                   <div>
                       <p className="font-mono text-sm font-semibold text-neon-cyan group-hover:neon-text-cyan transition-all uppercase">Route Alpha-{i}</p>
                       <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Sector {i} → Neo-City</p>
                   </div>
                   <div className="hidden group-hover:block">
                     <span className="text-neon-cyan">→</span>
                   </div>
                </div>
             ))}
          </div>
        </GlassPanel>
      </motion.div>
    </motion.div>
  );
}
