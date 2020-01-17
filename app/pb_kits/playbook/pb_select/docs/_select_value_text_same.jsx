import React from 'react'
import { Select } from '../../'

const SelectValueTextSame = () => {
  return (
    <div>
      <Select
          label="Favorite Sport"
          name="sports"
          options={[
          {
            value: 'Football',
          },
          {
            value: 'Baseball',
          },
          {
            value: 'Basketball',
          },
          {
            value: 'Hockey',
          },
        ]}
      />
    </div>
  )
}

export default SelectValueTextSame