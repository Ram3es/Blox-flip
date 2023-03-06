import React from 'react'

const SelectedIcon = ({ iconClasses }: { iconClasses?: string }) => {
  return (
    <svg className={iconClasses ?? ''} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 0C5.61553 0 4.26215 0.410543 3.11101 1.17971C1.95987 1.94888 1.06266 3.04213 0.532846 4.32121C0.00303298 5.60029 -0.13559 7.00776 0.134506 8.36563C0.404602 9.72349 1.07129 10.9708 2.05025 11.9497C3.02922 12.9287 4.2765 13.5954 5.63437 13.8655C6.99223 14.1356 8.3997 13.997 9.67878 13.4671C10.9579 12.9373 12.0511 12.0401 12.8203 10.889C13.5894 9.73784 14 8.38446 14 6.99999C14 5.14348 13.2625 3.363 11.9497 2.05025C10.637 0.737497 8.85651 0 7 0ZM10.605 5.105L6.105 9.60499C6.05828 9.65133 6.00287 9.688 5.94195 9.71288C5.88103 9.73776 5.8158 9.75037 5.75 9.74999H5.72C5.65002 9.74534 5.58181 9.72602 5.51979 9.69329C5.45777 9.66055 5.40333 9.61514 5.36 9.55999L3.36 7.06C3.31247 7.00965 3.27592 6.94997 3.25266 6.88476C3.2294 6.81955 3.21994 6.75022 3.22487 6.68116C3.22981 6.61209 3.24903 6.54481 3.28132 6.48357C3.31362 6.42232 3.35828 6.36845 3.41248 6.32537C3.46668 6.28229 3.52924 6.25093 3.59619 6.23329C3.66314 6.21565 3.73302 6.2121 3.80142 6.22288C3.86981 6.23365 3.93522 6.25851 3.9935 6.29589C4.05179 6.33326 4.10167 6.38233 4.14 6.44L5.79 8.49999L9.895 4.395C9.98915 4.30084 10.1168 4.24795 10.25 4.24795C10.3831 4.24795 10.5108 4.30084 10.605 4.395C10.6991 4.48915 10.752 4.61685 10.752 4.75C10.752 4.88315 10.6991 5.01084 10.605 5.105Z" fill="currentColor"/>
    </svg>
  )
}

export default SelectedIcon
