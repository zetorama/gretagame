import { useContext, createContext } from 'react'
import {generateSpots, getMarkerByType} from './helpers'
import {getRndItem} from "./utils";

export const GameContext = createContext([{}])

export const useGameState = () => useContext(GameContext)

export const getInitialGameState = () => ({
  gameResult: null,
  currentTurn: 0,
  currentCO: 66,
  currentPO: 50,
  maxPO: 100,
  maxCO: 100,
  goalCO: 25,
  reduceCO: 5,
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
  console.log('%c ACTION: gameReducer', 'color:crimson', action, state)

  switch (action.type) {
    case 'game:start':
      return {
        ...getInitialGameState(),
        currentTurn: 1,
        spotMap: generateSpots(100)
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
    case 'spot:action':
      const { spot } = action.payload
      const { marker } = spot
      if (marker && marker.nextTypes && marker.requirePO < state.currentPO) {
        const nextMarker = getMarkerByType(getRndItem(marker.nextTypes))
        let nextState = {
          ...state,
          currentPO: state.currentPO - marker.requirePO,
          spotMap: {
            ...state.spotMap,
            [spot.key]: {
              ...spot,
              marker: nextMarker
            }
          }
        }
        return gameReducer(nextState, {type: 'turn:next'})
      }
      return state
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
