export const locationAction = (location) => (
    {
        type: 'LOCATION',
        location
    }
)

export const manualAddCity = city => (
    {
        type: 'MANUAL_ADD_CITY',
        city
    }
)

export const manualAddName = name => (
    {
        type: 'MANUAL_ADD_NAME',
        name
    }
)