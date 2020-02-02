import React, {useRef, useMemo, useState, useCallback} from 'react'
import { useFrame,  useLoader } from 'react-three-fiber'
import * as THREE from 'three'
import {useGameState} from './state'

import Spot from './Spot'

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

      <Atmosphere />
      <Spot
        url='/assets/fire.png'
        scale={.5}
        position={[0,0, 2.2]}
        // rotation={[]}
      />

      <Earth />
      <Moon />
    </group>
  )
}

function Atmosphere({ size = 2.1, speed = 1, position = [0, 0, 0], segments = 64 }) {
  const refOne = useRef()
  const refTwo = useRef()
  const [textureOne, textureTwo] = useLoader(THREE.TextureLoader, [
    '/assets/clouds_one.png',
    '/assets/clouds_two.png',
  ])

  useFrame(
    ({ clock }) => {
      refOne.current.rotation.y = Math.cos(clock.getElapsedTime() / 12) * Math.PI * speed
      refTwo.current.rotation.y = -1.2 * Math.cos(clock.getElapsedTime() / 12) * Math.PI * speed
    }
  )

  return (
    <>
      <mesh position={position} ref={refOne}>
        <sphereBufferGeometry attach="geometry" args={[size, segments, segments]} />
        <meshStandardMaterial attach="material" map={textureOne} transparent />
      </mesh>
      <mesh position={position} ref={refTwo}>
        <sphereBufferGeometry attach="geometry" args={[size * 1.01, segments, segments]} />
        <meshStandardMaterial attach="material" map={textureTwo} transparent />
      </mesh>
    </>
  )
}

function Earth({ size = 2, position = [0, 0, 0], segments = 64 }) {
  const [texture, bump] = useLoader(THREE.TextureLoader, [
    // '/assets/2k_earth_daymap.jpg',
    '/assets/earth.jpg',
    // '/assets/earth_bump.jpg',
  ])

  return (
    <mesh position={position}>
      <sphereBufferGeometry attach="geometry" args={[size, segments, segments]} />
      <meshStandardMaterial attach="material" map={texture} bumpMap={bump} bumpScale={5} />
    </mesh>
  )
}

function Moon({ size = .66, position = [5, 0, -7], segments = 32 }) {
  const [moon] = useLoader(THREE.TextureLoader, [
    '/assets/2k_moon.jpg',
  ])

  return (
    <mesh position={position}>
      <sphereBufferGeometry attach="geometry" args={[size, segments, segments]} />
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
