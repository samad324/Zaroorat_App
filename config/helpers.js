const haversine = require('haversine')

export const calculateDistance = (start, end) => {
    return haversine(start, end)
}