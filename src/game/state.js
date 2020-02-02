import React, { useReducer, useContext, createContext } from 'react'
import { generateSpots } from './helpers'

export const GameContext = createContext([{}])

export const useGameState = () => useContext(GameContext)

export const GameStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, getInitialGameState())

  return (
    <GameContext.Provider value={[state, dispatch]}>
      {children}
    </GameContext.Provider>
  )
}

export const getInitialGameState = () => ({
  gameResult: null,
  currentTurn: 0,
  currentCO: 0,
  currentPO: 0,
  maxCO: 100,
  maxTurn: 20,
  currentSpotKey: null,
  spotMap: {}
})

export const getInitialMarker = () => ({
  type: '',
  produceCO: 0,
  producePO: 0,
  requirePO: 0,
})

export const gameReducer = (state, action) => {
  console.log('Reducer -----------')
  switch (action.type) {
    case 'game:start':
      console.log(generateSpots(3))
      return {
        ...getInitialGameState(),
        currentTurn: 1,
        spotMap: generateSpots(3)
      }
    case 'turn:next':
      const nextTurn = state.currentTurn + 1
      const nextCO = calcNextCO(state.spotMap, state.currentCO)
      const nextPO = calcNextPO(state.spotMap, state.currentPO)
      const nextGameResult = calcNextGameResult(state, nextCO)
      return {
        ...state,
        gameResult: nextGameResult,
        currentCO: nextCO,
        currentPO: nextPO,
        currentTurn: nextTurn,
      }
    default: throw new Error()
  }
}

//Game logic
const calcNextCO = (spotMap, currentCO) => {
  return Object.values(spotMap)
      .filter(spot => spot.marker)
      .map(spot => spot.marker)
      .reduce((acc, marker) => acc + marker.produceCO, currentCO)
}

const calcNextPO = (spotMap, currentPO) => {
  return Object.values(spotMap)
      .filter(spot => spot.marker)
      .map(spot => spot.marker)
      .reduce((acc, marker) => acc + marker.producePO, currentPO)
}

const calcNextGameResult = (state, nextCO, nextTurn) => {
  if (state.gameResult === null) {
    if (nextCO > state.maxCO) {
      return 'boiled'
    } else if (nextTurn > state.maxTurn) {
      return 'you did it'
    }
  }

  return state.gameResult
}
