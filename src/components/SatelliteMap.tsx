import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Target, Crosshair, ShieldAlert } from 'lucide-react';

export const SatelliteMap = () => {
  const [zoom, setZoom] = useState(1);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [targetPos, setTargetPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isEnhancing) {
        setTargetPos({
          x: 30 + Math.random() * 40,
          y: 30 + Math.random() * 40,
        });
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isEnhancing]);

  const handleEnhance = () => {
    setIsEnhancing(true);
    setZoom(4);
    setTimeout(() => {
      setIsEnhancing(false);
      setZoom(1);
    }, 3000);
  };

  return (
    <div className="relative w-full h-full bg-black border border-hacker-green/20 overflow-hidden glow-border group">
      {/* Map Background (Simulated with grid and noise) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-50" />
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0, 255, 65, 0.15) 1px, transparent 0)',
          backgroundSize: '20px 20px'
        }} />
      </div>

      {/* Zooming Content */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        animate={{ 
          scale: zoom,
          x: isEnhancing ? `${(50 - targetPos.x) * 2}%` : 0,
          y: isEnhancing ? `${(50 - targetPos.y) * 2}%` : 0,
        }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      >
        <div className="w-[200%] h-[200%] border border-hacker-green/10 flex items-center justify-center">
          <div className="grid grid-cols-8 grid-rows-8 w-full h-full opacity-30">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="border-[0.5px] border-hacker-green/10 relative">
                <span className="absolute top-1 left-1 text-[6px] text-hacker-green/20">
                  {Math.floor(i / 8)}:{i % 8}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Target Reticle */}
      <motion.div 
        className="absolute z-20 pointer-events-none"
        animate={{ 
          left: `${targetPos.x}%`,
          top: `${targetPos.y}%`,
        }}
        transition={{ duration: 1 }}
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2">
          <Crosshair className="w-8 h-8 text-hacker-blue animate-pulse" />
          <motion.div 
            className="absolute -inset-4 border border-hacker-blue/40 rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.1, 0.4] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </div>
      </motion.div>

      {/* UI Overlays */}
      <div className="absolute top-4 left-4 z-30 flex flex-col gap-2">
        <div className="bg-black/80 border border-hacker-green/30 px-3 py-1 flex items-center gap-2">
          <Target className="w-3 h-3 text-hacker-green" />
          <span className="text-[10px] font-bold tracking-tighter">SATELLITE_LINK: KH-11_KENNAN</span>
        </div>
        <div className="bg-black/80 border border-hacker-green/30 px-3 py-1 flex flex-col gap-1">
          <div className="flex justify-between gap-4">
            <span className="text-[8px] text-hacker-green/60 uppercase">Resolution</span>
            <span className="text-[8px] text-hacker-blue font-bold">{isEnhancing ? '0.1m' : '1.5m'}</span>
          </div>
          <div className="w-24 h-1 bg-hacker-green/10 overflow-hidden">
            <motion.div 
              className="h-full bg-hacker-green"
              animate={{ width: isEnhancing ? '100%' : '30%' }}
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 z-30">
        <button 
          onClick={handleEnhance}
          disabled={isEnhancing}
          className="bg-hacker-green/10 hover:bg-hacker-green/20 border border-hacker-green/40 px-4 py-2 text-[10px] font-bold flex items-center gap-2 transition-colors disabled:opacity-50"
        >
          <Search className="w-3 h-3" />
          {isEnhancing ? 'ENHANCING...' : 'ENHANCE_IMAGE'}
        </button>
      </div>

      <AnimatePresence>
        {isEnhancing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none"
          >
            <div className="bg-hacker-blue/10 border border-hacker-blue/50 p-4 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 border-2 border-hacker-blue border-t-transparent rounded-full animate-spin" />
                <span className="text-hacker-blue text-xs font-bold tracking-widest animate-pulse">RECONSTRUCTING_PIXELS...</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-4 right-4 z-30 text-right font-mono text-[8px] text-hacker-green/40">
        <span>ALT: 422.1 KM</span><br />
        <span>VEL: 7.67 KM/S</span><br />
        <span>FOV: 0.02°</span>
      </div>
    </div>
  );
};
