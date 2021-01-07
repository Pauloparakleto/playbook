import React, { useState } from 'react'
import {
  Button,
  Icon,
  List,
  ListItem,
  PbReactPopover,
} from '../..'

const PopoverWithButton = (props) => {
  const [showPopover, setShowPopover] = useState(false)

  const handleTogglePopover = () => {
    setShowPopover(!showPopover)
  }

  const popoverReference = (
    <Button
        dark
        onClick={handleTogglePopover}
        variant="primary"
        {...props}
    >
      {'Filter By'}
      <Icon
          dark
          fixedWidth
          icon="angle-down"
          {...props}
      />
    </Button>
  )

  return (
    <PbReactPopover
        dark
        padding="none"
        placement="bottom"
        reference={popoverReference}
        show={showPopover}
        {...props}
    >
      <List xpadding>
        <ListItem><a>{'Popularity'}</a></ListItem>
        <ListItem><a>{'Title'}</a></ListItem>
        <ListItem><a>{'Duration'}</a></ListItem>
        <ListItem><a>{'Date Started'}</a></ListItem>
        <ListItem><a>{'Date Ended'}</a></ListItem>
      </List>
    </PbReactPopover>
  )
}

export default PopoverWithButton
