// components/FootballModel.jsx
"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function Football() {
  const { scene } = useGLTF("/Football.glb");
  return <primitive object={scene} scale={6.25} />;
}

export default function FootballModel() {
  return (
    <Canvas style={{ height: "100%", width: "100%" }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={2} />
      <Football />
      <OrbitControls autoRotate />
    </Canvas>
  );
}
