import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const LOG_MESSAGES = [
  "INITIALIZING XENORISH KERNEL...",
  "LOADING CORE MODULES: [OK]",
  "ESTABLISHING SECURE TUNNEL: [OK]",
  "BYPASSING FIREWALL: ATTEMPT 1...",
  "BYPASSING FIREWALL: ATTEMPT 2...",
  "FIREWALL BREACHED. ACCESS GRANTED.",
  "DECRYPTING PACKETS: 128-BIT AES",
  "TRACE DETECTED. REDIRECTING...",
  "PROXY CHAIN ESTABLISHED: [7 NODES]",
  "DUMPING DATABASE: 'GLOBAL_INTEL'",
  "EXTRACTING SATELLITE COORDINATES...",
  "SCANNING BIOMETRIC SIGNATURES...",
  "UPLOADING VIRUS PAYLOAD...",
  "SYSTEM STATUS: COMPROMISED",
  "WAITING FOR COMMAND...",
];

export const Terminal = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setLogs(prev => [...prev, LOG_MESSAGES[index % LOG_MESSAGES.length]].slice(-20));
      index++;
    }, 800);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="flex flex-col h-full bg-black/40 border border-hacker-green/20 p-4 font-mono text-xs overflow-hidden glow-border">
      <div className="flex items-center justify-between mb-2 border-b border-hacker-green/20 pb-1">
        <span className="text-hacker-green/60 uppercase tracking-widest font-bold">System_Logs.log</span>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-hacker-green/40" />
          <div className="w-2 h-2 rounded-full bg-hacker-green/20" />
        </div>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-1 scrollbar-hide">
        <AnimatePresence mode="popLayout">
          {logs.map((log, i) => (
            <motion.div
              key={`${log}-${i}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-2"
            >
              <span className="text-hacker-green/40">[{new Date().toLocaleTimeString()}]</span>
              <span className={log.includes('BREACHED') || log.includes('COMPROMISED') ? 'text-hacker-red' : 'text-hacker-green'}>
                {log}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
        <motion.div
          animate={{ opacity: [0, 1] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-2 h-4 bg-hacker-green align-middle ml-1"
        />
      </div>
    </div>
  );
};
