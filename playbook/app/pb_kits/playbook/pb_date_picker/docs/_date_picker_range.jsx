import React from 'react'

import DatePicker from '../_date_picker'

const DatePickerRange = (props) => (
  <div>
    <DatePicker
        defaultDate={[new Date(), new Date().fp_incr(7)]}
        mode="range"
        pickerId="date-picker-range"
        {...props}
    />
    <DatePicker
        defaultDate={[new Date(), new Date().fp_incr(7)]}
        label="Default Date Range"
        mode="range"
        pickerId="date-picker-default-date3"
        {...props}
    />
  </div>
)

export default DatePickerRange
