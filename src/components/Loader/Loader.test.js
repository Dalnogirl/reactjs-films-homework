import { render } from '@testing-library/react'
import React from 'react'
import Loader from './Loader'

describe('Loader component', () => {
  const { container } = render(<Loader />)
  it('Renders Loader component with correct props', () => {
    expect(container).toMatchSnapshot()
  })
})
