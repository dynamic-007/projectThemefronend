import React from 'react'
import { options } from '../data/equipment'

const MultiSelect = () => {
  return (
    <div>
        <select  value={"ALL"} multiple={true}>
            {options.map(each=>
                <option value={each.value}>
                    <div><input type="checkbox" value={each.value} /> {each.label}</div>
                    </option>)}
                </select>
    </div>
  )
}

export default MultiSelect