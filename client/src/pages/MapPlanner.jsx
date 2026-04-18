import { useState } from 'react';
import { motion } from 'framer-motion';
import GlassPanel from '../components/ui/GlassPanel';
import NeonButton from '../components/ui/NeonButton';
import GlowingInput from '../components/ui/GlowingInput';

export default function MapPlanner() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  return (
    <motion.div 
      className="h-full flex flex-col gap-4 relative pb-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <header className="flex justify-between items-end shrink-0">
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-neon-magenta to-neon-purple mb-2">
          Route Planner
        </h1>
      </header>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        <GlassPanel className="lg:w-1/3 flex flex-col gap-6 shrink-0 custom-scrollbar overflow-y-auto">
          <div className="space-y-6">
             <h2 className="text-sm font-bold tracking-widest text-gray-400 uppercase border-b border-glass-border pb-2">Waypoints</h2>
             
             <div className="space-y-4">
               <GlowingInput 
                  label="Origin" 
                  placeholder="Enter starting sector..." 
                  color="cyan"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
               />
               
               <div className="flex justify-center -my-2 relative z-10">
                 <div className="bg-black/80 rounded-full p-2 border border-glass-border">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                 </div>
               </div>

               <GlowingInput 
                  label="Destination" 
                  placeholder="Enter target coordinates..." 
                  color="magenta"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
               />
             </div>
          </div>

          <div className="mt-auto pt-4 space-y-4">
             <div className="flex justify-between text-xs text-gray-400 font-mono">
               <span>Mode: Anti-Grav</span>
               <span>Clearance: Level 4</span>
             </div>
             <NeonButton color="magenta" className="w-full text-sm">Calculate Optimal Path</NeonButton>
          </div>
        </GlassPanel>

        <GlassPanel className="flex-1 min-h-[500px] lg:min-h-0 relative p-0 overflow-hidden border-neon-magenta/30 flex items-center justify-center group">
             <div className="absolute inset-0 bg-gradient-to-br from-neon-magenta/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none" />
             <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=37.7749%2c-122.4194&zoom=13&size=1000x800&maptype=roadmap&style=feature:all|element:labels.text.fill|color:0xffffff&style=feature:all|element:labels.text.stroke|color:0x000000&style=feature:all|element:labels.icon|visibility:off&style=feature:landscape|element:geometry|color:0x000000&style=feature:poi|element:geometry|color:0x282828&style=feature:road|element:geometry.fill|color:0xff00ff&style=feature:road|element:geometry.stroke|color:0xff00ff&style=feature:water|element:geometry|color:0x050510')] bg-cover bg-center opacity-60 mix-blend-screen" />
             <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#050510] to-transparent pointer-events-none" />
             
             <div className="relative z-20 text-center border border-white/10 px-8 py-3 rounded-full backdrop-blur-xl bg-black/50 shadow-[0_0_20px_rgba(255,0,255,0.2)]">
                 <h2 className="text-sm font-bold tracking-widest text-neon-magenta uppercase animate-pulse">Awaiting Coordinates</h2>
             </div>
        </GlassPanel>
      </div>
    </motion.div>
  );
}
