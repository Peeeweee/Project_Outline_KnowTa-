import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useDeckStore } from '../store/deckStore';

// Texture generators
function createGrooveTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#0B0B0C'; // base roughness
    ctx.fillRect(0, 0, 1024, 1024);
    ctx.strokeStyle = '#333333'; // groove bumps
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 120; i++) {
      ctx.beginPath();
      ctx.arc(512, 512, 150 + i * 3, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createLabelTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 512, 512);
    
    ctx.fillStyle = '#0B0B0C';
    ctx.font = 'bold 48px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('KNOW-TA!', 256, 240);
    
    ctx.font = '24px "JetBrains Mono", monospace';
    ctx.fillText('SIDE A', 256, 290);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Draggable controls
function DragControls({ calmMode, groupRef }: { calmMode: boolean, groupRef: React.RefObject<THREE.Group | null> }) {
  const { gl } = useThree();
  const isDragging = useRef(false);
  const previousX = useRef(0);
  const velocity = useRef(0);
  const rotation = useRef(0);

  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      isDragging.current = true;
      previousX.current = e.clientX;
      velocity.current = 0;
    };
    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const deltaX = e.clientX - previousX.current;
      velocity.current = deltaX * 0.01;
      rotation.current += velocity.current;
      previousX.current = e.clientX;
    };
    const handlePointerUp = () => {
      isDragging.current = false;
      if (calmMode) velocity.current = 0;
    };

    const canvas = gl.domElement;
    canvas.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [gl, calmMode]);

  useFrame((_, delta) => {
    if (!isDragging.current && !calmMode) {
      rotation.current += velocity.current;
      rotation.current += 0.1 * delta; // slow idle rotation
      velocity.current *= 0.95; // friction
    } else if (calmMode && !isDragging.current) {
      velocity.current = 0;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = rotation.current;
    }
  });

  return null;
}

function DiscSceneInner({ 
  isSplit = false, 
  isInView,
  isHero = false, 
  activeStep = 'Split' 
}: { 
  isSplit?: boolean;
  isInView?: boolean;
  isHero?: boolean, 
  activeStep?: string 
}) {
  const { calmMode } = useDeckStore();
  const groupRef = useRef<THREE.Group>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  const splitState = isSplit && !isHero;

  const grooveTexture = useMemo(() => createGrooveTexture(), []);
  const labelTexture = useMemo(() => createLabelTexture(), []);

  useEffect(() => {
    return () => {
      grooveTexture.dispose();
      labelTexture.dispose();
    };
  }, [grooveTexture, labelTexture]);

  // Geometries
  const outerGeo = useMemo(() => {
    const pts = [];
    const R1 = 0.6, R2 = 1.6, h = 0.06;
    pts.push(new THREE.Vector2(R1, -h));
    pts.push(new THREE.Vector2(R2 - 0.02, -h));
    pts.push(new THREE.Vector2(R2, -h + 0.02));
    pts.push(new THREE.Vector2(R2, h - 0.02));
    pts.push(new THREE.Vector2(R2 - 0.02, h));
    pts.push(new THREE.Vector2(R1, h));
    return new THREE.LatheGeometry(pts, 128);
  }, []);

  const innerGeo = useMemo(() => {
    const pts = [];
    const r1 = 0.05, r2 = 0.59, h = 0.06;
    pts.push(new THREE.Vector2(r1, -h));
    pts.push(new THREE.Vector2(r2 - 0.02, -h));
    pts.push(new THREE.Vector2(r2, -h + 0.02));
    pts.push(new THREE.Vector2(r2, h - 0.02));
    pts.push(new THREE.Vector2(r2 - 0.02, h));
    pts.push(new THREE.Vector2(r1, h));
    return new THREE.LatheGeometry(pts, 128);
  }, []);

  const labelGeo = useMemo(() => new THREE.CylinderGeometry(0.5, 0.5, 0.121, 64), []);

  useFrame(() => {
    if (calmMode) {
      if (outerRef.current) outerRef.current.position.y = splitState ? 0.6 : 0;
      if (innerRef.current) innerRef.current.position.y = splitState ? -0.2 : 0;
    } else {
      const targetOuterY = splitState ? 0.6 : 0;
      const targetInnerY = splitState ? -0.2 : 0;
      if (outerRef.current) outerRef.current.position.y += (targetOuterY - outerRef.current.position.y) * 0.1;
      if (innerRef.current) innerRef.current.position.y += (targetInnerY - innerRef.current.position.y) * 0.1;
    }

    if (splitState && !calmMode) {
      if (outerRef.current) outerRef.current.rotation.y -= 0.002;
      if (innerRef.current) innerRef.current.rotation.y += 0.002;
    } else {
      if (outerRef.current) outerRef.current.rotation.y = 0;
      if (innerRef.current) innerRef.current.rotation.y = 0;
    }
  });

  const scale = isHero ? 0.7 : 1;

  if (!isInView) return null;

  return (
    <>
      <Environment preset="studio" />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} />
      
      <group scale={[scale, scale, scale]} position={[0, isHero ? -0.5 : 0, 0]} rotation={[0.3, 0, 0]}>
        <group ref={groupRef}>
          {/* Outer Ring (Voice) */}
          <mesh ref={outerRef} geometry={outerGeo}>
            <meshPhysicalMaterial 
              color={activeStep === 'Judge' || activeStep === 'Fuse' ? '#ffffff' : '#e0e0e0'} 
              roughness={0.6}
              metalness={0.1}
              clearcoat={0.3}
              emissive={activeStep === 'Doubt' ? '#ffffff' : '#000000'}
              emissiveIntensity={activeStep === 'Doubt' ? 0.1 : 0}
            />
          </mesh>

          {/* Inner Disc (Instruments) */}
          <mesh ref={innerRef} geometry={innerGeo}>
            <meshPhysicalMaterial 
              color="#0B0B0C"
              roughness={0.28}
              metalness={0.2}
              clearcoat={1}
              clearcoatRoughness={0.15}
              bumpMap={grooveTexture}
              roughnessMap={grooveTexture}
              emissive={activeStep === 'Doubt' ? '#ffffff' : '#000000'}
              emissiveIntensity={activeStep === 'Doubt' ? 0.1 : 0}
            />
            <mesh geometry={labelGeo} position={[0, 0, 0]}>
              <meshBasicMaterial map={labelTexture} />
            </mesh>
          </mesh>
        </group>
        <DragControls calmMode={calmMode} groupRef={groupRef} />

        {/* Labels (not rotating with drag) */}
        {splitState && (
          <>
            <group position={[-2.5, outerRef.current?.position.y || 0.6, 0]}>
              <Html center>
                <div className="flex items-center gap-2 pointer-events-none whitespace-nowrap">
                  <div className="font-mono text-[12px] text-black bg-white/80 px-2 py-1 rounded backdrop-blur">VOICE</div>
                  <div className="w-12 h-[1px] bg-white/50" />
                </div>
              </Html>
            </group>
            <group position={[2.5, innerRef.current?.position.y || -0.2, 0]}>
              <Html center>
                <div className="flex items-center gap-2 pointer-events-none whitespace-nowrap">
                  <div className="w-12 h-[1px] bg-white/50" />
                  <div className="font-mono text-[12px] text-white bg-black/80 px-2 py-1 rounded border border-white/20 backdrop-blur">INSTRUMENTS</div>
                </div>
              </Html>
            </group>
            
            <group position={[0, 0.4, 0]}>
              <Html center>
                <div className="w-[1px] h-16 border-l border-dotted border-white/40 pointer-events-none" />
              </Html>
            </group>
          </>
        )}
        
        {!splitState && !isHero && (activeStep === 'Merge' || activeStep === 'Fuse' || activeStep === 'Doubt') && (
          <group position={[0, -1.8, 0]}>
            <Html center>
              <div className="flex flex-col items-center pointer-events-none whitespace-nowrap">
                <div className="font-mono text-[12px] text-white bg-black/80 px-2 py-1 rounded border border-white/20 backdrop-blur mb-1">CONFIDENCE</div>
                <svg width="40" height="20" viewBox="0 0 40 20" className="opacity-80">
                  <path d="M5,20 A15,15 0 0,1 35,20" fill="none" stroke="white" strokeWidth="2" strokeDasharray="4 4"/>
                </svg>
              </div>
            </Html>
          </group>
        )}
      </group>

      <ContactShadows position={[0, -1.2, 0]} opacity={0.35} blur={2.5} far={4} color="#0A0A0B" />
    </>
  );
}

export default function DiscScene({ 
  isSplit = false, 
  isInView,
  isHero = false, 
  activeStep = 'Split' 
}: { 
  isSplit?: boolean;
  isInView?: boolean;
  isHero?: boolean, 
  activeStep?: string 
}) {
  if (!isInView) return null;

  return (
    <Canvas
      className="w-full h-full"
      dpr={[1, 1.5]}
      camera={{ position: [0, 2.5, 7.5], fov: 30 }}
      gl={{ alpha: true, antialias: true }}
    >
      <DiscSceneInner isSplit={isSplit} isHero={isHero} activeStep={activeStep} />
    </Canvas>
  );
}
