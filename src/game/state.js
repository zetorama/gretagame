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
        gameResult: null,
        currentTurn: 1, 
      }
    case 'turn:next':
      const nextCO = calcNextCO(state.markerMap, state.currentCO)
      return {
        ...state,
        gameResult: nextCO > state.maxCO ? 'boiled' : state.gameResult,
        currentCO: nextCO,
        currentPO: calcNextPO(state.markerMap, state.currentPO),
        currentTurn: state.currentTurn + 1, 
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