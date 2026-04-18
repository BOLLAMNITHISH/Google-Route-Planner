import NavigationSidebar from '../components/NavigationSidebar';

export default function AppLayout({ children }) {
  return (
    <div className="flex h-screen bg-[#050510] text-white overflow-hidden relative font-sans">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-neon-cyan focus:text-black focus:font-black focus:uppercase focus:tracking-widest focus:rounded-xl transition-all shadow-[0_0_20px_var(--color-neon-cyan)]">
        Skip to main content
      </a>
      <div className="absolute inset-0 bg-neon-mesh pointer-events-none -z-10" aria-hidden="true" />
      <NavigationSidebar />
      <main id="main-content" className="flex-1 overflow-y-auto p-4 md:p-8" tabIndex="-1">
        {children}
      </main>
    </div>
  );
}
