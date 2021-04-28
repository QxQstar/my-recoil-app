export function addNum (a,b) {
    return a + b;
}

export function addStr (a, b) {
    return a + b + '';
}

export function addArr(arr) {
    return arr.reduce((a, b) => {
        return a + b;
    }, 0)
}