import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import Input from './Input'

const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

describe('Input', () => {
  const history = createMemoryHistory()
  it('Renders Input component with correct props', () => {
    const { container } = render(
      <Router history={history}>
        <Input placeholder="test" />
      </Router>,
    )
    expect(container).toMatchSnapshot()
  })
  it('Input is working correctly', () => {
    render(
      <Router history={history}>
        <Input placeholder="test" />
      </Router>,
    )
    fireEvent.change(screen.getByTestId('searchInput'), { target: { value: 'Hello world' } })
    screen.debug()
    expect(screen.getByTestId('searchInput').value).toBe('Hello world')
  })
  it('Search button pushes to history correctly', () => {
    render(
      <Router history={history}>
        <Input placeholder="test" />
      </Router>,
    )
    userEvent.click(screen.getByTestId('searchButton'))
    expect(mockHistoryPush).toBeCalledTimes(1)
  })
})
