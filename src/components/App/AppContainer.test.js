import { render } from '@testing-library/react'
import React from 'react'
import AppContainer from './AppContainer'

describe('AppContainer', () => {
  window.scrollTo = jest.fn()
  const { container } = render(<AppContainer />)
  it('Renders AppContainer component with correct props', () => {
    expect(container).toMatchSnapshot()
  })
})
