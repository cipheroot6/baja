"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Float,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";

const ORANGE = "#ff6b00";
const CYAN = "#00d4ff";
const NAVY = "#1a1a2e";
const NAVY_LIGHT = "#30305a";
const TIRE = "#0f0f17";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function Rod({
  from,
  to,
  radius = 0.05,
  color = NAVY_LIGHT,
}: {
  from: [number, number, number];
  to: [number, number, number];
  radius?: number;
  color?: string;
}) {
  const start = new THREE.Vector3(...from);
  const end = new THREE.Vector3(...to);
  const dir = end.clone().sub(start);
  const length = dir.length();
  const mid = start.clone().add(end).multiplyScalar(0.5);
  const quaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    dir.normalize(),
  );
  return (
    <mesh position={[mid.x, mid.y, mid.z]} quaternion={quaternion}>
      <cylinderGeometry args={[radius, radius, length, 8]} />
      <meshStandardMaterial color={color} metalness={0.5} roughness={0.35} />
    </mesh>
  );
}

function Hoop({
  points,
  radius = 0.05,
  color = ORANGE,
}: {
  points: [number, number, number][];
  radius?: number;
  color?: string;
}) {
  const curve = new THREE.CatmullRomCurve3(
    points.map((p) => new THREE.Vector3(...p)),
  );
  return (
    <mesh>
      <tubeGeometry args={[curve, 32, radius, 8, false]} />
      <meshStandardMaterial color={color} metalness={0.4} roughness={0.4} />
    </mesh>
  );
}

function Wheel({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.42, 0.42, 0.3, 20]} />
        <meshStandardMaterial color={TIRE} roughness={0.9} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.14, 0.14, 0.32, 16]} />
        <meshStandardMaterial color={CYAN} metalness={0.7} roughness={0.25} />
      </mesh>
    </group>
  );
}

function Headlight({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[0.18, 0.14, 0.06]} />
      <meshStandardMaterial
        color={CYAN}
        emissive={CYAN}
        emissiveIntensity={2.2}
      />
    </mesh>
  );
}

function ProceduralBuggy() {
  return (
    <group rotation={[0, Math.PI / 2, 0]}>
      <mesh position={[0, 0.62, 0]}>
        <boxGeometry args={[2.3, 0.28, 1.35]} />
        <meshStandardMaterial color={NAVY} metalness={0.25} roughness={0.55} />
      </mesh>
      <mesh position={[0.15, 0.78, 0.72]} rotation={[0.06, 0, 0]}>
        <boxGeometry args={[0.95, 0.42, 1.05]} />
        <meshStandardMaterial color={ORANGE} metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[-0.25, 0.86, -0.2]} rotation={[0, 0, 0.12]}>
        <boxGeometry args={[0.52, 0.16, 0.95]} />
        <meshStandardMaterial color={NAVY_LIGHT} roughness={0.7} />
      </mesh>
      <Hoop
        points={[
          [-1.0, 0.78, -0.55],
          [-1.0, 1.4, -0.38],
          [0, 1.5, -0.32],
          [1.0, 1.4, -0.38],
          [1.0, 0.78, -0.55],
        ]}
        color={ORANGE}
      />
      <Hoop
        points={[
          [-0.85, 0.82, 0.28],
          [-0.85, 1.18, 0.3],
          [0, 1.28, 0.3],
          [0.85, 1.18, 0.3],
          [0.85, 0.82, 0.28],
        ]}
        radius={0.04}
        color={CYAN}
      />
      <Headlight position={[-0.32, 0.86, 1.24]} />
      <Headlight position={[0.32, 0.86, 1.24]} />
      <Wheel position={[-1.05, 0.42, 0.9]} />
      <Wheel position={[1.05, 0.42, 0.9]} />
      <Wheel position={[-1.05, 0.42, -0.9]} />
      <Wheel position={[1.05, 0.42, -0.9]} />
      <Rod from={[-0.62, 0.58, 0.55]} to={[-1.05, 0.46, 0.9]} />
      <Rod from={[0.62, 0.58, 0.55]} to={[1.05, 0.46, 0.9]} />
      <Rod from={[-0.62, 0.58, -0.55]} to={[-1.05, 0.46, -0.9]} />
      <Rod from={[0.62, 0.58, -0.55]} to={[1.05, 0.46, -0.9]} />
    </group>
  );
}

function GltfBuggy({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

function Buggy({ modelUrl }: { modelUrl?: string | null }) {
  if (modelUrl) return <GltfBuggy url={modelUrl} />;
  return <ProceduralBuggy />;
}

function RotatingGroup({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const reduced = usePrefersReducedMotion();
  useFrame((_, delta) => {
    if (ref.current && !reduced) ref.current.rotation.y += delta * 0.3;
  });
  return <group ref={ref}>{children}</group>;
}

export default function Vehicle3D({ modelUrl }: { modelUrl?: string | null }) {
  return (
    <Canvas
      camera={{ position: [4.4, 2.7, 5.2], fov: 40 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      aria-label="3D model of the Team Abhyuday Racing buggy"
      role="img"
    >
      <ambientLight intensity={0.75} />
      <directionalLight position={[5, 6, 4]} intensity={1.6} />
      <directionalLight position={[-4, 2, -3]} intensity={0.5} color={CYAN} />
      <RotatingGroup>
        <Float speed={2} rotationIntensity={0.12} floatIntensity={0.45}>
          <Buggy modelUrl={modelUrl} />
        </Float>
      </RotatingGroup>
      <ContactShadows
        position={[0, -1.05, 0]}
        opacity={0.35}
        scale={7}
        blur={2.6}
        far={2.5}
        color="#000000"
      />
    </Canvas>
  );
}