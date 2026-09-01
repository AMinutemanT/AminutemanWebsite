import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useReducedMotion } from 'framer-motion';
import * as THREE from 'three';

/* ---------------------------------------------------------------------------
 * The Ankosha formation, flown as real geometry.
 *
 * Four airframes travel out of depth and past the
 * camera on a loop. The mesh is the Ankosha-A STEP assembly reduced to a hero
 * LOD (9k triangles against the 120k-triangle detail model on the programme
 * page), so four simultaneous copies stay cheap.
 *
 * Model axes, measured off the mesh rather than assumed: the -X end has a
 * 0.18 cross-section (the nose) and the +X end spans the full 1.52 wing (the
 * trailing edge). Rotating +90 degrees about Y therefore points the nose down
 * +Z, straight at the camera. Getting this sign wrong flies the formation
 * tail-first.
 * ------------------------------------------------------------------------- */

const MODEL = '/models/ankosha_lod.glb';

useGLTF.setDecoderPath('/draco/');

interface Element {
  designation: string;
  role: string;
  /** Lateral and vertical offset from the formation axis. */
  x: number;
  y: number;
  scale: number;
  /** Where this element starts in the run, 0 to 1. */
  phase: number;
}

/** Lead element on the axis, three arms opening out behind it. */
const ELEMENTS: Element[] = [
  { designation: 'ANKOSHA-C', role: 'FORMATION LEAD', x: 0, y: 0.15, scale: 1.0, phase: 0.0 },
  { designation: 'ANKOSHA-A', role: 'MAN-PORTABLE', x: -3.6, y: -0.4, scale: 0.84, phase: 0.24 },
  { designation: 'ANKOSHA-B', role: 'VEHICLE-LAUNCHED', x: 3.6, y: -0.4, scale: 0.84, phase: 0.48 },
  { designation: 'ANKOSHA-S', role: 'SWARM ELEMENT', x: 1.7, y: -2.5, scale: 0.7, phase: 0.74 },
];

const Z_FAR = -68;
const Z_NEAR = 9;
const CYCLE = 15; // seconds for one element to traverse the run

function Airframe({
  element,
  animate,
  axisX,
  scale,
}: {
  element: Element;
  animate: boolean;
  axisX: number;
  scale: number;
}) {
  const { scene } = useGLTF(MODEL);
  const group = useRef<THREE.Group>(null);

  // Each element needs its own material so it can fade independently.
  const model = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.material = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#9aa0a8'),
        metalness: 0.25,
        roughness: 0.55,
        transparent: true,
        opacity: 1,
      });
    });
    return clone;
  }, [scene]);

  const setOpacity = (v: number) => {
    model.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (mesh.isMesh) (mesh.material as THREE.MeshStandardMaterial).opacity = v;
    });
  };

  const place = (t: number, elapsed: number) => {
    if (!group.current) return;
    const z = Z_FAR + t * (Z_NEAR - Z_FAR);
    // Offsets open out as the formation approaches, so it reads as a cross
    // rather than a clump when it is still far away.
    const spread = 0.35 + 0.65 * t;
    group.current.position.set((axisX + element.x) * spread, element.y * spread, z);

    // Fade in out of the haze, fade out as it passes the lens.
    const far = THREE.MathUtils.smoothstep(t, 0.0, 0.18);
    const near = 1 - THREE.MathUtils.smoothstep(t, 0.80, 0.99);
    setOpacity(far * near);

    // Nose down the +Z axis, with a slow bank so it does not read as a decal.
    group.current.rotation.set(
      Math.sin(elapsed * 0.4 + element.phase * 8) * 0.05,
      Math.PI / 2,
      Math.sin(elapsed * 0.3 + element.phase * 6) * 0.09,
    );

  };

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    const t = animate
      ? ((elapsed / CYCLE + element.phase) % 1)
      : (element.phase * 0.4 + 0.45) % 1;
    place(t, animate ? elapsed : 0);
  });

  return (
    <group ref={group} scale={element.scale * scale}>
      <primitive object={model} />
    </group>
  );
}

function Formation({
  animate,
  axisX,
  scale,
}: {
  animate: boolean;
  axisX: number;
  scale: number;
}) {
  return (
    <>
      {ELEMENTS.map((e) => (
        <Airframe
          key={e.designation}
          element={e}
          animate={animate}
          axisX={axisX}
          scale={scale}
        />
      ))}
    </>
  );
}

export interface AnkoshaSceneProps {
  className?: string;
  /** Scales the overall luminance so the hero and the inset can differ. */
  intensity?: number;
  /**
   * Lateral offset of the formation axis. The hero pushes the run right so it
   * clears the headline column; a centred panel leaves it at zero.
   */
  axisX?: number;
  /** Overall airframe size, tuned per frame width. */
  scale?: number;
}

/** WebGL is not guaranteed. Probe once so a machine without it still gets a page. */
function useWebGL() {
  const [supported, setSupported] = useState(true);
  useEffect(() => {
    try {
      const c = document.createElement('canvas');
      if (!(c.getContext('webgl2') || c.getContext('webgl'))) setSupported(false);
    } catch {
      setSupported(false);
    }
  }, []);
  return supported;
}

export function AnkoshaScene({
  className = '',
  intensity = 1,
  axisX = 0,
  scale = 2.3,
}: AnkoshaSceneProps) {
  const reduced = useReducedMotion();
  const supported = useWebGL();

  // Without a context the hero falls back to the grid backdrop. The formation is
  // decoration; losing it must not take the page down with it.
  if (!supported) {
    return (
      <div className={`${className} overflow-hidden`}>
        <div className="absolute inset-0 bg-grid-fine bg-grid-fine opacity-[0.12]" />
      </div>
    );
  }

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 58, near: 0.1, far: 200 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        frameloop={reduced ? 'demand' : 'always'}
      >
        <fog attach="fog" args={['#000000', 62, 135]} />
        <ambientLight intensity={0.9 * intensity} />
        <directionalLight position={[4, 6, 8]} intensity={3.4 * intensity} color="#f2f2f5" />
        <directionalLight position={[-6, 1, 3]} intensity={2.2 * intensity} color="#FF8A00" />
        <directionalLight position={[0, -5, 4]} intensity={0.8 * intensity} color="#5AB6FF" />

        <Suspense fallback={null}>
          <Formation animate={!reduced} axisX={axisX} scale={scale} />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL);

export default AnkoshaScene;
