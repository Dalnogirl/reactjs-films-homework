import {moviesApi} from '../dal/dal'

const SET_TOP_RATED_MOVIES = 'SET_TOP_RATED_MOVIES'
const SET_GENRES_ARRAY = 'SET_GENRES_ARRAY'

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
        default:
            return state
    }
}

let moviesActions = {
    setTopRatedMovies: (data) => ({type: SET_TOP_RATED_MOVIES, data}),
    setGenresArray: (data) => ({type: SET_GENRES_ARRAY, data})
}

export let setTopRatedMovies = (page) => {
    return (dispatch) => {
        moviesApi.getTopRatedMovies(page)
            .then(data => {
                dispatch(moviesActions.setTopRatedMovies(data))
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