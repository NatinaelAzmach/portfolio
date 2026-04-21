import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Float, Stars } from '@react-three/drei'
import * as THREE from 'three'

/** Single animated geometric shape */
function Shape({
  position,
  geometry,
  color,
  speed,
}: {
  position: [number, number, number]
  geometry: 'sphere' | 'torus' | 'octahedron' | 'box'
  color: string
  speed: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = clock.getElapsedTime() * speed * 0.3
    meshRef.current.rotation.y = clock.getElapsedTime() * speed * 0.5
  })

  const geo = useMemo(() => {
    switch (geometry) {
      case 'sphere': return <sphereGeometry args={[1, 32, 32]} />
      case 'torus': return <torusGeometry args={[1, 0.4, 16, 32]} />
      case 'octahedron': return <octahedronGeometry args={[1]} />
      case 'box': return <boxGeometry args={[1.5, 1.5, 1.5]} />
    }
  }, [geometry])

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        {geo}
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.7}
          wireframe={geometry === 'box'}
        />
      </mesh>
    </Float>
  )
}

/** Particle system that reacts to mouse */
function Particles({ count = 200 }: { count?: number }) {
  const points = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return arr
  }, [count])

  useFrame(({ clock }) => {
    if (points.current) {
      points.current.rotation.y = clock.getElapsedTime() * 0.02
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#6366f1" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

/** Full 3D hero background scene */
export function FloatingShapes() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{ position: 'absolute', inset: 0 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#6366f1" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />

      <Shape position={[-4, 2, -2]} geometry="sphere" color="#6366f1" speed={0.5} />
      <Shape position={[4, -1, -3]} geometry="torus" color="#06b6d4" speed={0.3} />
      <Shape position={[2, 3, -4]} geometry="octahedron" color="#8b5cf6" speed={0.7} />
      <Shape position={[-3, -2, -2]} geometry="box" color="#6366f1" speed={0.4} />

      <Particles count={150} />
      <Stars radius={50} depth={50} count={1000} factor={2} fade speed={0.5} />
    </Canvas>
  )
}
