import { Suspense, useEffect, useRef, useState, type ComponentRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Bounds, useProgress } from '@react-three/drei';
import { useInView } from 'framer-motion';
import * as THREE from 'three';


/* ---------------------------------------------------------------------------
 * Live CAD viewer.
 *
 * The models here are the actual engineering STEP assemblies, tessellated and
 * Draco-compressed for the web. Nothing is a stand-in render: what rotates on
 * the page is the geometry the airframe is built from.
 *
 * three.js is a large dependency, so this component is only ever reached
 * through React.lazy (see LazyModelViewer below) and never lands in the main
 * bundle of a page that does not show a model.
 * ------------------------------------------------------------------------- */

export interface ModelViewerProps {
  /** Path under /models, e.g. "/models/ankosha_a.glb". */
  src: string;
  /** Designation printed in the HUD corner. */
  label: string;
  /** Short caption under the frame. */
  caption?: string;
  /** Callouts printed down the right edge, e.g. dimensions. */
  readouts?: { label: string; value: string }[];
  className?: string;
  /** Frame height. Defaults to a 16/9-ish block. */
  height?: string;
}

useGLTF.setDecoderPath('/draco/');

function Model({ src, spin, angle }: { src: string; spin: boolean; angle: number }) {
  const { scene } = useGLTF(src, '/draco/');
  const ref = useRef<THREE.Group>(null);

  // Clone so the same asset can appear twice on a page without sharing state.
  const cloned = useRef<THREE.Object3D | null>(null);
  if (!cloned.current) cloned.current = scene.clone(true);

  useEffect(() => {
    if (ref.current) ref.current.rotation.y = angle;
  }, [angle]);

  useFrame((_, delta) => {
    if (spin && ref.current) ref.current.rotation.y += delta * 0.18;
  });

  return (
    <group ref={ref}>
      <primitive object={cloned.current} />
    </group>
  );
}

function Loader() {
  const { progress, active } = useProgress();
  if (!active && progress >= 100) return null;
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3">
      <div className="h-px w-40 overflow-hidden bg-line">
        <div
          className="h-full bg-accent transition-[width] duration-200"
          style={{ width: `${Math.min(100, Math.round(progress))}%` }}
        />
      </div>
      <p className="font-mono text-[0.6rem] uppercase tracking-widest text-ink-3">
        Loading geometry {Math.min(100, Math.round(progress))}%
      </p>
    </div>
  );
}

export function ModelViewer({
  src,
  label,
  caption,
  readouts,
  className = '',
  height = 'h-[380px] sm:h-[520px] lg:h-[600px]',
}: ModelViewerProps) {
  const frame = useRef<HTMLDivElement>(null);
  const controls = useRef<ComponentRef<typeof OrbitControls>>(null);
  const visible = useInView(frame);
  const [rotating, setRotating] = useState(false);
  const [angle, setAngle] = useState(0);
  const [supported, setSupported] = useState<boolean | null>(null);

  // WebGL is not guaranteed. Fail to a readable panel rather than a blank box.
  useEffect(() => {
    try {
      const c = document.createElement('canvas');
      const gl = c.getContext('webgl2') || c.getContext('webgl');
      setSupported(Boolean(gl));
      gl?.getExtension('WEBGL_lose_context')?.loseContext();
    } catch {
      setSupported(false);
    }
  }, []);

  const rotate = (direction: number) => {
    setRotating(false);
    setAngle((value) => value + direction * Math.PI / 8);
  };

  const zoom = (factor: number) => {
    const orbit = controls.current;
    if (!orbit) return;
    const offset = orbit.object.position.clone().sub(orbit.target);
    offset.setLength(Math.max(orbit.minDistance, Math.min(orbit.maxDistance, offset.length() * factor)));
    orbit.object.position.copy(orbit.target).add(offset);
    orbit.update();
  };

  return (
    <figure className={className}>
              <div
          ref={frame}
          className={`relative overflow-hidden border border-line bg-abyss ${height}`}
          onPointerDown={() => setRotating(false)}
        >
          <div className="absolute inset-0 bg-grid-fine bg-grid-fine opacity-[0.14]" />

          {supported ? (
            <>
              <Canvas
                camera={{ position: [2.4, 1.1, 2.4], fov: 42 }}
                dpr={[1, 1.75]}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
                frameloop={rotating && visible ? 'always' : 'demand'}
                aria-label={`${label} interactive 3D model`}
              >
                {/* Three-point rig: neutral key, warm accent rim, cool fill. */}
                <ambientLight intensity={0.7} />
                <directionalLight position={[5, 6, 4]} intensity={2.6} color="#f2f2f5" />
                <directionalLight position={[-5, 2, -4]} intensity={1.15} color="#FF8A00" />
                <directionalLight position={[0, -4, 2]} intensity={0.4} color="#5AB6FF" />

                <Suspense fallback={null}>
                  <Bounds fit clip observe margin={0.82}>
                    <Model src={src} spin={rotating && visible} angle={angle} />
                  </Bounds>
                </Suspense>

                <OrbitControls
                  ref={controls}
                  makeDefault
                  enablePan={false}
                  enableDamping
                  dampingFactor={0.08}
                  minDistance={1.6}
                  maxDistance={7}
                />
              </Canvas>
              <Loader />
            </>
          ) : supported === false ? (
            <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
              <p className="font-mono text-[0.65rem] uppercase leading-relaxed tracking-widest text-ink-3">
                3D view requires WebGL
                <br />
                <span className="text-ink-dim">Geometry available on request</span>
              </p>
            </div>
          ) : <Loader />}

          {/* HUD chrome */}
          <div className="pointer-events-none absolute inset-0">
            <span className="absolute left-3 top-3 font-mono text-[0.6rem] uppercase tracking-widest text-ink-3">
              {label}
            </span>
            <span className="absolute right-3 top-3 font-mono text-[0.6rem] uppercase tracking-widest text-accent/80">
              CAD / live geometry
            </span>

            {readouts && readouts.length > 0 && (
              <dl className="absolute bottom-3 left-3 space-y-1">
                {readouts.map((r) => (
                  <div key={r.label} className="flex items-baseline gap-2">
                    <dt className="font-mono text-[0.55rem] uppercase tracking-widest text-ink-dim">
                      {r.label}
                    </dt>
                    <dd className="font-mono text-[0.6rem] uppercase tracking-widest text-white/70">
                      {r.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            {supported && (
              <span className="absolute bottom-3 right-3 font-mono text-[0.55rem] uppercase tracking-widest text-ink-dim">
                Drag to orbit · scroll to zoom
              </span>
            )}
          </div>
        </div>

      {supported && (
        <div role="group" aria-label={`${label} model controls`} className="flex flex-wrap gap-2 border-x border-b border-line bg-panel p-3">
          <button type="button" className="btn-secondary px-3 text-[0.65rem]" onClick={() => rotate(-1)}>Rotate left</button>
          <button type="button" className="btn-secondary px-3 text-[0.65rem]" onClick={() => rotate(1)}>Rotate right</button>
          <button type="button" className="btn-secondary px-3 text-[0.65rem]" onClick={() => zoom(0.8)}>Zoom in</button>
          <button type="button" className="btn-secondary px-3 text-[0.65rem]" onClick={() => zoom(1.25)}>Zoom out</button>
          <button type="button" className="btn-secondary px-3 text-[0.65rem]" aria-pressed={rotating} onClick={() => setRotating((value) => !value)}>{rotating ? 'Pause rotation' : 'Auto rotate'}</button>
        </div>
      )}

      {caption && (
        <figcaption className="mt-3 font-mono text-[0.65rem] uppercase tracking-widest text-ink-dim">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export default ModelViewer;
