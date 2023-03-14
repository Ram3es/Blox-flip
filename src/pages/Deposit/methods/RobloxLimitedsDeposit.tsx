import React from 'react'
import { useOutletContext } from 'react-router-dom'

const RobloxLimitedsDeposit = () => {
  const { priceRange, searchBy, sortBy } = useOutletContext<any>()
  console.log(priceRange)
  return (
        <div>
          {searchBy}
          {sortBy?.direction}
          {sortBy?.value}
        </div>
  )
}

export default RobloxLimitedsDeposit
