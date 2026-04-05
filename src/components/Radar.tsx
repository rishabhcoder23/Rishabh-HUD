import React from 'react';
import { motion } from 'motion/react';

export const Radar = () => {
  return (
    <div className="relative w-full h-full bg-black border border-hacker-green/20 overflow-hidden flex items-center justify-center glow-border">
      <div className="absolute top-4 left-4 z-10 font-mono text-[10px] text-hacker-green/60">
        RADAR_SWEEP: ACTIVE
      </div>
      
      {/* Radar Circles */}
      <div className="relative w-48 h-48 border border-hacker-green/20 rounded-full flex items-center justify-center">
        <div className="w-32 h-32 border border-hacker-green/20 rounded-full" />
        <div className="w-16 h-16 border border-hacker-green/20 rounded-full" />
        
        {/* Crosshair lines */}
        <div className="absolute w-full h-[1px] bg-hacker-green/20" />
        <div className="absolute h-full w-[1px] bg-hacker-green/20" />

        {/* Sweep */}
        <motion.div 
          className="absolute inset-0 rounded-full"
          style={{ 
            background: 'conic-gradient(from 0deg, transparent 0deg, rgba(0, 255, 65, 0.2) 90deg, transparent 90deg)'
          }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        />

        {/* Blips */}
        <Blip delay={0.5} x={20} y={-30} />
        <Blip delay={2.1} x={-40} y={10} />
        <Blip delay={3.5} x={10} y={40} isEnemy />
      </div>

      <div className="absolute bottom-4 right-4 z-10 text-right font-mono text-[8px] text-hacker-green/40">
        <span>RANGE: 500KM</span><br />
        <span>SWEEP_RATE: 15RPM</span>
      </div>
    </div>
  );
};

const Blip = ({ delay, x, y, isEnemy }: { delay: number, x: number, y: number, isEnemy?: boolean }) => {
  return (
    <motion.div 
      className={`absolute w-1.5 h-1.5 rounded-full ${isEnemy ? 'bg-hacker-red' : 'bg-hacker-green'}`}
      style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ 
        repeat: Infinity, 
        duration: 4, 
        delay,
        times: [0, 0.1, 0.5]
      }}
    />
  );
};
