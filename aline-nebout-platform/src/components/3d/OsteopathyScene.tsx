"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

function OrganicShape() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={2.2}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color="#EC4899"
          roughness={0.3}
          metalness={0.1}
          distort={0.4}
          speed={2}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  );
}

function AccentSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 1.5 + 2;
      meshRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.4) * 0.8 - 0.5;
    }
  });

  return (
    <mesh ref={meshRef} scale={0.6}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#8B5CF6" transparent opacity={0.5} roughness={0.5} />
    </mesh>
  );
}

export default function OsteopathyScene() {
  return (
    <div className="w-full h-full min-h-[400px]" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#F9A8D4" />
        <pointLight position={[-3, -2, 4]} intensity={0.4} color="#8B5CF6" />
        <OrganicShape />
        <AccentSphere />
      </Canvas>
    </div>
  );
}
