"use client";

import React, { useRef, useState, useEffect, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Float,
  useGLTF,
  Sparkles,
  OrbitControls,
} from "@react-three/drei";
import * as THREE from "three";

/* ────────────────────────────────────────────────────────────
   Colour palette — matches real A10 livery
──────────────────────────────────────────────────────────── */
const COL = {
  ORANGE:      "#ff6b00",
  ORANGE_DARK: "#cc4400",
  CYAN:        "#00d4ff",
  PURPLE:      "#7c3aed",
  NAVY:        "#1a1a2e",
  STEEL:       "#686888",   // visible mid-grey steel
  STEEL_DARK:  "#3e3e5c",   // darker steel (still visible)
  TIRE:        "#1f1f2a",   // dark tire — slightly lifted so it reads
  TIRE_SIDE:   "#282835",
  RIM:         "#d8e2f5",
  RIM_DARK:    "#8a94b0",
  SHOCK_RED:   "#e62222",
  SHOCK_BODY:  "#b0b5cc",   // silver shock body
  CAGE_MAIN:   "#64648c",   // visible steel-grey tubes
  CAGE_ACC:    "#ff6b00",   // orange accent tubes
};

/* ────────────────────────────────────────────────────────────
   Reduced-motion hook
──────────────────────────────────────────────────────────── */
function useReducedMotion() {
  const [v, setV] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setV(mq.matches);
    const cb = (e: MediaQueryListEvent) => setV(e.matches);
    mq.addEventListener("change", cb);
    return () => mq.removeEventListener("change", cb);
  }, []);
  return v;
}

/* ────────────────────────────────────────────────────────────
   Rod  – straight cylinder between two 3-D points
──────────────────────────────────────────────────────────── */
function Rod({
  a, b, r = 0.028, color = COL.CAGE_MAIN, metalness = 0.6, roughness = 0.35,
}: {
  a: [number,number,number]; b: [number,number,number];
  r?: number; color?: string; metalness?: number; roughness?: number;
}) {
  const { pos, quat, len } = useMemo(() => {
    const va  = new THREE.Vector3(...a);
    const vb  = new THREE.Vector3(...b);
    const dir = vb.clone().sub(va);
    const len = dir.length();
    const mid = va.clone().add(vb).multiplyScalar(0.5);
    const quat = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0), dir.normalize()
    );
    return { pos: mid, quat, len };
  }, [a, b]);

  return (
    <mesh position={pos} quaternion={quat} castShadow>
      <cylinderGeometry args={[r, r, len, 8]} />
      <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
    </mesh>
  );
}

/* ────────────────────────────────────────────────────────────
   Tube  – smooth path through multiple points
──────────────────────────────────────────────────────────── */
function Tube({
  pts, r = 0.032, color = COL.CAGE_MAIN, segments = 48,
}: {
  pts: [number,number,number][]; r?: number; color?: string; segments?: number;
}) {
  const curve = useMemo(
    () => new THREE.CatmullRomCurve3(pts.map(p => new THREE.Vector3(...p))),
    [pts]
  );
  return (
    <mesh castShadow>
      <tubeGeometry args={[curve, segments, r, 8, false]} />
      <meshStandardMaterial color={color} metalness={0.55} roughness={0.35} />
    </mesh>
  );
}

/* ────────────────────────────────────────────────────────────
   Coilover shock  (body + spring)
──────────────────────────────────────────────────────────── */
function Coilover({
  top, bot, springColor = COL.SHOCK_RED,
}: {
  top: [number,number,number]; bot: [number,number,number]; springColor?: string;
}) {
  const pts = useMemo(() => {
    const t = new THREE.Vector3(...top);
    const b = new THREE.Vector3(...bot);
    const pts: THREE.Vector3[] = [];
    const coils = 7, turns = coils * 22;
    const axis  = b.clone().sub(t).normalize();
    const len   = t.distanceTo(b);
    let perp = new THREE.Vector3(1, 0, 0);
    if (Math.abs(axis.dot(perp)) > 0.9) perp.set(0, 1, 0);
    perp.crossVectors(axis, perp).normalize();
    const perp2 = new THREE.Vector3().crossVectors(axis, perp).normalize();
    const R = 0.055;
    for (let i = 0; i <= turns; i++) {
      const frac = i / turns;
      const ang  = frac * Math.PI * 2 * coils;
      const along = t.clone().addScaledVector(axis, frac * len);
      along.addScaledVector(perp,  Math.cos(ang) * R);
      along.addScaledVector(perp2, Math.sin(ang) * R);
      pts.push(along.clone());
    }
    return pts;
  }, [top, bot]);

  const spCurve = useMemo(
    () => new THREE.CatmullRomCurve3(pts),
    [pts]
  );

  return (
    <group>
      <Rod a={top} b={bot} r={0.022} color={COL.SHOCK_BODY} metalness={0.75} roughness={0.2} />
      <mesh castShadow>
        <tubeGeometry args={[spCurve, pts.length, 0.01, 6, false]} />
        <meshStandardMaterial color={springColor} metalness={0.45} roughness={0.4} />
      </mesh>
    </group>
  );
}

/* ────────────────────────────────────────────────────────────
   Wheel  – knobby tire + multi-spoke alloy rim
──────────────────────────────────────────────────────────── */
function Wheel({
  pos, flip = false, hubRef,
}: {
  pos: [number,number,number]; flip?: boolean; hubRef?: React.RefObject<THREE.Group | null>;
}) {
  const internalRef = useRef<THREE.Group>(null!);
  const ref = (hubRef as React.MutableRefObject<THREE.Group | null> | undefined) ?? internalRef;

  const side = flip ? -1 : 1;
  const TW = 0.36;
  const TR = 0.46;
  const RR = 0.24;

  const knobAngles = useMemo(() =>
    Array.from({ length: 16 }, (_, i) => (i / 16) * Math.PI * 2),
  []);

  return (
    <group position={pos}>
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[TR, TR, TW, 32]} />
        <meshStandardMaterial color={COL.TIRE} roughness={0.92} />
      </mesh>
      {[-TW * 0.44, TW * 0.44].map((ox, i) => (
        <mesh key={i} rotation={[0, 0, Math.PI / 2]} position={[side * ox, 0, 0]}>
          <torusGeometry args={[TR - 0.02, 0.03, 8, 32]} />
          <meshStandardMaterial color={COL.TIRE_SIDE} roughness={0.9} />
        </mesh>
      ))}
      {knobAngles.map((a, i) => (
        <group key={i} rotation={[a, 0, 0]}>
          <mesh position={[0, TR + 0.03, 0]}>
            <boxGeometry args={[TW * 0.22, 0.07, 0.06]} />
            <meshStandardMaterial color={COL.TIRE} roughness={1} />
          </mesh>
          <mesh position={[0, TR + 0.025, TW * 0.18]} rotation={[0, 0.1, 0]}>
            <boxGeometry args={[TW * 0.18, 0.06, 0.055]} />
            <meshStandardMaterial color={COL.TIRE} roughness={1} />
          </mesh>
        </group>
      ))}

      <group ref={ref} rotation={[0, 0, Math.PI / 2]}>
        <mesh castShadow>
          <cylinderGeometry args={[RR, RR, TW * 0.9, 24]} />
          <meshStandardMaterial color={COL.RIM} metalness={0.9} roughness={0.15} />
        </mesh>
        {Array.from({ length: 5 }, (_, i) => {
          const ang = (i / 5) * Math.PI * 2;
          return (
            <mesh key={i} rotation={[ang, 0, 0]} position={[0, RR * 0.5, 0]}>
              <boxGeometry args={[TW * 0.82, RR, 0.028]} />
              <meshStandardMaterial color={COL.RIM_DARK} metalness={0.85} roughness={0.2} />
            </mesh>
          );
        })}
        <mesh>
          <cylinderGeometry args={[0.07, 0.07, TW * 0.95, 16]} />
          <meshStandardMaterial color={COL.ORANGE} emissive={COL.ORANGE} emissiveIntensity={0.6} metalness={0.4} />
        </mesh>
        {Array.from({ length: 5 }, (_, i) => {
          const a2 = (i / 5) * Math.PI * 2;
          return (
            <mesh key={i} position={[0, 0.14 * Math.sin(a2), 0.14 * Math.cos(a2)]}>
              <cylinderGeometry args={[0.018, 0.018, TW * 0.94, 6]} />
              <meshStandardMaterial color="#ccc" metalness={0.9} roughness={0.1} />
            </mesh>
          );
        })}
      </group>

      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[RR * 0.7, RR * 0.7, 0.025, 16]} />
        <meshStandardMaterial color="#444" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
}

/* ────────────────────────────────────────────────────────────
   A-arm suspension pair (upper + lower)
──────────────────────────────────────────────────────────── */
function AArmSet({
  side, front,
}: {
  side: number;
  front: number;
}) {
  const s = side;
  const fz = front * 0.82;
  const outY = 0.18;
  const outZ = s * 0.98;
  const inZ  = s * 0.38;

  return (
    <>
      <Rod a={[fz + 0.18,  0.62, inZ]}  b={[fz,  outY + 0.28, outZ]}  r={0.018} color={COL.STEEL} />
      <Rod a={[fz - 0.18,  0.62, inZ]}  b={[fz,  outY + 0.28, outZ]}  r={0.018} color={COL.STEEL} />
      <Rod a={[fz + 0.22,  0.32, inZ]}  b={[fz,  outY - 0.06, outZ]}  r={0.022} color={COL.STEEL} />
      <Rod a={[fz - 0.22,  0.32, inZ]}  b={[fz,  outY - 0.06, outZ]}  r={0.022} color={COL.STEEL} />
      <Rod a={[fz, outY + 0.28, outZ]}  b={[fz, outY - 0.06, outZ]}  r={0.026} color={COL.STEEL} />
    </>
  );
}

/* ────────────────────────────────────────────────────────────
   Main Procedural BAJA Buggy geometry — A10 proportions
──────────────────────────────────────────────────────────── */
function BajaBuggy() {
  const reduced = useReducedMotion();

  const hubFL = useRef<THREE.Group>(null);
  const hubFR = useRef<THREE.Group>(null);
  const hubRL = useRef<THREE.Group>(null);
  const hubRR = useRef<THREE.Group>(null);

  useFrame((_, dt) => {
    if (reduced) return;
    const spd = dt * 1.4;
    for (const h of [hubFL, hubFR, hubRL, hubRR]) {
      if (h.current) h.current.rotation.x += spd;
    }
  });

  const WFL: [number,number,number] = [ 0.82, 0.18,  0.98];
  const WFR: [number,number,number] = [ 0.82, 0.18, -0.98];
  const WRL: [number,number,number] = [-0.82, 0.18,  0.98];
  const WRR: [number,number,number] = [-0.82, 0.18, -0.98];

  return (
    <group rotation={[0, Math.PI / 2, 0]} position={[0, 0.62, 0]}>
      {/* ── Chassis frame ── */}
      <Rod a={[-1.05, 0.0, 0.52]}  b={[1.05, 0.0,  0.52]}  r={0.030} color={COL.CAGE_MAIN} />
      <Rod a={[-1.05, 0.0, -0.52]} b={[1.05, 0.0, -0.52]}  r={0.030} color={COL.CAGE_MAIN} />
      <Rod a={[-0.72, 0.55, 0.50]} b={[0.72, 0.55,  0.50]} r={0.026} color={COL.CAGE_MAIN} />
      <Rod a={[-0.72, 0.55,-0.50]} b={[0.72, 0.55, -0.50]} r={0.026} color={COL.CAGE_MAIN} />
      <Rod a={[1.05, 0.0,  0.52]}  b={[1.05, 0.0, -0.52]}  r={0.028} color={COL.CAGE_MAIN} />
      <Rod a={[-1.05,0.0,  0.52]}  b={[-1.05,0.0, -0.52]}  r={0.028} color={COL.CAGE_MAIN} />
      <Rod a={[0.0,  0.0,  0.52]}  b={[0.0,  0.0, -0.52]}  r={0.024} color={COL.CAGE_MAIN} />

      {/* ── Main Roll Hoop (tall, orange) ── */}
      <Tube
        pts={[
          [-0.25, 0.0,  0.52],
          [-0.25, 0.55, 0.52],
          [-0.28, 0.96, 0.46],
          [-0.20, 1.28, 0.32],
          [ 0.0,  1.40, 0.0 ],
          [ 0.20, 1.28,-0.32],
          [ 0.28, 0.96,-0.46],
          [ 0.25, 0.55,-0.52],
          [ 0.25, 0.0, -0.52],
        ]}
        r={0.042} color={COL.CAGE_ACC}
      />

      {/* ── Front Hoop (cyan) ── */}
      <Tube
        pts={[
          [-0.14, 0.0,  0.52],
          [-0.14, 0.55, 0.50],
          [-0.10, 0.88, 0.38],
          [ 0.0,  0.96, 0.0 ],
          [ 0.10, 0.88,-0.38],
          [ 0.14, 0.55,-0.50],
          [ 0.14, 0.0, -0.52],
        ]}
        r={0.035} color={COL.CYAN}
      />

      {/* ── Cage Bracing ── */}
      <Rod a={[-0.20, 1.28, 0.32]} b={[-0.10, 0.88, 0.38]} r={0.026} color={COL.CAGE_MAIN} />
      <Rod a={[ 0.20, 1.28,-0.32]} b={[ 0.10, 0.88,-0.38]} r={0.026} color={COL.CAGE_MAIN} />
      <Rod a={[-0.20, 1.28, 0.32]} b={[0.20, 1.28,-0.32]} r={0.028} color={COL.CAGE_MAIN} />
      <Rod a={[ 0.0,  1.40, 0.0 ]} b={[0.0,  0.96, 0.0 ]} r={0.025} color={COL.CAGE_MAIN} />
      <Rod a={[-0.25, 0.30, 0.53]} b={[0.25, 0.30, 0.53]}  r={0.024} color={COL.ORANGE} />
      <Rod a={[-0.25, 0.30,-0.53]} b={[0.25, 0.30,-0.53]}  r={0.024} color={COL.ORANGE} />

      {/* ── Bumpers ── */}
      <Rod a={[1.05, 0.22,  0.38]} b={[1.22, 0.22,  0.20]}  r={0.028} color={COL.CAGE_ACC} />
      <Rod a={[1.05, 0.22, -0.38]} b={[1.22, 0.22, -0.20]}  r={0.028} color={COL.CAGE_ACC} />
      <Rod a={[1.22, 0.22,  0.20]} b={[1.22, 0.22, -0.20]}  r={0.028} color={COL.CAGE_ACC} />
      <mesh position={[1.14, 0.1, 0]} castShadow>
        <boxGeometry args={[0.22, 0.06, 0.58]} />
        <meshStandardMaterial color={COL.STEEL} metalness={0.5} roughness={0.4} />
      </mesh>

      {/* ── Body Panels ── */}
      <mesh position={[0.10, 0.28, 0.54]} rotation={[0, 0, 0.05]} castShadow>
        <boxGeometry args={[0.88, 0.38, 0.04]} />
        <meshStandardMaterial color={COL.ORANGE} metalness={0.25} roughness={0.4} />
      </mesh>
      <mesh position={[0.10, 0.28,-0.54]} rotation={[0, 0,-0.05]} castShadow>
        <boxGeometry args={[0.88, 0.38, 0.04]} />
        <meshStandardMaterial color={COL.ORANGE} metalness={0.25} roughness={0.4} />
      </mesh>
      <mesh position={[-0.38, 0.28, 0.54]} castShadow>
        <boxGeometry args={[0.55, 0.35, 0.04]} />
        <meshStandardMaterial color={COL.PURPLE} metalness={0.25} roughness={0.4} />
      </mesh>
      <mesh position={[-0.38, 0.28,-0.54]} castShadow>
        <boxGeometry args={[0.55, 0.35, 0.04]} />
        <meshStandardMaterial color={COL.PURPLE} metalness={0.25} roughness={0.4} />
      </mesh>
      <mesh position={[0.10, 0.46, 0.54]}>
        <boxGeometry args={[0.88, 0.03, 0.05]} />
        <meshStandardMaterial color={COL.CYAN} emissive={COL.CYAN} emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[0.10, 0.46,-0.54]}>
        <boxGeometry args={[0.88, 0.03, 0.05]} />
        <meshStandardMaterial color={COL.CYAN} emissive={COL.CYAN} emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[0.82, 0.28, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <boxGeometry args={[0.88, 0.32, 0.04]} />
        <meshStandardMaterial color={COL.ORANGE} metalness={0.25} roughness={0.4} />
      </mesh>

      {/* ── Cockpit seat & steering ── */}
      <mesh position={[-0.08, 0.38, 0]} rotation={[0.15, 0, 0]} castShadow>
        <boxGeometry args={[0.38, 0.46, 0.36]} />
        <meshStandardMaterial color="#1a1a24" roughness={0.7} />
      </mesh>
      <mesh position={[0.08, 0.12, 0]} castShadow>
        <boxGeometry args={[0.24, 0.08, 0.38]} />
        <meshStandardMaterial color="#1a1a24" roughness={0.7} />
      </mesh>
      <Rod a={[0.40, 0.42, 0]} b={[0.58, 0.52, 0]} r={0.018} color={COL.STEEL} />
      <mesh position={[0.60, 0.54, 0]} rotation={[0.3, Math.PI / 2, 0]}>
        <torusGeometry args={[0.10, 0.012, 8, 22]} />
        <meshStandardMaterial color="#333" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* ── Headlights ── */}
      {[0.28, -0.28].map((z, i) => (
        <group key={i} position={[1.06, 0.34, z]}>
          <mesh>
            <boxGeometry args={[0.04, 0.12, 0.18]} />
            <meshStandardMaterial color={COL.CYAN} emissive={COL.CYAN} emissiveIntensity={3.5} />
          </mesh>
          <pointLight color={COL.CYAN} intensity={1.5} distance={2.5} decay={2} />
        </group>
      ))}

      {/* ── Roof Light Bar ── */}
      <mesh position={[0.0, 1.46, 0]}>
        <boxGeometry args={[0.48, 0.08, 0.14]} />
        <meshStandardMaterial color={COL.STEEL} metalness={0.7} roughness={0.25} />
      </mesh>
      <mesh position={[0.14, 1.47, 0]}>
        <boxGeometry args={[0.10, 0.06, 0.08]} />
        <meshStandardMaterial color="#ffaa00" emissive="#ff8800" emissiveIntensity={3.5} />
      </mesh>
      <mesh position={[-0.14, 1.47, 0]}>
        <boxGeometry args={[0.10, 0.06, 0.08]} />
        <meshStandardMaterial color={COL.CYAN} emissive={COL.CYAN} emissiveIntensity={3.5} />
      </mesh>

      {/* ── Suspension & Shocks ── */}
      <AArmSet side={+1} front={+1} />
      <AArmSet side={-1} front={+1} />
      <AArmSet side={+1} front={-1} />
      <AArmSet side={-1} front={-1} />
      <Coilover top={[0.78, 0.60,  0.72]} bot={[0.82, 0.14,  0.88]} springColor={COL.SHOCK_RED} />
      <Coilover top={[0.78, 0.60, -0.72]} bot={[0.82, 0.14, -0.88]} springColor={COL.SHOCK_RED} />
      <Coilover top={[-0.78,0.60,  0.72]} bot={[-0.82,0.14,  0.88]} springColor={COL.SHOCK_RED} />
      <Coilover top={[-0.78,0.60, -0.72]} bot={[-0.82,0.14, -0.88]} springColor={COL.SHOCK_RED} />

      {/* ── Wheels ── */}
      <Wheel pos={WFL} flip={false} hubRef={hubFL} />
      <Wheel pos={WFR} flip={true}  hubRef={hubFR} />
      <Wheel pos={WRL} flip={false} hubRef={hubRL} />
      <Wheel pos={WRR} flip={true}  hubRef={hubRR} />

      {/* ── A10 Front Plate ── */}
      <mesh position={[1.08, 0.34, 0]}>
        <boxGeometry args={[0.03, 0.18, 0.30]} />
        <meshStandardMaterial color={COL.ORANGE} emissive={COL.ORANGE} emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

/* ────────────────────────────────────────────────────────────
   GLTF Model Loader with Auto-Center & Auto-Scale
──────────────────────────────────────────────────────────── */
function GltfBuggy({ url }: { url: string }) {
  const gltf = useGLTF(url);
  
  const scene = useMemo(() => {
    const clone = gltf.scene.clone(true);
    
    // Compute bounding box
    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);
    
    // Center model at origin
    clone.position.sub(center);
    
    // Scale model nicely to ~3.8 units length
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      const scale = 3.8 / maxDim;
      clone.scale.setScalar(scale);
    }
    
    // Lift so wheels sit right on the ground plane
    clone.position.y += 0.2;
    
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        if (mesh.material) {
          const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          mats.forEach((m) => {
            if ((m as THREE.MeshStandardMaterial).isMeshStandardMaterial) {
              const std = m as THREE.MeshStandardMaterial;
              std.roughness = Math.max(0.25, std.roughness);
              std.metalness = Math.min(0.85, std.metalness);
            }
          });
        }
      }
    });
    
    return clone;
  }, [gltf.scene]);

  return <primitive object={scene} />;
}

/* ────────────────────────────────────────────────────────────
   Auto-Rotate Wrapper
──────────────────────────────────────────────────────────── */
function AutoRotate({ children, speed = 0.22 }: { children: React.ReactNode; speed?: number }) {
  const ref = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();
  useFrame((_, dt) => {
    if (ref.current && !reduced) {
      ref.current.rotation.y += dt * speed;
    }
  });
  return <group ref={ref}>{children}</group>;
}

/* ────────────────────────────────────────────────────────────
   Tech Circular Podium Floor (no z-fighting)
──────────────────────────────────────────────────────────── */
function TechPodium() {
  return (
    <group position={[0, -1.05, 0]}>
      {/* Outer subtle glow ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <ringGeometry args={[2.5, 2.53, 64]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.35} />
      </mesh>

      {/* Inner orange accent ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.007, 0]}>
        <ringGeometry args={[1.8, 1.82, 64]} />
        <meshBasicMaterial color="#ff6b00" transparent opacity={0.3} />
      </mesh>

      {/* Center tech ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.009, 0]}>
        <ringGeometry args={[0.9, 0.915, 48]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.25} />
      </mesh>

      {/* Crosshair markers on podium */}
      {[-2.4, 2.4].map((offset, i) => (
        <React.Fragment key={i}>
          <mesh position={[offset, 0.01, 0]}>
            <boxGeometry args={[0.15, 0.002, 0.015]} />
            <meshBasicMaterial color="#ff6b00" transparent opacity={0.5} />
          </mesh>
          <mesh position={[0, 0.01, offset]}>
            <boxGeometry args={[0.015, 0.002, 0.15]} />
            <meshBasicMaterial color="#00d4ff" transparent opacity={0.5} />
          </mesh>
        </React.Fragment>
      ))}

      {/* Circular podium disc */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[3.2, 64]} />
        <meshStandardMaterial
          color="#0d0d14"
          metalness={0.7}
          roughness={0.35}
        />
      </mesh>
    </group>
  );
}

/* ────────────────────────────────────────────────────────────
   Exported Vehicle3D Component
──────────────────────────────────────────────────────────── */
export default function Vehicle3D({ modelUrl }: { modelUrl?: string | null }) {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 5.0], fov: 44 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      frameloop="always"
      aria-label="3D model of Team Abhyuday Racing A10 BAJA buggy"
      role="img"
    >
      {/* ── Studio Lighting (100% reliable, zero remote network failure) ── */}
      <ambientLight intensity={1.3} />

      {/* Main warm key light */}
      <directionalLight position={[6, 9, 7]} intensity={3.6} color="#fffcf5" castShadow />

      {/* Cool cyan fill light from side */}
      <directionalLight position={[-6, 5, 2]} intensity={2.2} color="#00d4ff" />

      {/* Warm orange rim light from back */}
      <directionalLight position={[-2, 6, -6]} intensity={1.8} color="#ff6b00" />

      {/* Underglow accent */}
      <directionalLight position={[0, -3, 3]} intensity={1.0} color="#ff6b00" />

      {/* Studio ceiling fill */}
      <hemisphereLight args={["#2a2a3e", "#0a0a12", 1.2]} />

      {/* Tech platform floor */}
      <TechPodium />

      {/* Interactive OrbitControls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.1}
      />

      {/* Rotating Buggy with float */}
      <AutoRotate speed={0.22}>
        <Float speed={1.4} rotationIntensity={0.03} floatIntensity={0.2}>
          <Suspense fallback={<BajaBuggy />}>
            {modelUrl ? <GltfBuggy url={modelUrl} /> : <BajaBuggy />}
          </Suspense>
        </Float>
      </AutoRotate>

      {/* Dust sparkles */}
      <Sparkles
        count={45}
        size={1.1}
        scale={[5, 0.8, 5]}
        position={[0, -0.4, 0]}
        speed={0.16}
        opacity={0.3}
        color="#ff6b00"
      />

      {/* Ground contact shadow */}
      <ContactShadows
        position={[0, -1.04, 0]}
        opacity={0.7}
        scale={9}
        blur={2.8}
        far={2.8}
        color="#000000"
      />
    </Canvas>
  );
}