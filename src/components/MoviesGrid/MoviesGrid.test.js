import { act, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter, Route } from 'react-router-dom'
import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import createMockStore from '../../../__mocks__/mockStore'
import MoviesGrid from './MoviesGrid'
import { axiosInstance } from '../../dal/dal'

const mockSearchReply = {
  results: [
    {
      title: 'Fight Club and some sample text',
      vote_average: 5,
      genre_ids: [1, 2],
      poster_path: 'qq',
      overview: 'This is overview text',
      id: 550,
      allGenres: { genres: [{ id: 15, name: 'lorem' }] },
    },
    {
      title: 'Inception and some sample text',
      vote_average: 5,
      genre_ids: [3, 4],
      poster_path: 'hh',
      overview: 'text for overview',
      id: 551,
      allGenres: { genres: [{ id: 1, name: 'ipsum' }] },
    },
  ],
}

window.scrollTo = jest.fn()

describe('MoviesGrid component', () => {
  const mock = new MockAdapter(axiosInstance)
  mock.onGet().reply(200, mockSearchReply)

  it('Renders casually', async () => {
    const store = createMockStore()
    await act(async () => render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['movies']}>
            <Route>
              <MoviesGrid />
            </Route>
          </MemoryRouter>
        </Provider>,
      ))
    expect(screen.getByText(/fight club/i)).toBeInTheDocument()
  })

  it('Renders with searchQuery', async () => {
    const store = createMockStore()
    await act(async () => render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['search?q=sample']}>
            <Route>
              <MoviesGrid />
            </Route>
          </MemoryRouter>
        </Provider>,
      ))
    expect(screen.getByText(/fight club/i)).toBeInTheDocument()
  })

  it('Renders with genre', async () => {
    const store = createMockStore({
      moviesData: {
        isFetching: false,
        moviesList: null,
        genresObj: {},
        currentFilter: 'top_rated',
        currentGenre: 123,
        currentPage: 1,
        totalResults: null,
      },
      headerData: {
        isHeaderFetching: false,
        trailerKey: null,
      },
    })
    await act(async () => render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['movies']}>
            <Route>
              <MoviesGrid />
            </Route>
          </MemoryRouter>
        </Provider>,
      ))
    expect(screen.getByText(/fight club/i)).toBeInTheDocument()
    console.log(screen.getByTestId('pagination'))
  })
})
