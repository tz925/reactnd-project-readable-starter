import React from 'react'
import { Dropdown, Menu } from 'semantic-ui-react'

const options = [
  { key: 1, text: 'Highest Vote', value: 'voteScore' },
  { key: 2, text: 'Most Recent', value: 'timestamp' },
]

function SortByDropDown(props){
  return (
    <Menu compact>
      <Dropdown onChange={(event,data) => props.onSelect(data.value)} text='Order' options={options} simple item />
    </Menu>
  )
}

export default SortByDropDown
