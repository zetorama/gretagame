import React, { Suspense } from 'react'
import { Canvas } from 'react-three-fiber'

import { GameStateProvider } from './game/state'
import Ui from './game/Ui'
import Planet from './game/Planet'

function Game() {
  return (
    <GameStateProvider>
      <Ui>
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />

          <Suspense fallback={null}>
            <Planet position={[0, 0, 0]} />
          </Suspense>
        </Canvas>
      </Ui>
    </GameStateProvider>
  )
}

export default Game
