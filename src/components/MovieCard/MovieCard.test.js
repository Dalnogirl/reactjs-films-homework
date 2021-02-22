import { render, screen } from '@testing-library/react'
import MovieCard from './MovieCard'
import React from 'react'
import { createMemoryHistory } from 'history'
import { describe } from '@jest/globals'

import '@testing-library/jest-dom/extend-expect'
import { MemoryRouter, Route, Router } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import createMockStore from '../../../__mocks__/mockStore'
import { fireEvent } from '@testing-library/dom'

const props = {
  movieName: 'Fight Club and some sample text',
  rating: 5,
  genresIds: [1, 2],
  poster: 'qq',
  overview: 'This is overview text',
  id: 550,
  allGenres: { genres: [{ id: 15, name: 'lorem' }] },
}

describe('MovieCard', () => {
  it('Renders MovieCard component', () => {
    const history = createMemoryHistory()
    const { container } = render(
      <Router history={history}>
        <MovieCard {...props} />
      </Router>,
    )
    expect(screen.queryByText(/Fight Club/i)).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it('Renders MovieCard infoMode', () => {
    render(
      <MemoryRouter initialEntries={['search?q=sample']}>
        <Route path="">
          <MovieCard {...props} />
        </Route>
      </MemoryRouter>,
    )
    userEvent.click(screen.getByText(/View Info/i))
    expect(screen.getByText(/This is overview text/i)).toBeInTheDocument()
    screen.debug()
  })
  it('Renders MovieCard trailer', () => {
    const store = createMockStore()
    const history = createMemoryHistory()
    render(
      <Provider store={store}>
        <div id="app">
          <Router history={history}>
            <MovieCard {...props} />
          </Router>
        </div>
      </Provider>,
    )
    userEvent.click(screen.getByTestId(/trailerButton/i))
    expect(screen.getByTestId('iframeContainer')).toBeInTheDocument()
    fireEvent.mouseLeave(screen.getByTestId('posterContainer'))
    expect(screen.queryByText('This is overview text')).toBeNull()
  })
})
