import * as THREE from 'three'
import React, {useState, useCallback, useRef} from 'react'
import {useFrame, useLoader} from 'react-three-fiber'
import { useSpring, a } from 'react-spring/three'

import { useGameState } from './state'
import {markerTemplates} from './helpers'

function Spot({ dispatch, spot, opacity = 1, scale = 1, ...props }) {
  const [{ currentPO }] = useGameState()

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
      spotKey: spot.key,
    }
  }), [])
  const { factor } = useSpring({ factor: hovered ? 1.5 : 1 })

  const ref = useRef()
  useFrame(() => {
    ref.current.lookAt(0, 0, 0)

    const isEnabled = marker.requirePO >= currentPO
    ref.current.opacity = isEnabled ? 1 : .3
  })

  return (
    <group ref={ref}
      position={spot.position}>
      <a.mesh
        {...props}
        onPointerOver={hover}
        onPointerOut={unhover}
        onPointerDown={actionStart}
        onPointerUp={actionEnd}
        scale={factor.interpolate(f => [scale * f, scale * f, 1])}
        // flip hozintally, as we facing towards planet center
        rotation={[0, -Math.PI, 0]} 
      >
        <planeBufferGeometry attach="geometry" args={[.33, .33]} />
        <meshStandardMaterial attach="material" transparent opacity={opacity} map={texture} side={THREE.DoubleSide} />
      </a.mesh>
    </group>
  )
}

export default Spot