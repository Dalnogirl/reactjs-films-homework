import React from 'react'
import Popover from './Popover'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Popover', () => {
  const child = 'Sample popover text'
  it('Renders properly', () => {
    const { container } = render(<Popover text="Test name">{child}</Popover>)
    expect(container).toMatchSnapshot()
  })
  it('Click toggles popover text', () => {
    render(<Popover text="Test name">Sample popover text</Popover>)
    userEvent.click(screen.getByText(/test name/i))
    expect(screen.getByText(child)).toBeInTheDocument()
    userEvent.click(screen.getByText(/test name/i))
    expect(screen.queryByText(child)).toBeNull()
  })
})
