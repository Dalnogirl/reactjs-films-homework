import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import React from 'react'
import {hot} from 'react-hot-loader'
import store from '../../redux/store'
import App from './App'

const AppContainer = () => (
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>

)

export default hot(module)(AppContainer)
