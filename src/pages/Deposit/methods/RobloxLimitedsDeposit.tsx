import React from 'react'
import { useOutletContext } from 'react-router-dom'

const RobloxLimitedsDeposit = () => {
  const { searchBy, sortBy } = useOutletContext<any>()
  return (
        <div>
          {searchBy}
          {sortBy.direction}
          {sortBy.value}
        </div>
  )
}

export default RobloxLimitedsDeposit
