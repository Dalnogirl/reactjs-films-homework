import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter, Route } from 'react-router-dom'
import MockAdapter from 'axios-mock-adapter'
import { axiosInstance } from '../../dal/dal'
import createMockStore from '../../../__mocks__/mockStore'
import MovieDetailsPage from './MovieDetailsPage'

const store = createMockStore()

describe('MovieDetailPage component', () => {
  afterEach(() => {
    cleanup()
  })
  window.scrollTo = jest.fn()
  const movieId = 420

  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn().mockReturnValue({ id: movieId }),
  }))

  const mock = new MockAdapter(axiosInstance)
  mock.onGet(`/movie/${movieId}?api_key=0d62501dce3049a65b9d183d8e927cfa`).reply(200, {
    overview:
      'A retired farmer and widower in his 70s, Alvin Straight learns' +
      ' one day that his distant brother Lyle' +
      ' has suffered a stroke and may not recover.',
    vote_average: 8,
    title: 'The Straight Story',
    poster_path: '/tT9cMiVDdtlcdZxOoFy3VRmEoKk.jpg',
    genres: [
      {
        id: 18,
        name: 'Drama',
      },
    ],
  })

  it('Renders MovieDetailPage component with correct props', async () => {
    await act(async () =>
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['movies/420']}>
            <Route path="movies/:id">
              <MovieDetailsPage />
            </Route>
          </MemoryRouter>
        </Provider>,
      ),
    )
    expect(await screen.findByText('The Straight Story')).toBeInTheDocument()
  })
  it('Watch Trailer button works correctly', async () => {
    await act(async () => {
      try {
        return render(
          <div id="app">
            <Provider store={store}>
              <MemoryRouter initialEntries={['movies/420']}>
                <Route path="movies/:id">
                  <MovieDetailsPage />
                </Route>
              </MemoryRouter>
            </Provider>
          </div>
        )
      } catch (e) {
        console.log(e)
      }
    })
    fireEvent.click(screen.getByText(/watch/i))
  })
})
