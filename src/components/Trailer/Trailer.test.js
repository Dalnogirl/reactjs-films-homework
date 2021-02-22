import {
 act, fireEvent, render, screen,
} from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { axiosInstance } from '../../dal/dal'
import Trailer from './Trailer'
import createMockStore from '../../../__mocks__/mockStore'

const store = createMockStore()

describe('Trailer component', () => {
  const callback = jest.fn()
  const history = createMemoryHistory()

  it('Renders Trailer component with correct props', async () => {
    const movieId = 10
    const mock = new MockAdapter(axiosInstance)
    mock
      .onGet(`/movie/${movieId}/videos?api_key=0d62501dce3049a65b9d183d8e927cfa`)
      .reply(200, { results: [{ key: 12345 }] })

    await act(async () => render(
        <Provider store={store}>
          <Router history={history}>
            <Trailer callback={callback} movieId={movieId} />
          </Router>
        </Provider>,
      ))
    expect(await screen.findByTestId('iframe')).toBeInTheDocument()
    fireEvent.click(screen.getByTestId(/iframeContainer/i))
    screen.debug()
  })
})
