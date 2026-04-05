import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Target, Crosshair, ShieldAlert } from 'lucide-react';

const SignalLine = () => {
  const [coords, setCoords] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const trigger = () => {
      setCoords({
        x1: Math.random() * 100,
        y1: Math.random() * 100,
        x2: Math.random() * 100,
        y2: Math.random() * 100,
      });
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 2000);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.7) trigger();
    }, 3000);

    trigger();
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.line
            x1={`${coords.x1}%`}
            y1={`${coords.y1}%`}
            x2={`${coords.x2}%`}
            y2={`${coords.y2}%`}
            stroke="#00f2ff"
            strokeWidth="1"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <motion.circle
            r="2"
            fill="#00f2ff"
            initial={{ cx: `${coords.x1}%`, cy: `${coords.y1}%`, opacity: 0 }}
            animate={{ cx: `${coords.x2}%`, cy: `${coords.y2}%`, opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </motion.g>
      )}
    </AnimatePresence>
  );
};

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
    // Pick a random target location on click
    const newTarget = {
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
    };
    setTargetPos(newTarget);
    setIsEnhancing(true);
    setZoom(10); // Significant zoom
    
    setTimeout(() => {
      setIsEnhancing(false);
      setZoom(1);
    }, 4000); // Slightly longer for dramatic effect
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
          x: isEnhancing ? `${(50 - targetPos.x) * 5}%` : 0,
          y: isEnhancing ? `${(50 - targetPos.y) * 5}%` : 0,
          filter: isEnhancing ? ['blur(4px)', 'blur(1px)', 'blur(0px)'] : 'blur(0px)'
        }}
        transition={{ 
          duration: isEnhancing ? 3 : 1, 
          ease: "easeInOut" 
        }}
      >
        <div className="w-[300%] h-[300%] border border-hacker-green/10 flex items-center justify-center relative">
          {/* Noise overlay during reconstruction */}
          {isEnhancing && (
            <motion.div 
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 3 }}
              className="absolute inset-0 z-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none"
            />
          )}
          
          {/* Detailed Grid for high zoom */}
          <div className="grid grid-cols-16 grid-rows-16 w-full h-full opacity-30">
            {Array.from({ length: 256 }).map((_, i) => (
              <div key={i} className="border-[0.2px] border-hacker-green/5 relative">
                {zoom > 5 && (
                  <span className="absolute top-0.5 left-0.5 text-[2px] text-hacker-green/10">
                    {Math.floor(i / 16)}:{i % 16}
                  </span>
                )}
              </div>
            ))}
          </div>
          
          {/* Simulated "Target" at high zoom */}
          {isEnhancing && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0.2, 0.8, 0.4] }}
              className="absolute w-4 h-4 border border-hacker-blue/40 bg-hacker-blue/10"
            />
          )}
        </div>
      </motion.div>

      {/* Signal Tracing Lines */}
      <svg className="absolute inset-0 z-10 pointer-events-none w-full h-full">
        <AnimatePresence>
          {Array.from({ length: 3 }).map((_, i) => (
            <SignalLine key={i} />
          ))}
        </AnimatePresence>
      </svg>

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
