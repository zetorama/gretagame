import * as THREE from 'three'
import React, {useState, useCallback, useRef} from 'react'
import {useFrame, useLoader} from 'react-three-fiber'
import { useSpring, a } from 'react-spring/three'
import {markerTemplates} from './helpers'

function Spot({ dispatch, spot, opacity = 1, scale = 0.5, ...props }) {
  const marker = spot.marker
  const [texture] = useLoader(THREE.TextureLoader, [markerTemplates[marker.type].iconUrl])
  const [hovered, setHover] = useState(false)
  const hover = useCallback(() => setHover(true), [])
  const unhover = useCallback(() => setHover(false), [])
  const actionStart = useCallback(() => {

  }, [])
  const actionEnd = useCallback(() => dispatch({
    type: 'spot:action',
    payload: {
      spot
    }
  }), [])
  const { factor } = useSpring({ factor: hovered ? 1.5 : 1 })

  const ref = useRef()
  useFrame(() => {
    ref.current.lookAt(0, 0, 0)
  })

  return (
      <group>
        <a.mesh
          ref={ref}
          {...props}
          position={spot.position}
          onPointerOver={hover}
          onPointerOut={unhover}
          onPointerDown={actionStart}
          onPointerUp={actionEnd}
          scale={factor.interpolate(f => [scale * f, scale * f, 1])}
        >
          <planeBufferGeometry attach="geometry" args={[.5, .5]} />
          <meshStandardMaterial attach="material" transparent opacity={opacity} map={texture} side={THREE.DoubleSide} />
        </a.mesh>
      </group>
  )
}

export default Spot