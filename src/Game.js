import React, { Suspense, useReducer } from 'react'
import { Canvas } from 'react-three-fiber'

import { gameReducer, GameContext, getInitialGameState } from './game/state'
import Ui from './game/Ui'
import GameWorld from './game/GameWorld'
import Controls from './game/Controls'

function Game() {
  const gameContext = useReducer(gameReducer, getInitialGameState())

  return (
    <GameContext.Provider value={gameContext}>
      <Ui>
        <Canvas>
          {/* 
            NOTE: Canvas makes a new React root, hence we setup context provider twice
            (see: https://github.com/react-spring/react-three-fiber/issues/262)
          */}
          <GameContext.Provider value={gameContext}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <fog attach="fog" args={['#090b1f', 0, 500]} />

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
          </GameContext.Provider>
        </Canvas>
      </Ui>
    </GameContext.Provider>
  )
}

export default Game
