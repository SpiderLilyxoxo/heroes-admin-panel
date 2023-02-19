export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const heroDelete = (heroes) => {
    return {
        type: 'HERO_DELETE',
        payload: heroes
    }
}

export const heroAdd = (heroes) => {
    return {
        type: 'HERO_ADD',
        payload: heroes
    }
}

export const elementsFetched = (filters) => {
    return {
        type: "HERO_ELEMENTS",
        filters: filters
    }
}

export const elementsFilter = (filterElements) => {
    return {
        type: "CHOOSEN_ELEMENT",
        filterElements: filterElements
    }
}