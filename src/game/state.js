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
  currentTurn: 0,
})

export const gameReducer = (state, action) => {
  switch (action.type) {
    case 'game:start': 
      return {
        currentTurn: 1, 
      }
    case 'turn:next':
      return { 
        ...state, 
        currentTurn: state.currentTurn + 1, 
      }
    default: throw new Error()
  }
}