import * as THREE from 'three'
import React, {useState, useCallback, useRef} from 'react'
import {useFrame, useLoader, useUpdate} from 'react-three-fiber'
import { useSpring, a } from 'react-spring/three'

import { useGameState } from './state'
import {markerTemplates} from './helpers'

export const WAIT_TO_ACTIVATE_MS = 600

function Spot({ dispatch, spot, opacity = 1, scale = 1, ...props }) {
  const [{ currentPO }] = useGameState()

  const marker = spot.marker

  const [texture] = useLoader(THREE.TextureLoader, [markerTemplates[marker.type].iconUrl])
  const [hovered, setHover] = useState(false)
  const actionRef = useRef(null)
  const hover = useCallback(() => setHover(true), [])
  const unhover = useCallback(() => {
    setHover(false)
    actionRef.current = null
  }, [])
  const actionStart = useCallback(() => {
    actionRef.current = Date.now()
  }, [])
  const actionEnd = useCallback(() => {
    if (actionRef.current && ((Date.now() - actionRef.current) >= WAIT_TO_ACTIVATE_MS)) {
      dispatch({
        type: 'spot:action',
        payload: {
          spotKey: spot.key,
        }
      })
    }
    actionRef.current = null
  }, [])
  const { factor } = useSpring({ factor: marker.requirePO && hovered ? 1.5 : 1 })
  const materialRef = useRef()
  const groupRef = useUpdate(() => {
    groupRef.current.lookAt(0, 0, 0)
  }, [])
  
  useFrame(() => {
    const isEnabled = marker.requirePO <= currentPO
    materialRef.current.opacity = isEnabled ? 1 : .33
  })

  return (
    <group 
      ref={groupRef}
      position={spot.position}
    >
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
        <meshStandardMaterial ref={materialRef} attach="material" transparent opacity={opacity} map={texture} side={THREE.DoubleSide} />
      </a.mesh>
    </group>
  )
}

export default Spot