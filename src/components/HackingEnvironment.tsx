import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal as TerminalIcon, Cpu, Shield, Globe, Zap, Code, Server, Wifi } from 'lucide-react';

const CODE_SNIPPETS = [
  "import socket\ns = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\ns.connect(('192.168.1.1', 80))",
  "def bypass_firewall(target_ip):\n    payload = b'\\x90' * 100 + shellcode\n    send_packet(target_ip, payload)",
  "SELECT * FROM users WHERE role='admin' AND password LIKE '%password%'",
  "nmap -sV -T4 -p- 10.0.0.1/24",
  "kubectl get pods --all-namespaces -o wide",
  "docker exec -it container_id /bin/bash",
  "ssh root@remote_host -p 2222",
  "curl -X POST -d '{\"cmd\": \"id\"}' http://vulnerable-site.com/api",
];

export const HackingEnvironment = () => {
  const [activeTab, setActiveTab] = useState<'CONSOLE' | 'NETWORK' | 'SCRIPTS'>('CONSOLE');
  const [logs, setLogs] = useState<string[]>([]);
  const [code, setCode] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const newLog = `[${new Date().toLocaleTimeString()}] TRACE: ${Math.random().toString(36).substring(7)} -> ${Math.random().toString(36).substring(7)}`;
      setLogs(prev => [...prev, newLog].slice(-15));
    }, 1000);

    const codeInterval = setInterval(() => {
      setCode(CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)]);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(codeInterval);
    };
  }, []);

  return (
    <div className="flex flex-col h-full bg-black/60 border border-hacker-green/30 glow-border overflow-hidden font-mono">
      {/* Tabs */}
      <div className="flex border-b border-hacker-green/20 bg-black/40">
        {(['CONSOLE', 'NETWORK', 'SCRIPTS'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-[10px] font-bold tracking-widest transition-colors ${activeTab === tab ? 'bg-hacker-green/20 text-hacker-green border-b-2 border-hacker-green' : 'text-hacker-green/40 hover:text-hacker-green/60'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {activeTab === 'CONSOLE' && (
            <motion.div
              key="console"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="h-full flex flex-col gap-2 text-[10px]"
            >
              <div className="flex items-center gap-2 text-hacker-green/60 mb-2">
                <TerminalIcon className="w-3 h-3" />
                <span>ROOT_SHELL@XENORISH:~$</span>
              </div>
              <div className="flex-1 space-y-1 overflow-y-auto scrollbar-hide">
                {logs.map((log, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="text-hacker-green/40">#</span>
                    <span className="text-hacker-green/80">{log}</span>
                  </div>
                ))}
                <motion.div
                  animate={{ opacity: [0, 1] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-1.5 h-3 bg-hacker-green"
                />
              </div>
            </motion.div>
          )}

          {activeTab === 'NETWORK' && (
            <motion.div
              key="network"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="h-full grid grid-cols-2 gap-4"
            >
              <div className="border border-hacker-green/10 p-2 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[8px] text-hacker-green/40">
                  <Wifi className="w-2 h-2" />
                  <span>PACKET_SNIFFER</span>
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="flex justify-between text-[8px]">
                      <span className="text-hacker-blue">TCP</span>
                      <span className="text-hacker-green/60">192.168.1.{i}</span>
                      <span className="text-hacker-red">DROP</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border border-hacker-green/10 p-2 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[8px] text-hacker-green/40">
                  <Server className="w-2 h-2" />
                  <span>PROXY_NODES</span>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-1">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="border border-hacker-green/20 p-1 flex items-center justify-center">
                      <div className={`w-1 h-1 rounded-full mr-1 ${Math.random() > 0.3 ? 'bg-hacker-green' : 'bg-hacker-red'}`} />
                      <span className="text-[6px]">NODE_{i}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'SCRIPTS' && (
            <motion.div
              key="scripts"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="h-full flex flex-col gap-2"
            >
              <div className="flex items-center gap-2 text-[8px] text-hacker-green/40">
                <Code className="w-2 h-2" />
                <span>ACTIVE_EXPLOIT.py</span>
              </div>
              <div className="flex-1 bg-black/40 p-2 border border-hacker-green/10 overflow-hidden">
                <pre className="text-[9px] text-hacker-green/80 whitespace-pre-wrap leading-tight">
                  {code}
                </pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Stats */}
        <div className="absolute bottom-2 right-2 flex gap-2">
          <div className="bg-hacker-green/10 border border-hacker-green/30 px-2 py-0.5 flex items-center gap-1">
            <Zap className="w-2 h-2 text-hacker-green" />
            <span className="text-[6px] font-bold">THREAT_LEVEL: HIGH</span>
          </div>
        </div>
      </div>

      {/* Footer Decrypt Bar */}
      <div className="h-1 bg-hacker-green/10 relative">
        <motion.div
          className="absolute inset-y-0 left-0 bg-hacker-green"
          animate={{ width: ['0%', '100%', '0%'] }}
          transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
        />
      </div>
    </div>
  );
};
