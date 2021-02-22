import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App'
import createMockStore from '../../../__mocks__/mockStore'

describe('App', () => {
  window.scrollTo = jest.fn()

  const store = createMockStore()

  it('Renders App component with correct props', () => {
    const history = createMemoryHistory()
    const {container} = render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
    )
    expect(container).toMatchSnapshot()
  })
  it('Renders 404 page', () => {
    const history = createMemoryHistory()
    history.push('/404')
    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
    )
    expect(screen.getByText(/Not found/i)).toBeInTheDocument()
  })
})
