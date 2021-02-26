import React from 'react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import Navbar from './Navbar'
import { fireEvent, render } from '@testing-library/react'
import { Provider } from 'react-redux'
import createMockStore from '../../../__mocks__/mockStore'

const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

describe('Navbar', () => {
  const state = {
    moviesData: {
      isFetching: false,
      moviesList: null,
      genresObj: {},
      currentFilter: 'top_rated',
      currentGenre: null,
      currentPage: 1,
      totalResults: null,
    },
    headerData: {
      isHeaderFetching: false,
      trailerKey: null,
    },
  }
  const store = createMockStore(state)
  it('Renders Navbar component', () => {
    const history = createMemoryHistory()
    const { container, getAllByTestId } = render(
      <Provider store={store}>
        <Router history={history}>
          <Navbar />
        </Router>
      </Provider>,
    )
    expect(container).toMatchSnapshot()
    fireEvent.click(getAllByTestId('nav-item')[0])
    expect(mockHistoryPush).toBeCalledTimes(1)
  })
})
