"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const SPHERES = [
  { label: "Motor", color: "#EC4899", position: [0, 1.2, 0] as [number, number, number] },
  { label: "Emotional", color: "#8B5CF6", position: [-1.2, -0.8, 0.3] as [number, number, number] },
  { label: "Cognitive", color: "#10B981", position: [1.2, -0.8, -0.3] as [number, number, number] },
];

function ConnectionLines() {
  const lineRef = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const points = [
      // Motor → Emotional
      new THREE.Vector3(...SPHERES[0].position),
      new THREE.Vector3(...SPHERES[1].position),
      // Emotional → Cognitive
      new THREE.Vector3(...SPHERES[1].position),
      new THREE.Vector3(...SPHERES[2].position),
      // Cognitive → Motor
      new THREE.Vector3(...SPHERES[2].position),
      new THREE.Vector3(...SPHERES[0].position),
    ];
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, []);

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color="#F9A8D4" transparent opacity={0.4} />
    </lineSegments>
  );
}

function SphereNode({ color, position }: { color: string; position: [number, number, number] }) {
  return (
    <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh position={position}>
        <icosahedronGeometry args={[0.45, 3]} />
        <meshStandardMaterial
          color={color}
          roughness={0.35}
          metalness={0.1}
          transparent
          opacity={0.85}
        />
      </mesh>
      {/* Glow ring */}
      <mesh position={position} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.6, 0.02, 8, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.25} />
      </mesh>
    </Float>
  );
}

function SceneContent() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.12;
    }
  });

  return (
    <group ref={groupRef}>
      {SPHERES.map((sphere) => (
        <SphereNode key={sphere.label} color={sphere.color} position={sphere.position} />
      ))}
      <ConnectionLines />
    </group>
  );
}

export default function ReflexesScene() {
  return (
    <div className="w-full h-full min-h-[400px]" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.7} color="#F9A8D4" />
        <pointLight position={[-3, -2, 4]} intensity={0.3} color="#8B5CF6" />
        <pointLight position={[3, -1, 3]} intensity={0.2} color="#10B981" />
        <SceneContent />
      </Canvas>
    </div>
  );
}
