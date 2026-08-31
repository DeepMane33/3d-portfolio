import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, Float } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

function Shape({ shape, accent }: { shape: string; accent: string }) {
  const m = useRef<THREE.Mesh>(null!);
  useFrame((state, dt) => {
    m.current.rotation.y += dt * 0.35;
    m.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.35;
  });

  const geo =
    shape === "torus" ? (
      <torusGeometry args={[1, 0.38, 48, 140]} />
    ) : shape === "box" ? (
      <boxGeometry args={[1.5, 1.5, 1.5, 4, 4, 4]} />
    ) : (
      <torusKnotGeometry args={[0.85, 0.3, 180, 32]} />
    );

  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={1.1}>
      <mesh ref={m}>
        {geo}
        <meshStandardMaterial
          color="#1a1e28"
          metalness={1}
          roughness={0.16}
          envMapIntensity={1.8}
        />
      </mesh>
      <mesh scale={1.06}>
        {geo}
        <meshBasicMaterial color={accent} wireframe transparent opacity={0.18} />
      </mesh>
    </Float>
  );
}

export default function ProjectVisual({
  shape,
  accent,
}: {
  shape: string;
  accent: string;
}) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4.2], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 4, 3]} intensity={2} />
        <pointLight position={[-3, -2, 2]} intensity={14} color={accent} />
        <Shape shape={shape} accent={accent} />
        <Environment resolution={128}>
          <Lightformer form="rect" intensity={4} position={[0, 4, -4]} scale={[8, 4, 1]} />
          <Lightformer
            form="circle"
            intensity={5}
            color={accent}
            position={[-4, 1, 2]}
            scale={[4, 4, 1]}
          />
          <Lightformer
            form="circle"
            intensity={3}
            color="#ffffff"
            position={[4, -1, 2]}
            scale={[4, 4, 1]}
          />
        </Environment>
      </Suspense>
    </Canvas>
  );
}
