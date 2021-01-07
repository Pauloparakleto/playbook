import React from 'react'
import { Nav } from '../../'
import NavItem from '../_item.jsx'

const NoHighlightNav = (props) => {
  return (
    <Nav highlight={false}>
      <NavItem
          active
          link="#"
          text="All Categories"
          {...props}
      />
      <NavItem
          link="#"
          text="Food"
          {...props}
      />
      <NavItem
          link="#"
          text="Digital"
          {...props}
      />
      <NavItem
          link="#"
          text="Design Art"
          {...props}
      />
    </Nav>
  )
}

export default NoHighlightNav
