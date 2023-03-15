import React from 'react'

const DaggersIcons = ({ iconClasses }: { iconClasses?: string }) => {
  return (
    <svg className={`${iconClasses ?? ''}`} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.36356 9.50189L4.3533 7.80762L3.93678 8.30183C3.69068 8.16013 3.41353 8.07837 3.12152 8.07837C2.68252 8.07837 2.27078 8.24862 1.96155 8.55782L5.44186 12.0381C5.97692 11.5031 6.058 10.6897 5.69796 10.0628L6.36356 9.50189Z" fill="currentColor"/>
    <path d="M10.878 8.07865C10.5869 8.07865 10.3106 8.16 10.0651 8.3009L3.05974 0H0V3.05974L8.30096 10.0651C7.94221 10.6918 8.02364 11.5039 8.5581 12.0384L12.0384 8.55813C11.7292 8.24889 11.3171 8.07865 10.878 8.07865ZM4.38965 4.96964L1.46237 2.04236L2.04236 1.46237L4.96964 4.38965L4.38965 4.96964Z" fill="currentColor"/>
    <path d="M12.699 11.5393L11.4584 10.2983L10.2981 11.4586L11.539 12.6991V14.0002H14V11.5393H12.699Z" fill="currentColor"/>
    <path d="M2.5416 10.2983L1.30107 11.5393H0V14.0002H2.46094V12.6992L3.70188 11.4586L2.5416 10.2983Z" fill="currentColor"/>
    <path d="M10.9382 0L7.53638 4.03123L9.74531 6.65205L14 3.06176V0H10.9382ZM9.61034 4.96964L9.03036 4.38965L11.9576 1.46237L12.5376 2.04236L9.61034 4.96964Z" fill="currentColor"/>
    </svg>
  )
}

export default DaggersIcons