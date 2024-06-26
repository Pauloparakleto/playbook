import React, { useState } from 'react'

import SelectableCardIcon from '../_selectable_card_icon'

const SelectableCardIconCheckmark = (props) => {
  const [selected, setSelected] = useState(true)
  const [unselected, setUnselected] = useState(false)

  return (
    <div className="pb--doc-demo-row">

      <SelectableCardIcon
          bodyText="Howdy Partner."
          checked={selected}
          checkmark
          icon="hat-cowboy"
          inputId={4}
          onChange={() => setSelected(!selected)}
          titleText="Cowboy"
          {...props}
      />
      <SelectableCardIcon
          bodyText="Poof, you're a sandwich."
          checked={unselected}
          checkmark
          icon="hat-wizard"
          inputId={5}
          onChange={() => setUnselected(!unselected)}
          titleText="Wizard"
          {...props}
      />
      <SelectableCardIcon
          bodyText="Where is the lamb sauce?"
          checkmark
          disabled
          icon="hat-chef"
          inputId={6}
          titleText="Chef"
          {...props}
      />
    </div>
  )
}

export default SelectableCardIconCheckmark
