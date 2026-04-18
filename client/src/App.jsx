import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';

// Code Splitting Strategy:
// Dynamically importing route components so Webpack/Vite creates separate JS chunks
// rather than delivering one massive block of code on initial load.
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const MapPlanner = React.lazy(() => import('./pages/MapPlanner'));
const Analytics = React.lazy(() => import('./pages/Analytics'));
const Settings = React.lazy(() => import('./pages/Settings'));

// Futuristic Suspense Fallback
const LoadingFallback = () => (
  <div className="flex h-full w-full items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 rounded-full border-2 border-neon-cyan border-t-transparent animate-spin shadow-[0_0_15px_var(--color-neon-cyan)]" />
      <span className="font-mono text-neon-cyan text-sm uppercase tracking-widest animate-pulse">Establishing Uplink...</span>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/planner" element={<MapPlanner />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
