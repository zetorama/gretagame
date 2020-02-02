import React, { useReducer, useContext, createContext } from 'react'

export const GameContext = createContext(null)

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
  currentMarkerKey: null,
  markerMap: {}
})

export const getInitialMarker = () => ({
  type: '',
  produceCO: 0,
  producePO: 0,
  requirePO: 0
})

export const gameReducer = (state, action) => {
  switch (action.type) {
    case 'game:start': 
      return {
        ...getInitialGameState(),
        currentTurn: 1,
        markerMap: generateInitialMarkers()
      }
    case 'turn:next':
      const nextTurn = state.currentTurn + 1
      const nextCO = calcNextCO(state.markerMap, state.currentCO)
      const nextPO = calcNextPO(state.markerMap, state.currentPO)
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
const calcNextCO = (markerMap, currentCO) => {
  return Object.values(markerMap).reduce((acc, marker) => acc + marker.produceCO, currentCO)
}

const calcNextPO = (markerMap, currentPO) => {
  return Object.values(markerMap).reduce((acc, marker) => acc + marker.producePO, currentPO)
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

const generateInitialMarkers = (amount = 10) => {

}