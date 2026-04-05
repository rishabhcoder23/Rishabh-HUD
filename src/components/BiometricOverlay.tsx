import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dna, Activity, Fingerprint, Brain, ShieldCheck } from 'lucide-react';

export const BiometricOverlay = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [scanProgress, setScanProgress] = useState(0);
  const [dnaSequence, setDnaSequence] = useState('');
  const [status, setStatus] = useState<'ANALYZING' | 'MATCH_FOUND'>('ANALYZING');

  useEffect(() => {
    if (!isOpen) {
      setScanProgress(0);
      setStatus('ANALYZING');
      return;
    }

    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          setStatus('MATCH_FOUND');
          return 100;
        }
        return prev + 1;
      });

      // Generate random DNA sequence
      const bases = ['A', 'T', 'C', 'G'];
      setDnaSequence(prev => (prev + bases[Math.floor(Math.random() * 4)]).slice(-40));
    }, 50);

    return () => clearInterval(interval);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none"
        >
          {/* Background Dim */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Main Scanner UI */}
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="relative w-[800px] h-[500px] bg-black/80 border-2 border-hacker-blue/40 p-8 flex flex-col gap-6 pointer-events-auto glow-border"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-hacker-blue/20 pb-4">
              <div className="flex items-center gap-3">
                <Dna className="w-8 h-8 text-hacker-blue animate-pulse" />
                <div>
                  <h2 className="text-xl font-bold tracking-[0.3em] text-hacker-blue">GENETIC_SEQUENCER_v9.4</h2>
                  <p className="text-[10px] text-hacker-blue/60 uppercase">Deep Scan // Biometric Verification</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="text-hacker-blue/40 hover:text-hacker-blue transition-colors text-xs font-bold border border-hacker-blue/20 px-3 py-1"
              >
                TERMINATE_SCAN [ESC]
              </button>
            </div>

            <div className="flex-1 grid grid-cols-12 gap-6 overflow-hidden">
              {/* DNA Helix Animation */}
              <div className="col-span-4 border border-hacker-blue/20 relative flex items-center justify-center bg-black/40">
                <DnaHelix />
                <div className="absolute bottom-4 left-4 right-4 space-y-2">
                  <div className="flex justify-between text-[8px] font-bold text-hacker-blue/60">
                    <span>HELIX_STABILITY</span>
                    <span>99.9%</span>
                  </div>
                  <div className="w-full h-1 bg-hacker-blue/10">
                    <motion.div className="h-full bg-hacker-blue" animate={{ width: '99.9%' }} />
                  </div>
                </div>
              </div>

              {/* Data Readout */}
              <div className="col-span-5 flex flex-col gap-4">
                <div className="flex-1 border border-hacker-blue/20 p-4 font-mono text-[10px] space-y-2 overflow-hidden bg-black/40">
                  <div className="text-hacker-blue font-bold border-b border-hacker-blue/10 pb-1 mb-2">SEQUENCE_STREAM</div>
                  <div className="break-all text-hacker-blue/80 leading-relaxed">
                    {dnaSequence.split('').map((base, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={base === 'A' ? 'text-hacker-red' : base === 'T' ? 'text-hacker-green' : 'text-hacker-blue'}
                      >
                        {base}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div className="h-1/3 border border-hacker-blue/20 p-4 flex flex-col justify-between bg-black/40">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-hacker-red animate-pulse" />
                    <span className="text-[10px] font-bold text-hacker-red">NEURAL_ACTIVITY_MONITOR</span>
                  </div>
                  <div className="flex items-end gap-1 h-8">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1 bg-hacker-red/40"
                        animate={{ height: [10, 30, 15, 25, 10] }}
                        transition={{ repeat: Infinity, duration: 1, delay: i * 0.05 }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Subject Info */}
              <div className="col-span-3 flex flex-col gap-4">
                <div className="flex-1 border border-hacker-blue/20 p-4 flex flex-col items-center justify-center gap-4 bg-black/40">
                  <div className="relative w-24 h-24 border-2 border-hacker-blue/40 rounded-full flex items-center justify-center">
                    <Brain className={`w-12 h-12 ${status === 'MATCH_FOUND' ? 'text-hacker-green' : 'text-hacker-blue/40'}`} />
                    <motion.div
                      className="absolute inset-0 border-2 border-hacker-blue rounded-full border-t-transparent"
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] font-bold text-hacker-blue/60">SUBJECT_ID</div>
                    <div className="text-xs font-bold tracking-widest">
                      {status === 'MATCH_FOUND' ? 'ANDERSON_T' : 'SEARCHING...'}
                    </div>
                  </div>
                </div>

                <div className={`p-4 border-2 flex flex-col items-center gap-2 transition-colors ${status === 'MATCH_FOUND' ? 'border-hacker-green bg-hacker-green/10' : 'border-hacker-blue/20 bg-black/40'}`}>
                  {status === 'MATCH_FOUND' ? (
                    <>
                      <ShieldCheck className="w-8 h-8 text-hacker-green" />
                      <span className="text-xs font-black text-hacker-green tracking-[0.2em]">MATCH_CONFIRMED</span>
                    </>
                  ) : (
                    <>
                      <Fingerprint className="w-8 h-8 text-hacker-blue animate-pulse" />
                      <span className="text-xs font-black text-hacker-blue tracking-[0.2em]">SCANNING... {Math.floor(scanProgress)}%</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-[8px] text-hacker-blue/40 font-mono">
              <span>ENCRYPTION_KEY: 0x7F4A92B1C0E3</span>
              <span>HARDWARE_ACCELERATION: ENABLED</span>
              <span>LATENCY: 12ms</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const DnaHelix = () => {
  return (
    <svg width="120" height="300" viewBox="0 0 120 300">
      {Array.from({ length: 15 }).map((_, i) => {
        const y = i * 20 + 10;
        return (
          <g key={i}>
            {/* Connection line */}
            <motion.line
              x1="20"
              y1={y}
              x2="100"
              y2={y}
              stroke="#00f2ff"
              strokeWidth="1"
              strokeOpacity="0.2"
              animate={{
                x1: [20, 100, 20],
                x2: [100, 20, 100],
                strokeOpacity: [0.1, 0.4, 0.1]
              }}
              transition={{ repeat: Infinity, duration: 3, delay: i * 0.2 }}
            />
            {/* Left node */}
            <motion.circle
              r="4"
              fill="#00f2ff"
              animate={{
                cx: [20, 100, 20],
                scale: [1, 1.5, 1],
                fill: ["#00f2ff", "#ff003c", "#00f2ff"]
              }}
              transition={{ repeat: Infinity, duration: 3, delay: i * 0.2 }}
              cy={y}
            />
            {/* Right node */}
            <motion.circle
              r="4"
              fill="#00f2ff"
              animate={{
                cx: [100, 20, 100],
                scale: [1.5, 1, 1.5],
                fill: ["#00f2ff", "#00ff41", "#00f2ff"]
              }}
              transition={{ repeat: Infinity, duration: 3, delay: i * 0.2 }}
              cy={y}
            />
          </g>
        );
      })}
    </svg>
  );
};
