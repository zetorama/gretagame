import { getInitialMarker } from './state'
import {calcPosFromLatLonRad, getRndInRange, getRndItem, getRndItems} from './utils'

export const DeadlyCow = 'cow'
export const BeyondMeat = 'beyond-meat'

export const GasCar = 'gas-car'
export const ElectricCar = 'electric-car'

export const Garbage = 'garbage'
export const Recycle = 'recycle'

export const ForestFire = 'forest-fire'
export const PlantForest = 'plant-forest'

export const OceanPollution = 'ocean-pollution'
export const Algae = 'algae'

export const FossilFuel = 'fossil-fuel'
export const RenewableEnergy = 'renewable-energy'

export const DisasterTypes = [DeadlyCow, GasCar, Garbage, ForestFire, OceanPollution, FossilFuel]

export const markerTemplates = {
    [DeadlyCow]: {
        minProduceCO: 0,
        maxProduceCO: 100,
        minProducePO: 0,
        maxProducePO: 100,
        minRequirePO: 0,
        maxRequirePO: 100,
        nextTypes: [BeyondMeat],
        iconUrl: '/assets/fire.png',
    },
    [BeyondMeat]: {
        minProduceCO: 0,
        maxProduceCO: 100,
        minProducePO: 0,
        maxProducePO: 100,
        minRequirePO: 0,
        maxRequirePO: 100,
        iconUrl: '/assets/fire.png',
    },
    [GasCar]: {
        minProduceCO: 0,
        maxProduceCO: 100,
        minProducePO: 0,
        maxProducePO: 100,
        minRequirePO: 0,
        maxRequirePO: 100,
        nextTypes: [ElectricCar],
        iconUrl: '/assets/fire.png',
    },
    [ElectricCar]: {
        minProduceCO: 0,
        maxProduceCO: 100,
        minProducePO: 0,
        maxProducePO: 100,
        minRequirePO: 0,
        maxRequirePO: 100,
        iconUrl: '/assets/fire.png',
    },
    [Garbage]: {
        minProduceCO: 0,
        maxProduceCO: 100,
        minProducePO: 0,
        maxProducePO: 100,
        minRequirePO: 0,
        maxRequirePO: 100,
        nextTypes: [Recycle],
        iconUrl: '/assets/fire.png',
    },
    [Recycle]: {
        minProduceCO: 0,
        maxProduceCO: 100,
        minProducePO: 0,
        maxProducePO: 100,
        minRequirePO: 0,
        maxRequirePO: 100,
        iconUrl: '/assets/fire.png',
    },
    [ForestFire]: {
        minProduceCO: 0,
        maxProduceCO: 100,
        minProducePO: 0,
        maxProducePO: 100,
        minRequirePO: 0,
        maxRequirePO: 100,
        nextTypes: [PlantForest],
        iconUrl: '/assets/fire.png',
    },
    [PlantForest]: {
        minProduceCO: 0,
        maxProduceCO: 100,
        minProducePO: 0,
        maxProducePO: 100,
        minRequirePO: 0,
        maxRequirePO: 100,
        iconUrl: '/assets/fire.png',
    },
    [OceanPollution]: {
        minProduceCO: 0,
        maxProduceCO: 100,
        minProducePO: 0,
        maxProducePO: 100,
        minRequirePO: 0,
        maxRequirePO: 100,
        nextTypes: [Algae],
        iconUrl: '/assets/fire.png',
    },
    [Algae]: {
        minProduceCO: 0,
        maxProduceCO: 100,
        minProducePO: 0,
        maxProducePO: 100,
        minRequirePO: 0,
        maxRequirePO: 100,
        iconUrl: '/assets/fire.png',
    },
    [FossilFuel]: {
        minProduceCO: 0,
        maxProduceCO: 100,
        minProducePO: 0,
        maxProducePO: 100,
        minRequirePO: 0,
        maxRequirePO: 100,
        nextTypes: [RenewableEnergy],
        iconUrl: '/assets/fire.png',
    },
    [RenewableEnergy]: {
        minProduceCO: 0,
        maxProduceCO: 100,
        minProducePO: 0,
        maxProducePO: 100,
        minRequirePO: 0,
        maxRequirePO: 100,
        iconUrl: '/assets/fire.png',
    },
}

let keyId = 0
export const spotTemplates = [
    {
        key: `spot-${++keyId}`,
        lonLatPos: [31.472538, -100.299904], // texas
        initialMarkerTypes: [DeadlyCow]
    },
    {
        
        key: `spot-${++keyId}`,
        lonLatPos: [45.661794, -67.065206],
        initialMarkerTypes: [GasCar]
    },
    {
        
        key: `spot-${++keyId}`,
        lonLatPos: [-7.228798, -55.275538],
        initialMarkerTypes: DisasterTypes
    },
    {
        
        key: `spot-${++keyId}`,
        lonLatPos: [-32.044593, 23.127417],
        initialMarkerTypes: DisasterTypes
    },
    {
        
        key: `spot-${++keyId}`,
        lonLatPos: [1.809734, 25.423265],
        initialMarkerTypes: DisasterTypes
    },
    {
        
        key: `spot-${++keyId}`,
        lonLatPos: [48.953031, 7.235110],
        initialMarkerTypes: DisasterTypes
    },
    {
        
        key: `spot-${++keyId}`,
        lonLatPos: [31.547828, 107.503918],
        initialMarkerTypes: DisasterTypes
    },
    {
        
        key: `spot-${++keyId}`,
        lonLatPos: [58.063062, 45.403104],
        initialMarkerTypes: DisasterTypes
    }
]

export const getMarkerByType = (type = ForestFire) => {
    const template = markerTemplates[type]
    if (!template) {
        throw new Error('Unknown template')
    }

    return {
        ...getInitialMarker(),
        type,
        produceCO: getRndInRange(template.minProduceCO, template.maxProduceCO),
        producePO: getRndInRange(template.minProducePO, template.maxProducePO),
        requirePO: getRndInRange(template.minRequirePO, template.maxRequirePO),
    }
}

export const getSpotFromTemplate = (template) => {
    const position = calcPosFromLatLonRad(template.lonLatPos[0], template.lonLatPos[1])
    return {
        ...template,
        marker: getMarkerByType(getRndItem(template.initialMarkerTypes)),
        position
    }
}

export const generateSpots = (amount = 10) => {
    return getRndItems(spotTemplates, amount)
        .map(spotTemplate => getSpotFromTemplate(spotTemplate))
        .reduce((acc, spot, ind) => {
            acc[spot.key] = spot
            return acc
        }, {})
}