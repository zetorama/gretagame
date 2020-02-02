import React, { Suspense } from 'react'
import { Canvas } from 'react-three-fiber'

import Planet from './game/Planet'

function Game() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />

      <Suspense fallback={null}>
        <Planet position={[0, 0, 0]} />
      </Suspense>
    </Canvas>
  )
}

export default Game
