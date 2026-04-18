export default function GlassPanel({ children, className = '', as: Component = 'div', ...props }) {
  return (
    <Component
      className={`glass-panel p-6 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
