import {headerAPI} from '../dal/dal'

const GET_MOVIE_INFO = 'GET_MOVIE_INFO'
const SET_IS_FETCHING = 'SET_IS_FETCHING'
const initialState = {
    //movieInfo: null
    isFetching: false
}

function headerReducer(state = initialState, action) {
    switch (action.type) {
        case GET_MOVIE_INFO: {
            return {
                ...state,
                movieInfo: {...action.data}
            }
        }
        case SET_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.data
            }
        }
        default:
            return state
    }
}

let headerActions = {
    getMovieInfo: (data) => ({type: GET_MOVIE_INFO, data}),
    setIsFetching: data => ({type: SET_IS_FETCHING, data})

}

export let getMovieInfo = (movieId) => {
    return async (dispatch) => {
        dispatch(headerActions.setIsFetching(true))
        let data = await headerAPI.getMovieInfo(movieId)
        dispatch(headerActions.getMovieInfo(data))
        dispatch(headerActions.setIsFetching(false))
    }
}



export default headerReducer