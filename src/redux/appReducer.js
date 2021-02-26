const SET_ERROR = 'SET_ERROR'

const appReducer = (state = { errorMessage: null }, action) => {
  switch (action.type) {
    case SET_ERROR: {
      return {
        ...state,
        errorMessage: action.data,
      }
    }
    default: {
      return state
    }
  }
}

export const appActions = {
  setError: (data) => ({ type: SET_ERROR, data }),
}

export default appReducer
