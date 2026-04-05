import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Stars, Float } from '@react-three/drei';
import * as THREE from 'three';

const GlobeContent = () => {
  const globeRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.002;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += 0.001;
    }
  });

  // Create a wireframe globe
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={globeRef}>
          <sphereGeometry args={[2.5, 64, 64]} />
          <meshPhongMaterial 
            color="#00ff41" 
            wireframe 
            transparent 
            opacity={0.3} 
            emissive="#00ff41"
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Inner core */}
        <mesh>
          <sphereGeometry args={[2.4, 32, 32]} />
          <meshPhongMaterial 
            color="#000000" 
            transparent 
            opacity={0.8} 
          />
        </mesh>

        {/* Atmosphere glow */}
        <mesh ref={atmosphereRef}>
          <sphereGeometry args={[2.8, 64, 64]} />
          <meshPhongMaterial 
            color="#00ff41" 
            transparent 
            opacity={0.05} 
            side={THREE.BackSide}
          />
        </mesh>

        {/* Data points */}
        {Array.from({ length: 20 }).map((_, i) => (
          <DataPoint key={i} />
        ))}
      </Float>

      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    </>
  );
};

const DataPoint = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const position = useMemo(() => {
    const phi = Math.acos(-1 + (2 * Math.random()));
    const theta = Math.random() * 2 * Math.PI;
    const r = 2.5;
    return new THREE.Vector3(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi)
    );
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + position.x) * 0.2;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color="#00f2ff" />
    </mesh>
  );
};

export const Globe = () => {
  return (
    <div className="w-full h-full bg-black/20 border border-hacker-green/20 relative overflow-hidden glow-border">
      <div className="absolute top-4 left-4 z-10 font-mono text-[10px] text-hacker-green/60 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-hacker-green animate-pulse" />
          <span>GLOBAL_NETWORK_STATUS: ACTIVE</span>
        </div>
        <span>NODES_CONNECTED: 14,291</span>
        <span>LATENCY: 42ms</span>
      </div>
      
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <GlobeContent />
      </Canvas>

      <div className="absolute bottom-4 right-4 z-10 font-mono text-[10px] text-hacker-green/40 text-right">
        <span>COORD: 37.7749° N, 122.4194° W</span><br />
        <span>ROTATION: 0.002 rad/s</span>
      </div>
    </div>
  );
};
