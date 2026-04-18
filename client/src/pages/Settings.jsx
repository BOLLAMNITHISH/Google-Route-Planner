import { useState } from 'react';
import { motion } from 'framer-motion';
import GlassPanel from '../components/ui/GlassPanel';
import NeonButton from '../components/ui/NeonButton';
import GlowingInput from '../components/ui/GlowingInput';

export default function Settings() {
  const [pilotId, setPilotId] = useState('Pilot_01');
  const [theme, setTheme] = useState('Neon Space');

  return (
    <motion.div 
      className="max-w-4xl mx-auto space-y-8 pb-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <header>
        <motion.h1 className="text-3xl md:text-5xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-magenta mb-2">
          System Preferences
        </motion.h1>
      </header>

      <GlassPanel className="space-y-8">
        <section className="space-y-4 border-b border-glass-border pb-8">
            <h2 className="text-lg font-bold tracking-widest text-gray-300 uppercase">Pilot Registration</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <GlowingInput label="Callsign" value={pilotId} onChange={(e) => setPilotId(e.target.value)} color="purple" />
                <GlowingInput label="Clearance Code" type="password" placeholder="•••••••••" color="purple" />
            </div>
            <NeonButton color="purple" className="mt-4 text-sm text-white">Save Identification</NeonButton>
        </section>

        <section className="space-y-4 border-b border-glass-border pb-8">
            <h2 className="text-lg font-bold tracking-widest text-gray-300 uppercase">HUD Aesthetics</h2>
            <div className="flex flex-wrap gap-4">
                {['Neon Space', 'Cyberpunk', 'Void Black', 'High Contrast'].map(t => (
                    <button 
                       key={t}
                       onClick={() => setTheme(t)}
                       className={`px-4 py-2 rounded-lg border transition-all ${theme === t ? 'border-neon-cyan text-neon-cyan bg-neon-cyan/10 shadow-[0_0_10px_rgba(0,255,255,0.2)]' : 'border-glass-border text-gray-400 hover:border-gray-500'}`}
                    >
                       {t}
                    </button>
                ))}
            </div>
        </section>

        <section className="space-y-4">
            <h2 className="text-lg font-bold tracking-widest text-red-500 uppercase">Danger Zone</h2>
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex justify-between items-center">
                <div>
                    <h3 className="text-white font-bold tracking-wider">Purge All Telemetry Data</h3>
                    <p className="text-sm text-gray-400">Permanently erases all saved routes and analytics from local storage.</p>
                </div>
                <button className="px-6 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors uppercase font-bold tracking-wider text-sm">Purge</button>
            </div>
        </section>
      </GlassPanel>
    </motion.div>
  );
}
