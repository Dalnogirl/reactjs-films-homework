import {moviesApi} from '../dal/dal'
import {urlHelpers} from '../Components/utils/functions/functions'

const SET_MOVIES = 'SET_MOVIES'
const SET_GENRES_OBJ = 'SET_GENRES_OBJ'
const SET_IS_FETCHING = 'SET_IS_FETCHING'
const INCREMENT_CURRENT_PAGE = 'INCREMENT_CURRENT_PAGE'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'

const initialState = {
    isFetching: false,
    moviesList: null,
    genresObj: {},

}

function moviesReducer(state = initialState, action) {
    switch (action.type) {
        case SET_MOVIES: {
            return {
                ...state,
                moviesList: {...action.data}
            }
        }
        case SET_GENRES_OBJ: {
            return {
                ...state,
                genresObj: {...action.data}
            }
        }
        case SET_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.data
            }
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.data
            }
        }
        case INCREMENT_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: state.currentPage + 1
            }
        }

        default:
            return state
    }
}

const urlCreatorForAJAX = (location) => {
    let filter = urlHelpers.getFilter(location)
    let searchQuery = urlHelpers.getSearchQuery(location)
    let page = urlHelpers.getPage(location)
    let genre = urlHelpers.getGenre(location)
    if (location.search.length > 0) {
        return `/search/movie?api_key=0d62501dce3049a65b9d183d8e927cfa&query=${searchQuery}&page=${page}`
    } else {
        if (genre) {
            return `/movie/${filter}?api_key=0d62501dce3049a65b9d183d8e927cfa&page=${page}&with_genres=${genre}`
        }
        else return `/movie/${filter}?api_key=0d62501dce3049a65b9d183d8e927cfa&page=${page}`
    }
}

export let moviesActions = {
    setGenresObj: (data) => ({type: SET_GENRES_OBJ, data}),
    setMovies: data => ({type: SET_MOVIES, data}),
    setIsFetching: data => ({type: SET_IS_FETCHING, data}),

}


export let setGenresObj = () => {
    return (dispatch) => {
        moviesApi.getGenresObj()
            .then(data => dispatch(moviesActions.setGenresObj(data)))
    }
}


export let setMovies = (location) => async (dispatch) => {
    console.log('ajax')
    dispatch(moviesActions.setIsFetching(true))
    let data = await moviesApi.getMovies(urlCreatorForAJAX(location))
    dispatch(moviesActions.setMovies(data))
    dispatch(moviesActions.setIsFetching(false))
}


export default moviesReducer