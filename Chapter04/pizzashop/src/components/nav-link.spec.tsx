import { render } from "@testing-library/react"
import { NavLink } from "./nav-link"
import { MemoryRouter } from "react-router-dom"

describe('Nav Link', () => {
  it('should highlight the nav link when is the current page link', () => {
    const wrapper = render(
      <>
        <NavLink to="/">
          Home
        </NavLink>
        <NavLink to="/about">
          About
        </NavLink>
      </>,
      {
        wrapper: ({ children }) => (
          <MemoryRouter initialEntries={["/about"]}>
            {children}
          </MemoryRouter>
        )
      }
    )

    expect(wrapper.getByText('About').dataset.current).toEqual('true')
    expect(wrapper.getByText('Home').dataset.current).toEqual('false')
  })
})