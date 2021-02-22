import { fireEvent, render, screen } from "@testing-library/react"
import Button from './Button'
import React from 'react'
import { describe } from '@jest/globals'
import '@testing-library/jest-dom/extend-expect'


describe('Button', () => {
  it('Renders Button component', () => {
    render(
      <Button
        onClick={() => {
          console.log('Clicked!!')
        }}
      >
        Child
      </Button>,
    )
    expect(screen.queryByText(/Child/i)).toBeInTheDocument()
  })
  it('onClick is working properly', ()=>{
    const func = jest.fn()
    render(
      <Button
        onClick={func}
      >
        Child
      </Button>,
    )
    fireEvent.click(screen.getByText('Child'))
    expect(func).toBeCalledTimes(1)
  })
})
