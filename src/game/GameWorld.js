import React, {useRef, useMemo, useEffect} from 'react'
import { useFrame,  useLoader } from 'react-three-fiber'
import * as THREE from 'three'
import {useGameState} from './state'

function GameWorld() {
  const ref = useRef()
  const [state] = useGameState()

  console.log('%c RENDER GameWorld', 'color:orange', state)

  // useFrame(
  //   ({ clock }) =>
  //     (ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z =
  //       Math.cos(clock.getElapsedTime() / 8) * Math.PI / 10)
  // )
  return (

    <group ref={ref}>
      <Stars />
      {/* <rectAreaLight
        intensity={1}
        position={[10, 10, 10]}
        width={10}
        height={1000}
        onUpdate={self => self.lookAt(new THREE.Vector3(0, 0, 0))}
      />
      <rectAreaLight
        intensity={1}
        position={[-10, -10, -10]}
        width={1000}
        height={10}
        onUpdate={self => self.lookAt(new THREE.Vector3(0, 0, 0))}
      /> */}

      <Earth />
      <Moon />
    </group>
  )
}

function Earth({ size = 1.8, position = [0, 0, 0] }) {
  const [texture, bump] = useLoader(THREE.TextureLoader, [
    // '/assets/2k_earth_daymap.jpg',
    '/assets/earth.jpg',
    // '/assets/earth_bump.jpg',
  ])

  return (
    <mesh position={position}>
      <sphereBufferGeometry attach="geometry" args={[size, 64, 64]} />
      <meshStandardMaterial attach="material" map={texture} bumpMap={bump} bumpScale={5} />
    </mesh>
  )
}

function Moon({ size = .66, position = [5, 0, -7] }) {
  const [moon] = useLoader(THREE.TextureLoader, [
    '/assets/2k_moon.jpg',
  ])

  return (
    <mesh position={position}>
      <sphereBufferGeometry attach="geometry" args={[size, 32, 32]} />
      <meshStandardMaterial attach="material" color="gray" map={moon} />
    </mesh>
  )
}

function Stars({ count = 5000 }) {
  const positions = useMemo(() => {
    let positions = []
    for (let i = 0; i < count; i++) {
      positions.push(Math.random() * 10 * (Math.round(Math.random()) ? -40 : 40))
      positions.push(Math.random() * 10 * (Math.round(Math.random()) ? -40 : 40))
      positions.push(Math.random() * 10 * (Math.round(Math.random()) ? -40 : 40))
    }
    return new Float32Array(positions)
  }, [count])
  return (
    <points>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attachObject={['attributes', 'position']}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial attach="material" size={1} sizeAttenuation color="white" transparent opacity={0.8} />
    </points>
  )
}

export default GameWorld
