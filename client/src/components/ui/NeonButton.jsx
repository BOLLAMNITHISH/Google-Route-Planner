import { motion } from 'framer-motion';

export default function NeonButton({ children, onClick, color = 'cyan', className = '', type = 'button', disabled = false, ...props }) {
  const baseColor = color === 'cyan' ? '#00ffff' : color === 'magenta' ? '#ff00ff' : '#b026ff';
  const colorClass = color === 'cyan' ? 'text-neon-cyan border-neon-cyan' : color === 'magenta' ? 'text-neon-magenta border-neon-magenta' : 'text-neon-purple border-neon-purple';

  return (
    <motion.button
      type={type}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.05, boxShadow: `0 0 20px ${baseColor}, inset 0 0 10px ${baseColor}` } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={onClick}
      className={`relative px-6 py-2 border rounded-xl uppercase tracking-wider font-semibold transition-all duration-300 backdrop-blur-sm bg-black/40 
        ${colorClass} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-space-black focus:ring-[${baseColor}]
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-white/5'} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
