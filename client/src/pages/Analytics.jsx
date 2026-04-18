import { motion } from 'framer-motion';
import GlassPanel from '../components/ui/GlassPanel';

export default function Analytics() {
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
      <header>
        <motion.h1 variants={itemVariants} className="text-3xl md:text-5xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-magenta mb-2">
          Telemetry & Analytics
        </motion.h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div variants={itemVariants}>
           <GlassPanel className="flex flex-col gap-2 relative overflow-hidden group border-neon-cyan/50">
             <h3 className="text-sm text-gray-400 uppercase tracking-wider">Top Speed</h3>
             <p className="text-3xl font-mono font-bold text-neon-cyan neon-text-cyan">840 <span className="text-lg text-white/50">km/h</span></p>
           </GlassPanel>
        </motion.div>
        
        <motion.div variants={itemVariants}>
           <GlassPanel className="flex flex-col gap-2 relative overflow-hidden group">
             <h3 className="text-sm text-gray-400 uppercase tracking-wider">Alt. Variance</h3>
             <p className="text-3xl font-mono font-bold text-white">±2.4 <span className="text-lg text-white/50">km</span></p>
           </GlassPanel>
        </motion.div>

        <motion.div variants={itemVariants}>
           <GlassPanel className="flex flex-col gap-2 relative overflow-hidden group border-neon-magenta/50">
             <h3 className="text-sm text-gray-400 uppercase tracking-wider">G-Force Max</h3>
             <p className="text-3xl font-mono font-bold text-neon-magenta neon-text-magenta">3.2 <span className="text-lg text-white/50">G</span></p>
           </GlassPanel>
        </motion.div>

        <motion.div variants={itemVariants}>
           <GlassPanel className="flex flex-col gap-2 relative overflow-hidden group">
             <h3 className="text-sm text-gray-400 uppercase tracking-wider">Flight Hours</h3>
             <p className="text-3xl font-mono font-bold text-white">142 <span className="text-lg text-white/50">hrs</span></p>
           </GlassPanel>
        </motion.div>
      </div>

      <motion.div variants={itemVariants}>
        <GlassPanel className="h-[400px] flex flex-col items-center justify-center text-center p-8">
            <svg className="w-16 h-16 text-gray-500 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
            <h2 className="text-xl font-bold tracking-widest text-white/50 border border-white/10 px-6 py-2 rounded-full backdrop-blur-md">DATA LINK ESTABLISHING...</h2>
            <p className="text-gray-500 mt-4 text-sm max-w-sm">Detailed telemetry visualization module will be available once the primary sensor array is connected.</p>
        </GlassPanel>
      </motion.div>
    </motion.div>
  );
}
