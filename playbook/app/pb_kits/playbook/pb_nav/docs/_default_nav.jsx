import React from 'react'

import Nav from '../_nav'
import NavItem from '../_item'

const DefaultNav = (props) => (
  <Nav
      link="#"
      orientation="vertical"
      title="Menu"
      {...props}
  >
    <NavItem
        link="#"
        text="Photos"
        {...props}
    />
    <NavItem
        link="#"
        text="Music"
        {...props}
    />
    <NavItem
        active
        link="#"
        text="Video"
        {...props}
    />
    <NavItem
        link="#"
        text="Files"
        {...props}
    />
  </Nav>
)

export default DefaultNav
