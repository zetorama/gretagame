import * as THREE from 'three'
import React, {useState, useCallback, useRef} from 'react'
import {useFrame, useLoader} from 'react-three-fiber'
import {markerTemplates} from './helpers'

function Spot({ spot, opacity = 1, scale = 0.5, ...props }) {
  console.log(spot, '------------spot')
  const marker = spot.marker
  const [texture] = useLoader(THREE.TextureLoader, [markerTemplates[marker.type].iconUrl])
  const [hovered, setHover] = useState(false)
  // const hover = useCallback(() => setHover(true), [])
  // const unhover = useCallback(() => setHover(false), [])
  // const { factor } = useSpring({ factor: hovered ? 1.1 : 1 })
  const toggleHover = useCallback(() => setHover(val => !val))
  const ref = useRef()
  useFrame(() => {
    ref.current.lookAt(0, 0, 0)
  })
  const size = scale * (hovered ? 2 : 1)
  return (
    <mesh ref={ref}
      {...props}
      position={spot.position}
      // onPointerOver={hover}
      // onPointerOut={unhover}
      onClick={toggleHover}
      scale={[size, size, 1]}
    >
      <planeBufferGeometry attach="geometry" args={[.5, .5]} />
      <meshStandardMaterial attach="material" transparent opacity={opacity} map={texture} side={THREE.DoubleSide} />
    </mesh>
  )
}

export default Spot