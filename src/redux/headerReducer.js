import {headerAPI} from '../dal/dal'

const GET_MOVIE_INFO = 'GET_MOVIE_INFO'
const initialState = {
    movieInfo: null
}

function headerReducer(state = initialState, action) {
    switch (action.type) {
        case GET_MOVIE_INFO: {
            return {
                ...state,
                movieInfo: {...action.data}
            }
        }
        default:
            return state
    }
}

let headerActions = {
    getMovieInfo: (data) => ({type: GET_MOVIE_INFO, data})
}

export let getMovieInfo = (movieId) => {
    // return async (dispatch) => {
    //     let data = await headerAPI.getMovieInfo(movieId)
    //     dispatch(headerActions.getMovieInfo(data))
    // }
    return (dispatch) => {
        headerAPI.getMovieInfo(movieId)
            .then(data => {
                dispatch(headerActions.getMovieInfo(data))
            })
    }
}


export default headerReducer