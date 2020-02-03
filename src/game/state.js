import { useContext, createContext } from 'react'
import {generateSpots, getMarkerByType, markerTemplates} from './helpers'
import {getRndItem} from "./utils";

export const GameContext = createContext([{}])

export const useGameState = () => useContext(GameContext)

export const getInitialGameState = () => ({
  gameResult: null,
  currentTurn: 0,

  maxPO: 100,
  currentPO: 30,

  currentCO: 666,
  maxCO: 1000,
  goalCO: 150,
  reduceCO: 50,

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
      if (state.gameResult) {
        return state
      }
      const nextTurn = state.currentTurn + 1
      const nextCO = calcNextCO(state.spotMap, state.currentCO)
      const nextPO = calcNextPO(state.spotMap, state.currentPO)
      const nextGameResult = calcNextGameResult(state, nextCO)
      return {
        ...state,
        gameResult: nextGameResult,
        currentCO: nextCO,
        currentPO: Math.min(state.maxPO, nextPO),
        currentTurn: nextTurn,
      }
    case 'spot:action':
      if (state.gameResult) {
        return state
      }
      const { spot } = action.payload
      const { marker } = spot
      if (marker && marker.requirePO < state.currentPO) {
        const { nextTypes } = markerTemplates[marker.type]
        const nextMarker = nextTypes && getMarkerByType(getRndItem(nextTypes))
        const spotMap = { ...state.spotMap }
        
        if (nextMarker) {
          spotMap[spot.key] = {
            ...spot,
            marker: nextMarker
          }
        } else {
          delete spotMap[spot.key]
        }


        let nextState = {
          ...state,
          spotMap,
          currentPO: Math.min(state.maxPO, state.currentPO - marker.requirePO),
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
