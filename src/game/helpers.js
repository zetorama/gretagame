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
export const PlantForestDone = 'plant-forest-done'

export const OceanPollution = 'ocean-pollution'
export const Algae = 'algae'

export const FossilFuel = 'fossil-fuel'
export const RenewableEnergy = 'renewable-energy'

export const DisasterTypes = [DeadlyCow, GasCar, Garbage, ForestFire, OceanPollution, FossilFuel]

export const markerTemplates = {
    [DeadlyCow]: {
        minProduceCO: 20,
        maxProduceCO: 40,
        minProducePO: 1,
        maxProducePO: 3,

        minRequirePO: 50,
        maxRequirePO: 80,

        nextTypes: [BeyondMeat],
        iconUrl: '/assets/cow.png',
    },
    [BeyondMeat]: {
        minProduceCO: 0,
        maxProduceCO: 0,
        minProducePO: 1,
        maxProducePO: 2,
        // minRequirePO: 50,
        // maxRequirePO: 80,
        iconUrl: '/assets/wheat.png',
    },

    [GasCar]: {
        minProduceCO: 5,
        maxProduceCO: 10,
        minProducePO: 2,
        maxProducePO: 5,

        minRequirePO: 5,
        maxRequirePO: 25,
        nextTypes: [ElectricCar],
        iconUrl: '/assets/gascar.png',
    },
    [ElectricCar]: {
        minProduceCO: 0,
        maxProduceCO: 0,
        minProducePO: 1,
        maxProducePO: 2,
        // minRequirePO: 50,
        // maxRequirePO: 80,
        iconUrl: '/assets/electrocar.png',
    },

    [ForestFire]: {
        minProduceCO: 3,
        maxProduceCO: 15,
        minProducePO: 3,
        maxProducePO: 10,
        minRequirePO: 20,
        maxRequirePO: 60,
        nextTypes: [PlantForest],
        iconUrl: '/assets/fire.png',
    },
    [PlantForest]: {
        minProduceCO: 0,
        maxProduceCO: 0,
        minProducePO: 2,
        maxProducePO: 5,
        minRequirePO: 20,
        maxRequirePO: 60,
        nextTypes: [PlantForestDone],
        iconUrl: '/assets/trees.png',
    },
    [PlantForestDone]: {
        minProduceCO: 0,
        maxProduceCO: 0,
        minProducePO: 2,
        maxProducePO: 5,
        // minRequirePO: 50,
        // maxRequirePO: 80,
        iconUrl: '/assets/trees_ok.png',
    },

    [FossilFuel]: {
        minProduceCO: 5,
        maxProduceCO: 25,
        minProducePO: 1,
        maxProducePO: 5,
        minRequirePO: 50,
        maxRequirePO: 80,
        nextTypes: [RenewableEnergy],
        iconUrl: '/assets/plant.png',
    },
    [RenewableEnergy]: {
        minProduceCO: 0,
        maxProduceCO: 0,
        minProducePO: 0,
        maxProducePO: 0,
        // minRequirePO: 50,
        // maxRequirePO: 80,
        iconUrl: '/assets/windmill.png',
    },

    // [Garbage]: {},
    // [Recycle]: {},
    // [OceanPollution]: {},
    // [Algae]: {},
}

// temp copy-paste
markerTemplates[Garbage] = markerTemplates[FossilFuel]

let keyId = 0
export const spotTemplates = [
    {
        key: `spot-${++keyId}`,
        lonLatPos: [60.972629, -154.404552], // alaska
        initialMarkerTypes: [FossilFuel]
    },
    {

        key: `spot-${++keyId}`,
        lonLatPos: [49.473734, -123.156297], // british columbia
        initialMarkerTypes: [ForestFire]
    },
    {

        key: `spot-${++keyId}`,
        lonLatPos: [34.864991, -119.624145], // california
        initialMarkerTypes: [ForestFire]
    },
    {

        key: `spot-${++keyId}`,
        lonLatPos: [34.179038, -91.906365], // south dakota
        initialMarkerTypes: [DeadlyCow]
    },
    {

        key: `spot-${++keyId}`,
        lonLatPos: [20.755814, -101.377465], // mexico
        initialMarkerTypes: [Garbage]
    },
    {

        key: `spot-${++keyId}`,
        lonLatPos: [52.562540, -91.709279], // ontario
        initialMarkerTypes: [ForestFire]
    },
    {

        key: `spot-${++keyId}`,
        lonLatPos: [51.888753, -68.311054], // quebec
        initialMarkerTypes: [FossilFuel]
    },
    {

        key: `spot-${++keyId}`,
        lonLatPos: [41.118831, -74.039303], // new york
        initialMarkerTypes: [GasCar]
    },
    {

        key: `spot-${++keyId}`,
        lonLatPos: [-3.948426, -56.341354], // brazil
        initialMarkerTypes: [ForestFire]
    },
    {

        key: `spot-${++keyId}`,
        lonLatPos: [-15.159223, -46.736305], // brazil
        initialMarkerTypes: [DeadlyCow]
    },
    {

        key: `spot-${++keyId}`,
        lonLatPos: [-25.859044, -62.813534], // argentina
        initialMarkerTypes: [FossilFuel]
    },
    {

        key: `spot-${++keyId}`,
        lonLatPos: [48.276987, -0.061913], // france
        initialMarkerTypes: [GasCar]
    },
    {

        key: `spot-${++keyId}`,
        lonLatPos: [35.245442, -1.124363], // spain
        initialMarkerTypes: [Garbage]
    },
    {

        key: `spot-${++keyId}`,
        lonLatPos: [25.276987, 55.296249], // dubai
        initialMarkerTypes: [GasCar]
    },
    {

        key: `spot-${++keyId}`,
        lonLatPos: [43.127045, 20.046615], // serbia
        initialMarkerTypes: [FossilFuel]
    },
    {

        key: `spot-${++keyId}`,
        lonLatPos: [66.452048, 21.870813], // sweden
        initialMarkerTypes: [ForestFire]
    },
    {

        key: `spot-${++keyId}`,
        lonLatPos: [55.424412, 29.636265], // belarus
        initialMarkerTypes: [FossilFuel]
    },
    {

        key: `spot-${++keyId}`,
        lonLatPos: [29.197158, 26.999930], // egypt
        initialMarkerTypes: [FossilFuel]
    },
    {

        key: `spot-${++keyId}`,
        lonLatPos: [1.381047, 25.506064], // congo
        initialMarkerTypes: [ForestFire]
    },
    {

        key: `spot-${++keyId}`,
        lonLatPos: [-27.996092, 24.801556], // south africa
        initialMarkerTypes: [FossilFuel]
    },
    {

        key: `spot-${++keyId}`,
        lonLatPos: [60.843173, 60.985338], // russia
        initialMarkerTypes: [FossilFuel]
    },
    {

        key: `spot-${++keyId}`,
        lonLatPos: [32.621257, 70.665028], // pakistan
        initialMarkerTypes: [FossilFuel]
    },
    {

        key: `spot-${++keyId}`,
        lonLatPos: [21.240068, 76.551543], // india
        initialMarkerTypes: [GasCar]
    },
    {

        key: `spot-${++keyId}`,
        lonLatPos: [48.497505, 94.316556], // mongolia
        initialMarkerTypes: [ForestFire]
    },
    {

        key: `spot-${++keyId}`,
        lonLatPos: [53.418032, 119.346942], // russia
        initialMarkerTypes: [FossilFuel]
    },
    {

        key: `spot-${++keyId}`,
        lonLatPos: [62.902583, 154.202686], // russia
        initialMarkerTypes: [Garbage]
    },
    {
        key: `spot-${++keyId}`,
        lonLatPos: [39.970398, 116.398196], // china
        initialMarkerTypes: [GasCar]
    },
    {
        key: `spot-${++keyId}`,
        lonLatPos: [25.747365, 104.878338], // china
        initialMarkerTypes: [Garbage]
    },
    {

        key: `spot-${++keyId}`,
        lonLatPos: [1.347926, 113.349875], // indonesia
        initialMarkerTypes: [FossilFuel]
    },
    {

        key: `spot-${++keyId}`,
        lonLatPos: [-26.176757, 123.402908], // australia
        initialMarkerTypes: [DeadlyCow]
    },
    {

        key: `spot-${++keyId}`,
        lonLatPos: [-35.241188, 148.061874], // australia
        initialMarkerTypes: [ForestFire]
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
        requirePO: template.minRequirePO ? getRndInRange(template.minRequirePO, template.maxRequirePO) : 0,
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