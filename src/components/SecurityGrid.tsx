import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, ShieldCheck, User, Fingerprint, Scan } from 'lucide-react';

export const SecurityGrid = () => {
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-2 h-full">
      <CameraFeed id="CAM_01" location="NORTH_GATE" />
      <CameraFeed id="CAM_02" location="SERVER_ROOM_A" hasMotion />
      <BiometricScanner />
      <CameraFeed id="CAM_04" location="MAIN_LOBBY" isGlitching />
    </div>
  );
};

const CameraFeed = ({ id, location, hasMotion, isGlitching }: { id: string, location: string, hasMotion?: boolean, isGlitching?: boolean }) => {
  return (
    <div className="relative bg-black border border-hacker-green/20 overflow-hidden group glow-border">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        {isGlitching && (
          <motion.div 
            className="absolute inset-0 bg-hacker-green/10"
            animate={{ opacity: [0, 0.5, 0, 0.2, 0] }}
            transition={{ repeat: Infinity, duration: 0.2 }}
          />
        )}
      </div>
      
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
        <div className="flex items-center gap-2 bg-black/60 px-2 py-0.5 border border-hacker-green/20">
          <div className={`w-1.5 h-1.5 rounded-full ${isGlitching ? 'bg-hacker-red' : 'bg-hacker-green'} animate-pulse`} />
          <span className="text-[8px] font-bold">{id} // {location}</span>
        </div>
      </div>

      <div className="absolute bottom-2 right-2 z-10 text-[8px] text-hacker-green/40 font-mono">
        {new Date().toLocaleTimeString()}
      </div>

      {hasMotion && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div 
            className="border-2 border-hacker-red/50 w-24 h-24"
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.2, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <div className="absolute -top-6 left-0 bg-hacker-red text-white text-[6px] px-1 font-bold">
              MOTION_DETECTED
            </div>
          </motion.div>
        </div>
      )}

      {/* Static overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,118,0.06))] bg-[length:100%_2px,3px_100%]" />
    </div>
  );
};

const BiometricScanner = () => {
  const [status, setStatus] = useState<'SCANNING' | 'MATCH_FOUND'>('SCANNING');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setStatus('MATCH_FOUND');
          setTimeout(() => {
            setStatus('SCANNING');
            setProgress(0);
          }, 3000);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-black border border-hacker-green/20 overflow-hidden flex flex-col items-center justify-center p-4 glow-border">
      <div className="absolute top-2 left-2 flex items-center gap-2">
        <Fingerprint className="w-3 h-3 text-hacker-blue" />
        <span className="text-[8px] font-bold text-hacker-blue">BIOMETRIC_ANALYSIS</span>
      </div>

      <div className="relative w-20 h-20 border border-hacker-blue/20 flex items-center justify-center mb-4">
        <User className={`w-12 h-12 ${status === 'MATCH_FOUND' ? 'text-hacker-green' : 'text-hacker-blue/40'}`} />
        
        {status === 'SCANNING' && (
          <motion.div 
            className="absolute left-0 right-0 h-0.5 bg-hacker-blue shadow-[0_0_10px_rgba(0,242,255,0.8)]"
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          />
        )}

        <AnimatePresence>
          {status === 'MATCH_FOUND' && (
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute inset-0 bg-hacker-green/20 flex items-center justify-center"
            >
              <ShieldCheck className="w-10 h-10 text-hacker-green" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="w-full space-y-1">
        <div className="flex justify-between text-[8px] font-bold">
          <span className={status === 'MATCH_FOUND' ? 'text-hacker-green' : 'text-hacker-blue'}>{status}</span>
          <span>{Math.floor(progress)}%</span>
        </div>
        <div className="w-full h-1 bg-hacker-blue/10 overflow-hidden">
          <motion.div 
            className={`h-full ${status === 'MATCH_FOUND' ? 'bg-hacker-green' : 'bg-hacker-blue'}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {status === 'MATCH_FOUND' && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-2 text-[8px] text-hacker-green font-bold text-center"
        >
          SUBJECT: ANDERSON, THOMAS<br />
          CLEARANCE: LEVEL_7
        </motion.div>
      )}
    </div>
  );
};
