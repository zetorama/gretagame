import React, { Suspense } from 'react'
import { Canvas, extend } from 'react-three-fiber'

import { GameStateProvider } from './game/state'
import Ui from './game/Ui'
import GameWorld from './game/GameWorld'
import Controls from './game/Controls'

function Game() {
  return (
    <GameStateProvider>
      <Ui>
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />

          <Suspense fallback={null}>
            <GameWorld position={[0, 0, 0]} />
          </Suspense>
          <Controls
              enablePan={false}
              enableZoom={false}
              enableDamping
              dampingFactor={0.05}
              rotateSpeed={1}
              minPolarAngle={Math.PI * 0.25}
              maxPolarAngle={Math.PI * 0.75}
          />
        </Canvas>
      </Ui>
    </GameStateProvider>
  )
}

export default Game
