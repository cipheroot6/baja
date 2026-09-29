"use client";

import React, { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Environment,
  ContactShadows,
  Float,
  Center,
  Resize
} from "@react-three/drei";
import * as THREE from "three";

// Suppress Three.js deprecation warnings (e.g. from internal R3F usage)
const originalWarn = console.warn;
console.warn = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('THREE.Clock')) return;
  originalWarn(...args);
};

function AutoRotate({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.y += dt * 0.15;
    }
  });
  return <group ref={ref}>{children}</group>;
}

function BuggyModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);

  const optimizedScene = useMemo(() => {
    const clone = scene.clone(true);
    
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        
        let isFrame = false;
        let isTire = false;
        let isMech = false;
        
        // Traverse upwards to check parent group names (CAD exports usually name groups, not individual meshes)
        let curr: THREE.Object3D | null = child;
        while (curr) {
          const n = curr.name.toLowerCase();
          if (n.includes("rollcage")) isFrame = true;
          else if (n.includes("leno")) isTire = true;
          else if (n.match(/wishbone|knuckle|flu|fll|fru|frl|shaft/)) isMech = true;
          curr = curr.parent;
        }

        const newMat = new THREE.MeshPhysicalMaterial();
        
        if (isFrame) {
          // Glossy Team Orange Paint
          newMat.color.set("#ff6b00");
          newMat.metalness = 0.5;
          newMat.roughness = 0.15;
          newMat.clearcoat = 1.0;
          newMat.clearcoatRoughness = 0.1;
        } else if (isTire) {
          // Matte Rubber Black
          newMat.color.set("#0a0a0a");
          newMat.metalness = 0.0;
          newMat.roughness = 0.95;
        } else if (isMech) {
          // Black metal rods / suspension
          newMat.color.set("#111111");
          newMat.metalness = 0.8;
          newMat.roughness = 0.4;
        } else {
          // Fallback Dark Metal / Carbon for unknown parts
          newMat.color.set("#1a1a1a");
          newMat.metalness = 0.6;
          newMat.roughness = 0.5;
        }
        
        // Preserve doubleSided if original had it
        if (child.material && !Array.isArray(child.material)) {
           newMat.side = (child.material as THREE.Material).side;
        }
        
        child.material = newMat;
      }
    });
    return clone;
  }, [scene]);

  return (
    // Rotate -90 degrees on X to convert Z-up/Y-up CAD orientation, laying it flat
    <group rotation={[-Math.PI / 2, 0, 0]}>
      <Resize scale={2.5}>
        <Center>
          <primitive object={optimizedScene} />
        </Center>
      </Resize>
    </group>
  );
}

export default function Vehicle3D({ modelUrl }: { modelUrl?: string | null }) {
  return (
    <Canvas
      shadows={{ type: THREE.PCFShadowMap }}
      camera={{ position: [0, 1.5, 6], fov: 40 }}
      dpr={[1, 2]} 
      gl={{ antialias: true, alpha: true, toneMappingExposure: 1.0 }}
    >
      {/* Cinematic Lighting restored */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow shadow-bias={-0.0001} />
      <directionalLight position={[-5, 5, -5]} intensity={1.5} color="#ff6b00" />
      <directionalLight position={[0, 2, -5]} intensity={1.0} color="#00ffff" />
      
      <Environment preset="night" environmentIntensity={0.5} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.1}
      />

      <AutoRotate>
        <Float speed={1.5} rotationIntensity={0.03} floatIntensity={0.15}>
          <Suspense fallback={null}>
            {modelUrl ? <BuggyModel url={modelUrl} /> : null}
          </Suspense>
        </Float>
      </AutoRotate>

      {/* Cinematic Floor Shadow restored */}
      <ContactShadows
        position={[0, -1.25, 0]}
        opacity={0.8}
        scale={10}
        blur={2.5}
        far={3}
        color="#000000"
      />
    </Canvas>
  );
}
