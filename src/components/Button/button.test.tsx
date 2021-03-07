import React from 'react'
import { render } from '@testing-library/react'
import Button from './button'

const defaultProps = {
    onClick: jest.fn()
}

test('our first react test case', () => {
    const wrapper = render(<Button {...defaultProps}>Nice</Button>)
    const element = wrapper.queryByText('Nice')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')
})

describe('test Button component', () => {
    it('should render the correct default button', () => {

    })
    it('should render the correct component based on different props', () => {

    })
    it('should render a link when btnType equals link and href is provided', () => {

    })
})