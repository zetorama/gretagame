import { getInitialMarker } from './state'
import {getRndInRange, getRndItem, getRndItems} from './utils'

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
    DeadlyCow: {
        minProduceCO: 0,
        maxProduceCO: 100,
        minProducePO: 0,
        maxProducePO: 100,
        minRequirePO: 0,
        maxRequirePO: 100,
        nextTypes: [BeyondMeat]
    },
    BeyondMeat: {
        minProduceCO: 0,
        maxProduceCO: 100,
        minProducePO: 0,
        maxProducePO: 100,
        minRequirePO: 0,
        maxRequirePO: 100,
    },
    GasCar: {
        minProduceCO: 0,
        maxProduceCO: 100,
        minProducePO: 0,
        maxProducePO: 100,
        minRequirePO: 0,
        maxRequirePO: 100,
        nextTypes: [ElectricCar]
    },
    ElectricCar: {
        minProduceCO: 0,
        maxProduceCO: 100,
        minProducePO: 0,
        maxProducePO: 100,
        minRequirePO: 0,
        maxRequirePO: 100,
    },
    Garbage: {
        minProduceCO: 0,
        maxProduceCO: 100,
        minProducePO: 0,
        maxProducePO: 100,
        minRequirePO: 0,
        maxRequirePO: 100,
        nextTypes: [Recycle]
    },
    Recycle: {
        minProduceCO: 0,
        maxProduceCO: 100,
        minProducePO: 0,
        maxProducePO: 100,
        minRequirePO: 0,
        maxRequirePO: 100,
    },
    ForestFire: {
        minProduceCO: 0,
        maxProduceCO: 100,
        minProducePO: 0,
        maxProducePO: 100,
        minRequirePO: 0,
        maxRequirePO: 100,
        nextTypes: [PlantForest]
    },
    PlantForest: {
        minProduceCO: 0,
        maxProduceCO: 100,
        minProducePO: 0,
        maxProducePO: 100,
        minRequirePO: 0,
        maxRequirePO: 100,
    },
    OceanPollution: {
        minProduceCO: 0,
        maxProduceCO: 100,
        minProducePO: 0,
        maxProducePO: 100,
        minRequirePO: 0,
        maxRequirePO: 100,
        nextTypes: [Algae]
    },
    Algae: {
        minProduceCO: 0,
        maxProduceCO: 100,
        minProducePO: 0,
        maxProducePO: 100,
        minRequirePO: 0,
        maxRequirePO: 100,
    },
    FossilFuel: {
        minProduceCO: 0,
        maxProduceCO: 100,
        minProducePO: 0,
        maxProducePO: 100,
        minRequirePO: 0,
        maxRequirePO: 100,
        nextTypes: [RenewableEnergy]
    },
    RenewableEnergy: {
        minProduceCO: 0,
        maxProduceCO: 100,
        minProducePO: 0,
        maxProducePO: 100,
        minRequirePO: 0,
        maxRequirePO: 100,
    },
}

export const spotTemplates = [
    {
        key: 1,
        position: [0, 0, 0],
        initialMarkerTypes: DisasterTypes
    },
    {
        key: 2,
        position: [0, 0, 0],
        initialMarkerTypes: DisasterTypes
    },
    {
        key: 3,
        position: [0, 0, 0],
        initialMarkerTypes: DisasterTypes
    },
    {
        key: 4,
        position: [0, 0, 0],
        initialMarkerTypes: DisasterTypes
    },
    {
        key: 5,
        position: [0, 0, 0],
        initialMarkerTypes: DisasterTypes
    },
    {
        key: 6,
        position: [0, 0, 0],
        initialMarkerTypes: DisasterTypes
    },
    {
        key: 7,
        position: [0, 0, 0],
        initialMarkerTypes: DisasterTypes
    },
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
    return {
        ...template,
        marker: getMarkerByType(getRndItem(template.initialMarkerTypes))
    }
}

export const generateSpots = (amount = 10) => {
    return getRndItems(spotTemplates, amount)
        .map(spotTemplate => getSpotFromTemplate(spotTemplate))
        .reduce((acc, spot, ind) => acc[ind] = spot, {})
}