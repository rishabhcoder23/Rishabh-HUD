import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, ShieldAlert, Terminal as TerminalIcon, Cpu, Activity, Database, Lock, Unlock } from 'lucide-react';
import { Terminal } from './components/Terminal';
import { Globe } from './components/Globe';
import { SatelliteMap } from './components/SatelliteMap';
import { SecurityGrid } from './components/SecurityGrid';
import { NetworkGraph } from './components/NetworkGraph';
import { Radar } from './components/Radar';

export default function App() {
  const [isAlert, setIsAlert] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const triggerAlert = () => {
    setIsAlert(true);
    setTimeout(() => setIsAlert(false), 5000);
  };

  const toggleAccess = () => {
    setAccessGranted(!accessGranted);
  };

  return (
    <div className={`relative min-h-screen w-full bg-hacker-dark overflow-hidden selection:bg-hacker-green selection:text-hacker-dark ${isAlert ? 'animate-pulse' : ''}`}>
      {/* CRT Scanline Overlay */}
      <div className="crt-overlay" />
      <div className="scanline" />

      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ 
        backgroundImage: 'linear-gradient(#00ff41 1px, transparent 1px), linear-gradient(90deg, #00ff41 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      {/* Header */}
      <header className="relative z-20 h-14 border-b border-hacker-green/30 bg-black/80 backdrop-blur-md flex items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-hacker-green" />
            <h1 className="text-lg font-bold tracking-[0.2em] glow-text">NEURAL_LINK // OS v4.0.2</h1>
          </div>
          <div className="h-4 w-[1px] bg-hacker-green/20" />
          <div className="flex gap-4 text-[10px] font-bold text-hacker-green/60">
            <span className="flex items-center gap-1"><Activity className="w-3 h-3" /> CPU: 42%</span>
            <span className="flex items-center gap-1"><Database className="w-3 h-3" /> MEM: 12.4GB</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-xs font-bold tracking-widest">{currentTime.toLocaleTimeString()}</div>
            <div className="text-[8px] text-hacker-green/40">{currentTime.toLocaleDateString()}</div>
          </div>
          <button 
            onClick={toggleAccess}
            className={`px-4 py-1.5 border ${accessGranted ? 'border-hacker-green text-hacker-green' : 'border-hacker-red text-hacker-red'} text-[10px] font-bold flex items-center gap-2 transition-colors`}
          >
            {accessGranted ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
            {accessGranted ? 'ACCESS_GRANTED' : 'ACCESS_RESTRICTED'}
          </button>
        </div>
      </header>

      {/* Main Dashboard Layout */}
      <main className="relative z-10 p-4 h-[calc(100vh-3.5rem)] grid grid-cols-12 grid-rows-6 gap-4">
        
        {/* Left Column: Terminal & Network */}
        <div className="col-span-3 row-span-6 flex flex-col gap-4">
          <div className="flex-1">
            <Terminal />
          </div>
          <div className="h-1/3">
            <NetworkGraph />
          </div>
        </div>

        {/* Center Column: Globe & Satellite */}
        <div className="col-span-6 row-span-6 flex flex-col gap-4">
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div className="col-span-2 row-span-2">
              <Globe />
            </div>
          </div>
          <div className="h-2/5 grid grid-cols-2 gap-4">
            <SatelliteMap />
            <Radar />
          </div>
        </div>

        {/* Right Column: Security & Controls */}
        <div className="col-span-3 row-span-6 flex flex-col gap-4">
          <div className="flex-1">
            <SecurityGrid />
          </div>
          
          {/* Controls / Alerts */}
          <div className="bg-black/40 border border-hacker-green/20 p-4 glow-border space-y-4">
            <div className="flex items-center justify-between border-b border-hacker-green/20 pb-2">
              <span className="text-xs font-bold tracking-widest">SYSTEM_CONTROLS</span>
              <TerminalIcon className="w-4 h-4 text-hacker-green/60" />
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={triggerAlert}
                className="bg-hacker-red/10 hover:bg-hacker-red/20 border border-hacker-red/40 p-2 text-[10px] font-bold text-hacker-red flex flex-col items-center gap-1 transition-colors"
              >
                <AlertTriangle className="w-4 h-4" />
                TRIGGER_ALERT
              </button>
              <button className="bg-hacker-blue/10 hover:bg-hacker-blue/20 border border-hacker-blue/40 p-2 text-[10px] font-bold text-hacker-blue flex flex-col items-center gap-1 transition-colors">
                <ShieldAlert className="w-4 h-4" />
                ENCRYPT_CORE
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-[8px] font-bold">
                <span>DECRYPTION_PROGRESS</span>
                <span>84%</span>
              </div>
              <div className="w-full h-1.5 bg-hacker-green/10 overflow-hidden">
                <motion.div 
                  className="h-full bg-hacker-green"
                  animate={{ width: '84%' }}
                  transition={{ duration: 2 }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Alert Overlay */}
      <AnimatePresence>
        {isAlert && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-hacker-red/20 animate-pulse" />
            <motion.div 
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="relative bg-hacker-red text-white px-12 py-6 border-4 border-white shadow-[0_0_50px_rgba(255,0,60,0.8)]"
            >
              <div className="flex flex-col items-center gap-4">
                <AlertTriangle className="w-16 h-16 animate-bounce" />
                <div className="text-4xl font-black tracking-[0.3em]">SYSTEM_ALERT</div>
                <div className="text-xl font-bold tracking-widest">UNAUTHORIZED_ACCESS_DETECTED</div>
                <div className="text-sm font-mono mt-4">IP_TRACE: 192.168.1.104 // PORT: 8080</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Status Bar */}
      <footer className="fixed bottom-0 left-0 right-0 h-6 bg-hacker-green text-hacker-dark flex items-center justify-between px-4 text-[10px] font-bold z-30">
        <div className="flex gap-4">
          <span>STATUS: OPERATIONAL</span>
          <span>ENCRYPTION: AES-256</span>
          <span>UPTIME: 142:12:04</span>
        </div>
        <div className="flex gap-4">
          <span>USER: ROOT@NEURAL_LINK</span>
          <span>REGION: ASIA_PACIFIC</span>
        </div>
      </footer>
    </div>
  );
}
