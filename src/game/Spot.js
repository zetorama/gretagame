import * as THREE from 'three'
import React, {useState, useCallback, useRef} from 'react'
import {useFrame, useLoader} from 'react-three-fiber'
import { useSpring, a } from 'react-spring/three'
import {markerTemplates} from './helpers'

function Spot({ spot, opacity = 1, scale = 0.5, ...props }) {
  const marker = spot.marker
  const [texture] = useLoader(THREE.TextureLoader, [markerTemplates[marker.type].iconUrl])
  const [hovered, setHover] = useState(false)
  const hover = useCallback(() => setHover(true), [])
  const unhover = useCallback(() => setHover(false), [])
  const { factor } = useSpring({ factor: hovered ? 1.5 : 1 })

  const ref = useRef()
  useFrame(() => {
    ref.current.lookAt(0, 0, 0)
  })

  return (
    <a.mesh
      ref={ref}
      {...props}
      position={spot.position}
      onPointerOver={hover}
      onPointerOut={unhover}
      scale={factor.interpolate(f => [scale * f, scale * f, 1])}
    >
      <planeBufferGeometry attach="geometry" args={[.5, .5]} />
      <meshStandardMaterial attach="material" transparent opacity={opacity} map={texture} side={THREE.DoubleSide} />
    </a.mesh>
  )
}

export default Spot