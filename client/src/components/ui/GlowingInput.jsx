import { useId, useState } from 'react';

export default function GlowingInput({ label, type = 'text', value, onChange, placeholder, color = 'cyan', className = '', required = false, ...props }) {
  const inputId = useId();
  const [isFocused, setIsFocused] = useState(false);
  const baseColor = color === 'cyan' ? '#00ffff' : '#ff00ff';

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-300 select-none">
          {label} {required && <span className="text-neon-magenta">*</span>}
        </label>
      )}
      <div 
        className="relative transition-all duration-300 rounded-lg"
        style={{
          boxShadow: isFocused ? `0 0 12px ${baseColor}40` : 'none'
        }}
      >
        <input
          id={inputId}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          required={required}
          className={`w-full bg-black/50 border backdrop-blur-md rounded-lg px-4 py-3 text-white placeholder-gray-500 transition-colors duration-300
            focus:outline-none
            ${isFocused ? (color === 'cyan' ? 'border-neon-cyan' : 'border-neon-magenta') : 'border-glass-border hover:border-gray-500'}
          `}
          {...props}
        />
      </div>
    </div>
  );
}
