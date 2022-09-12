import React from "react";
import {Nav, NavItem, Caption} from 'playbook-ui'

export const MENU_ITEMS = [
  "Colors",
  "Max Width",
  "Number Spacing",
  "Positioning",
  "Line Height",
  "Spacing",
  "Border Radius",
  "Typography",
  "Shadows",
  "Display",
  "Cursor",
  "Flex Box",
];

const Sidebar = () => {

  return (
    <>
    <Caption marginY="md" marginLeft="md" text="Visual Guidelines"/>
    <Nav variant="subtle">
        {
            MENU_ITEMS.map(item => (
                <NavItem
                link={`#${item.replace(/\s+/g, '')}`}
                text={item}
                />
            ))
        }
    </Nav>
    </>
  )
  
};

export default Sidebar;