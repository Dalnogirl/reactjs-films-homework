import { render, screen } from '@testing-library/react'
import Dropdown from './Dropdown'
import React from 'react'
import { Provider } from 'react-redux'
import userEvent from '@testing-library/user-event'
import createMockStore from "../../../__mocks__/mockStore"

describe('Dropdown component', () => {
  const initialState = {
    moviesData: {
      isFetching: false,
      moviesList: null,
      genresObj: {
        genres: [
          { name: 'Action', id: 12 },
          { name: 'Drama', id: 2 },
          { name: 'Horror', id: 3 },
        ],
      },
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
  const store = createMockStore(initialState)
  it('Renders properly', () => {
    const { container } = render(
      <Provider store={store}>
        <Dropdown />
      </Provider>,
    )
    expect(container).toMatchSnapshot()
  })
  it('Dropdown toggles onHeaderClick', () => {
    render(
      <Provider store={store}>
        <Dropdown />
      </Provider>,
    )
    userEvent.click(screen.getByTestId('ddHeader'))
    expect(screen.getByText(/action/i)).toBeInTheDocument()
    userEvent.click(screen.getByTestId('ddHeader'))
    expect(screen.queryByText(/action/i)).toBeNull()
  })
  it('dd', () => {
    render(
      <Provider store={store}>
        <Dropdown />
      </Provider>,
    )
    userEvent.click(screen.getByTestId('ddHeader'))
    userEvent.click(screen.getByText(/action/i))
    expect(store.getState().moviesData.currentGenre).toEqual(12)
  })
})
