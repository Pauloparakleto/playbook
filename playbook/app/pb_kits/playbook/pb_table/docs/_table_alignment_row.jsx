import React from 'react'

import Table from '../_table'

const TableAlignmentRow = (props) => {
  return (
    <Table
        {...props}
    >
      <thead>
        <tr>
          <th>{'Column 1'}</th>
          <th>{'Column 2'}</th>
          <th>{'Column 3'}</th>
          <th>{'Column 4'}</th>
          <th>{'Column 5'}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{'Value 1'}</td>
          <td>{'Value 2'}</td>
          <td>{'Value 3'}</td>
          <td>{'Value 4'}</td>
          <td>{'Value 5'}</td>
        </tr>
        <tr align="center">
          <td>{'Value 1'}</td>
          <td>{'Value 2'}</td>
          <td>{'Value 3'}</td>
          <td>{'Value 4'}</td>
          <td>{'Value 5'}</td>
        </tr>
        <tr align="right">
          <td>{'Value 1'}</td>
          <td>{'Value 2'}</td>
          <td>{'Value 3'}</td>
          <td>{'Value 4'}</td>
          <td>{'Value 5'}</td>
        </tr>
      </tbody>
    </Table>
  )
}

export default TableAlignmentRow
