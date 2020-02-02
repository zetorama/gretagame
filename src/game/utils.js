export const getRndInRange = (min = 0, max = 100) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export const getRndItem = (sourceArr = []) => {
    return sourceArr[getRndInRange(0, sourceArr.length - 1)]
}

export const getRndItems = (sourceArr, amount = 10) => {
    if (amount >= sourceArr.length) {
        return sourceArr
    }

    const indSet = new Set()
    do {
        const rndInd = getRndInRange(0, sourceArr.length - 1)
        if (!indSet.has(rndInd)) {
            indSet.add(rndInd)
        }
    } while (indSet.size !== amount)

    return Array.from(indSet.values()).map(ind => sourceArr[ind])
}