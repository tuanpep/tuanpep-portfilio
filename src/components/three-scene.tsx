"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera, Text } from "@react-three/drei";
import * as THREE from "three";

export function ThreeScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas>
        <color attach="background" args={["transparent"]} />
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <fog attach="fog" args={["#000", 5, 20]} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <spotLight
          position={[0, 5, 5]}
          intensity={0.6}
          color="#9c51ff"
          angle={0.3}
          penumbra={0.5}
        />
        <CryptoSymbols />
        <HexagonGrid />
        <ParticleNetwork />
      </Canvas>
    </div>
  );
}

function HexagonGrid() {
  const groupRef = useRef<THREE.Group>(null);
  const hexagons = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 20; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 10 - 5,
        ],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ],
        scale: 0.2 + Math.random() * 0.3,
      });
    }
    return temp;
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {hexagons.map((hexagon, i) => (
        <mesh
          key={i}
          position={hexagon.position as [number, number, number]}
          rotation={hexagon.rotation as [number, number, number]}
          scale={hexagon.scale}
        >
          <cylinderGeometry args={[1, 1, 0.1, 6]} />
          <meshStandardMaterial
            color="#4c6ef5"
            transparent
            opacity={0.2}
            wireframe
            roughness={0.5}
            metalness={0.8}
            emissive="#4c6ef5"
            emissiveIntensity={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

function CryptoSymbols() {
  const symbols = useMemo(() => {
    return [
      { symbol: "ETH", color: "#62a9ff", position: [-2, 1, -2] },
      { symbol: "SOL", color: "#9945ff", position: [2, -1, -3] },
      { symbol: "BTC", color: "#f7931a", position: [1, 2, -4] },
    ];
  }, []);

  return (
    <>
      {symbols.map((item, index) => (
        <Float
          key={index}
          speed={2}
          rotationIntensity={0.4}
          floatIntensity={0.4}
        >
          <Text
            font="/fonts/Inter-Bold.woff"
            position={item.position as [number, number, number]}
            fontSize={0.5}
            color={item.color}
            anchorX="center"
            anchorY="middle"
          >
            {item.symbol}
          </Text>
        </Float>
      ))}
    </>
  );
}

function ParticleNetwork() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 200;

  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 15;
      positions[i3 + 1] = (Math.random() - 0.5) * 15;
      positions[i3 + 2] = (Math.random() - 0.5) * 15 - 5;
      sizes[i] = Math.random() * 0.5 + 0.1;
    }

    return { positions, sizes };
  }, [particleCount]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;

    const time = clock.getElapsedTime() * 0.1;
    const positionAttribute = pointsRef.current.geometry.attributes.position;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positionAttribute.array[i3 + 1] += Math.sin(time + i * 0.1) * 0.01;
    }

    positionAttribute.needsUpdate = true;
    pointsRef.current.rotation.y += 0.001;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={particleCount}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          array={sizes}
          count={particleCount}
          itemSize={1}
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        sizeAttenuation
        transparent
        opacity={0.8}
        color="#9c51ff"
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
