import {moviesApi} from '../dal/dal'

const SET_TOP_RATED_MOVIES = 'SET_TOP_RATED_MOVIES'
const SET_GENRES_ARRAY = 'SET_GENRES_ARRAY'
const SET_POPULAR_MOVIES = 'SET_POPULAR_MOVIES'

const initialState = {
    moviesList: null,
    genresArray: null
}

function moviesReducer(state = initialState, action) {
    switch (action.type) {
        case SET_TOP_RATED_MOVIES: {
            return {
                ...state,
                moviesList: {...state.moviesList,...action.data}
            }
        }
        case SET_GENRES_ARRAY: {
            return {
                ...state,
                genresArray: {...action.data}
            }
        }
        case SET_POPULAR_MOVIES: {
            return {
                ...state,
                moviesList: {...action.data}
            }
        }
        default:
            return state
    }
}

let moviesActions = {
    setTopRatedMovies: (data) => ({type: SET_TOP_RATED_MOVIES, data}),
    setGenresArray: (data) => ({type: SET_GENRES_ARRAY, data}),
    setPopularMovies: data => ({type: SET_POPULAR_MOVIES, data})
}

export let setTopRatedMovies = (page) => {
    return (dispatch) => {
        moviesApi.getTopRatedMovies(page)
            .then(data => {
                dispatch(moviesActions.setTopRatedMovies(data))
            })
    }
}

export let setPopularMovies = (page) => {
    return (dispatch) => {
        moviesApi.getPopularMovies(page)
            .then(data => {
                dispatch(moviesActions.setPopularMovies(data))
            })
    }
}

export let setGenresArray = () => {
    return (dispatch) => {
        moviesApi.getGenresArray()
            .then(data => dispatch(moviesActions.setGenresArray(data)))
    }
}


export default moviesReducer