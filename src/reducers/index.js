const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filterElements: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case "HERO_DELETE":
            return {
                ...state,
                heroes: [...state.heroes.filter(hero => hero.id !== action.payload)]
            }
        case "HERO_ADD":
            return {
                ...state,
                heroes: [...state.heroes, action.payload]
            }
        case "HERO_ELEMENTS":
            return {
                ...state,
                filters: action.filters
            }
        case "CHOOSEN_ELEMENT": 
            return {
                ...state,
                filterElements: action.filterElements,
                heroes: action.filterElements === "all" ? [...state.heroes ] : [...state.heroes.filter(hero => hero.element === action.filterElements)]
            }
        default: return state
    }
}

export default reducer;