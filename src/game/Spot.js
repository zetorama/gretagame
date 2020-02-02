import * as THREE from 'three'
import React, { useState, useCallback } from 'react'
import { useLoader } from 'react-three-fiber'

function Spot({ url, opacity = 1, scale = 1, ...props }) {
  const [texture] = useLoader(THREE.TextureLoader, [url])
  const [hovered, setHover] = useState(false)
  // const hover = useCallback(() => setHover(true), [])
  // const unhover = useCallback(() => setHover(false), [])
  // const { factor } = useSpring({ factor: hovered ? 1.1 : 1 })
  const toggleHover = useCallback(() => setHover(val => !val))

  const size = scale * (hovered ? 2 : 1)
  return (
    <mesh
      {...props}
      // onPointerOver={hover}
      // onPointerOut={unhover}
      onClick={toggleHover}
      scale={[size, size, 1]}
    >
      <planeBufferGeometry attach="geometry" args={[.5, .5]} />
      <meshStandardMaterial attach="material" transparent opacity={opacity} map={texture} />
    </mesh>
  )
}

export default Spot