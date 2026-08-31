import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  MeshTransmissionMaterial,
  Float,
  Sparkles,
} from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useMemo, useRef, Suspense } from "react";
import * as THREE from "three";
import { scrollState } from "../lib/scroll";

const damp = THREE.MathUtils.damp;

/* ---------------------------------------------------------------- core */
function Core() {
  const group = useRef<THREE.Group>(null!);
  const inner = useRef<THREE.Mesh>(null!);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const p = scrollState.progress;
    const g = group.current;
    g.rotation.y = damp(g.rotation.y, t * 0.18 + p * Math.PI * 2.2, 4, dt);
    g.rotation.x = damp(g.rotation.x, Math.sin(t * 0.25) * 0.15 + p * 0.7, 4, dt);
    const s = 1 + Math.sin(t * 0.9) * 0.015;
    g.scale.setScalar(s);
    inner.current.rotation.x -= dt * 0.4;
    inner.current.rotation.z += dt * 0.25;
  });

  return (
    <group ref={group}>
      {/* glass shell */}
      <mesh castShadow>
        <icosahedronGeometry args={[1.5, 6]} />
        <MeshTransmissionMaterial
          samples={6}
          resolution={256}
          transmission={1}
          roughness={0.06}
          thickness={1.6}
          ior={1.5}
          chromaticAberration={0.35}
          anisotropy={0.3}
          distortion={0.35}
          distortionScale={0.4}
          temporalDistortion={0.15}
          color="#cfe9ff"
          attenuationColor="#7cf5d5"
          attenuationDistance={2.4}
        />
      </mesh>

      {/* metal skeleton inside */}
      <mesh ref={inner} scale={0.78}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#0d1018"
          metalness={1}
          roughness={0.18}
          emissive="#0b3b33"
          emissiveIntensity={0.5}
          flatShading
        />
      </mesh>

      {/* glowing filament */}
      <mesh scale={0.4}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#7cf5d5" toneMapped={false} />
      </mesh>

      {/* wire cage */}
      <mesh scale={1.95}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#2f4f5e" wireframe transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

/* --------------------------------------------------------------- rings */
function Rings() {
  const a = useRef<THREE.Mesh>(null!);
  const b = useRef<THREE.Mesh>(null!);
  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    a.current.rotation.z += dt * 0.22;
    a.current.rotation.x = Math.PI / 2.6 + Math.sin(t * 0.3) * 0.2;
    b.current.rotation.y += dt * 0.3;
    b.current.rotation.z = Math.cos(t * 0.24) * 0.4;
  });
  const mat = (
    <meshStandardMaterial
      color="#b9c3d6"
      metalness={1}
      roughness={0.14}
      envMapIntensity={1.6}
    />
  );
  return (
    <group>
      <mesh ref={a}>
        <torusGeometry args={[2.6, 0.045, 24, 220]} />
        {mat}
      </mesh>
      <mesh ref={b} scale={1.22}>
        <torusGeometry args={[2.6, 0.028, 20, 220]} />
        <meshStandardMaterial
          color="#7cf5d5"
          metalness={0.9}
          roughness={0.25}
          emissive="#1e5f52"
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  );
}

/* -------------------------------------------------------------- shards */
function Shards({ count = 44 }: { count?: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const seeds = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        r: 3.6 + Math.random() * 4.2,
        theta: Math.random() * Math.PI * 2,
        y: (Math.random() - 0.5) * 7,
        speed: 0.06 + Math.random() * 0.18,
        scale: 0.08 + Math.random() * 0.26,
        spin: Math.random() * Math.PI,
        i,
      })),
    [count]
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    seeds.forEach((s, i) => {
      const ang = s.theta + t * s.speed;
      dummy.position.set(
        Math.cos(ang) * s.r,
        s.y + Math.sin(t * 0.4 + s.i) * 0.35,
        Math.sin(ang) * s.r
      );
      dummy.rotation.set(t * s.speed * 2 + s.spin, ang, s.spin);
      dummy.scale.setScalar(s.scale);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]} castShadow>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#20242e"
        metalness={0.95}
        roughness={0.22}
        envMapIntensity={1.2}
        flatShading
      />
    </instancedMesh>
  );
}

/* ------------------------------------------------------------- monolith */
function Monoliths() {
  const g = useRef<THREE.Group>(null!);
  useFrame((_, dt) => {
    g.current.rotation.y += dt * 0.05;
  });
  const items = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => {
        const a = (i / 7) * Math.PI * 2;
        return {
          pos: [Math.cos(a) * 6.5, -2.6 + (i % 3) * 0.6, Math.sin(a) * 6.5] as const,
          h: 3 + (i % 4) * 1.3,
          rot: a,
        };
      }),
    []
  );
  return (
    <group ref={g}>
      {items.map((m, i) => (
        <mesh key={i} position={[m.pos[0], m.pos[1], m.pos[2]]} rotation={[0, -m.rot, 0]}>
          <boxGeometry args={[0.55, m.h, 0.55]} />
          <meshStandardMaterial
            color="#0b0d14"
            metalness={0.85}
            roughness={0.35}
            envMapIntensity={0.9}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------- gridfloor */
function GridFloor() {
  const ref = useRef<THREE.Group>(null!);
  useFrame((_, dt) => {
    ref.current.position.z = (ref.current.position.z + dt * 0.6) % 2;
  });
  return (
    <group position={[0, -4.2, 0]} rotation={[0, 0, 0]}>
      <group ref={ref}>
        <gridHelper args={[80, 80, "#1d3b3a", "#12202b"]} />
      </group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial
          color="#05060a"
          metalness={0.9}
          roughness={0.35}
          envMapIntensity={0.4}
        />
      </mesh>
    </group>
  );
}

/* ---------------------------------------------------------------- rig */
function Rig() {
  const { camera } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);
  useFrame((state, dt) => {
    const p = scrollState.progress;
    const t = state.clock.elapsedTime;
    // camera path: dolly out & orbit as the page scrolls
    const radius = 9 - Math.sin(p * Math.PI) * 2.4;
    const angle = p * Math.PI * 1.4;
    target.set(
      Math.sin(angle) * radius + scrollState.pointerX * 0.9,
      1.4 - p * 3.2 - scrollState.pointerY * 0.6 + Math.sin(t * 0.5) * 0.12,
      Math.cos(angle) * radius
    );
    camera.position.x = damp(camera.position.x, target.x, 2.5, dt);
    camera.position.y = damp(camera.position.y, target.y, 2.5, dt);
    camera.position.z = damp(camera.position.z, target.z, 2.5, dt);
    camera.lookAt(0, -p * 1.2, 0);
  });
  return null;
}

/* --------------------------------------------------------------- scene */
export default function Scene() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 1.4, 9], fov: 38, near: 0.1, far: 100 }}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    >
      <color attach="background" args={["#05060a"]} />
      <fog attach="fog" args={["#05060a", 12, 30]} />

      <Suspense fallback={null}>
        <ambientLight intensity={0.25} />
        <directionalLight position={[5, 8, 5]} intensity={1.6} color="#cfe6ff" />
        <pointLight position={[-6, -2, -4]} intensity={30} color="#8b7cff" distance={20} />
        <pointLight position={[6, 2, 3]} intensity={22} color="#7cf5d5" distance={20} />

        <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.6}>
          <Core />
          <Rings />
        </Float>

        <Shards />
        <Monoliths />
        <GridFloor />
        <Sparkles count={140} scale={18} size={2.2} speed={0.3} color="#7cf5d5" opacity={0.7} />

        <Environment resolution={256}>
          <Lightformer
            form="rect"
            intensity={4}
            color="#ffffff"
            position={[0, 6, -6]}
            scale={[14, 6, 1]}
          />
          <Lightformer
            form="circle"
            intensity={6}
            color="#7cf5d5"
            position={[-7, 2, 3]}
            scale={[6, 6, 1]}
          />
          <Lightformer
            form="circle"
            intensity={5}
            color="#8b7cff"
            position={[7, -2, 2]}
            scale={[6, 6, 1]}
          />
          <Lightformer
            form="rect"
            intensity={2}
            color="#ff7a59"
            position={[0, -6, 4]}
            scale={[10, 4, 1]}
          />
        </Environment>

        <EffectComposer enableNormalPass={false}>
          <Bloom
            intensity={0.85}
            luminanceThreshold={0.25}
            luminanceSmoothing={0.5}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.25} darkness={0.9} />
        </EffectComposer>
      </Suspense>

      <Rig />
    </Canvas>
  );
}
