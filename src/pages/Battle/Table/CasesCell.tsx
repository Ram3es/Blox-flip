import React from 'react'
import { IMAGES } from '../../../constants/Images'

const CasesCell = () => {
  return (
    <div className="flex items-center justify-center rounded border border-dashed border-blue-highlight bg-gradient-to-t from-dark/20 to-blue-highlight/10 py-1">
        <img src={IMAGES.redCrown} alt="" width="56" height="62" loading="lazy" decoding="async" />
    </div>
  )
}

export default CasesCell
