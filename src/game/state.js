import { useContext, createContext } from 'react'
import {generateSpots, getMarkerByType, markerTemplates} from './helpers'
import {getRndItem} from "./utils";

export const SPOTS_INITIAL_N = 20

export const GameContext = createContext([{}])

export const useGameState = () => useContext(GameContext)

export const getInitialGameState = () => ({
  gameResult: null,
  currentTurn: 0,

  maxPO: 100,
  currentPO: 50,

  currentCO: 500,
  maxCO: 1000,
  goalCO: 220,
  reduceCO: 200,

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
        spotMap: generateSpots(SPOTS_INITIAL_N),
      }

    case 'turn:next':
      if (state.gameResult) {
        return state
      }
      const nextTurn = state.currentTurn + 1
      const nextCO = calcNextCO(state.spotMap, state.currentCO) - state.reduceCO
      const nextPO = calcNextPO(state.spotMap, state.currentPO)
      const nextGameResult = calcNextGameResult(state, nextCO)

      return {
        ...state,
        gameResult: nextGameResult,
        // planet reduces less and less
        reduceCO: Math.max(0, state.reduceCO - 10),
        currentCO: Math.max(0, Math.min(state.maxCO, nextCO)),
        currentPO: Math.max(0, Math.min(state.maxPO, nextPO)),
        currentTurn: nextTurn,
      }

    case 'spot:action':
      if (state.gameResult) {
        return state
      }
      const spot = state.spotMap[action.payload.spotKey]
      const { marker } = spot
      if (!marker) throw new Error('WAT? No marker in spot, eh?')
      if (!marker.requirePO || marker.requirePO > state.currentPO) {
        // Cannot interact with this marker — the debt must be payed
        return state
      }

      const { nextTypes } = markerTemplates[marker.type]
      const nextMarker = nextTypes && getMarkerByType(getRndItem(nextTypes))
      const spotMap = { ...state.spotMap }
      const currentPO = Math.min(state.maxPO, state.currentPO - marker.requirePO)
        
      if (nextMarker) {
        spotMap[spot.key] = {
          ...spot,
          marker: nextMarker
        }
      } else {
        delete spotMap[spot.key]
      }

      return gameReducer({ ...state, spotMap, currentPO }, {type: 'turn:next'})

    default: throw new Error('OMG! Unknown action…')
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
