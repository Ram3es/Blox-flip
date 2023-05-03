import React from 'react'

const ChallengeDarts = ({ iconClasses }: { iconClasses?: string }) => {
  return (
    <svg className={iconClasses ?? ''} width="47" height="48" viewBox="0 0 47 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M46.4592 9.43638L40.6653 15.2304H36.3282H33.9527L32.8938 16.2893L28.866 20.3171L26.3563 22.8268L24.2341 24.9489C23.9167 25.2664 23.5008 25.4251 23.0847 25.4251C22.6534 25.4251 22.2217 25.2544 21.9004 24.9131C21.2902 24.2651 21.3542 23.2313 21.9834 22.6018L26.2057 18.3795L26.5291 18.0561L30.5744 14.0109L31.6537 12.9315V10.6173V6.219L33.657 4.21564L37.4477 0.425025C37.4978 0.374913 37.5504 0.331149 37.6041 0.290334C37.617 0.280584 37.6297 0.27106 37.6429 0.261763C37.6966 0.223669 37.7515 0.188522 37.8077 0.159044C37.8123 0.15655 37.817 0.154963 37.8218 0.152469C37.8751 0.125485 37.9293 0.10281 37.9842 0.0830825C37.998 0.0780939 38.0116 0.0731054 38.0254 0.0685704C38.0837 0.0497499 38.1427 0.0338773 38.2021 0.0229932C38.2102 0.0214059 38.2186 0.0209524 38.2268 0.0193651C38.2803 0.0105218 38.3338 0.00507976 38.3876 0.00235873C38.4014 0.00167848 38.415 0.000771467 38.4288 0.000317963C38.4887 -0.000815798 38.5483 0.000998219 38.6075 0.00712053C38.6172 0.00825429 38.627 0.0100683 38.6368 0.0112021C38.688 0.0175511 38.739 0.026848 38.7891 0.0386391C38.8032 0.0420404 38.8175 0.0449881 38.8315 0.0486162C38.8889 0.0638086 38.9456 0.081722 39.0005 0.10349C39.0086 0.106665 39.0163 0.110746 39.0243 0.113921C39.0726 0.134102 39.1195 0.157004 39.1653 0.182173C39.1785 0.189429 39.1916 0.196459 39.2043 0.203941C39.2556 0.234099 39.3054 0.266525 39.3528 0.302579C39.3585 0.306887 39.3637 0.311875 39.3692 0.316184C39.4113 0.349516 39.4515 0.385343 39.49 0.423437C39.5009 0.434095 39.5118 0.444752 39.5222 0.455863C39.5637 0.499626 39.6034 0.545203 39.6395 0.594409C39.6424 0.59849 39.6449 0.603025 39.6481 0.607333C39.6809 0.653364 39.7104 0.701889 39.7379 0.752228C39.7453 0.76606 39.7528 0.779892 39.7599 0.794177C39.7877 0.849958 39.8136 0.907553 39.8342 0.968323C39.8351 0.971271 39.8358 0.974218 39.8367 0.977166C39.8562 1.03544 39.871 1.09621 39.883 1.15857C39.8862 1.17512 39.8891 1.1919 39.8918 1.20868C39.9023 1.27535 39.9102 1.34337 39.9118 1.41434L40.0281 6.85549L40.1444 6.85798L45.469 6.97181C45.7563 6.97793 46.008 7.0641 46.2187 7.19992C46.2992 7.25185 46.3756 7.30854 46.4429 7.3743C46.5402 7.46953 46.6232 7.57769 46.6899 7.69493C46.7565 7.81216 46.8073 7.93823 46.8402 8.06907C46.9556 8.52756 46.8527 9.04319 46.4592 9.43638ZM22.7979 11.3869C15.7015 11.3869 9.92789 17.1605 9.92789 24.2569C9.92789 31.3533 15.7015 37.1269 22.7979 37.1269C29.8943 37.1269 35.6679 31.3533 35.6679 24.2569C35.6679 22.5064 35.3135 20.8384 34.677 19.3164L30.0261 23.9673C30.0299 24.0639 30.0367 24.1596 30.0367 24.2571C30.0367 28.2489 26.7894 31.4962 22.7977 31.4962C18.8059 31.4962 15.5586 28.2486 15.5586 24.2571C15.5586 20.2794 18.7837 17.0419 22.7559 17.0192L27.4976 12.2776C26.0411 11.7035 24.4559 11.3869 22.7979 11.3869ZM43.0702 17.6355C42.4324 18.2734 41.5673 18.6316 40.665 18.6316H38.0628C38.7118 20.3856 39.0692 22.2799 39.0692 24.2567C39.0692 33.2288 31.77 40.528 22.7979 40.528C13.8258 40.528 6.52661 33.2288 6.52661 24.2567C6.52661 15.2845 13.8258 7.9854 22.7979 7.9854C24.7112 7.9854 26.5466 8.32076 28.2524 8.93118V6.219C28.2524 5.31698 28.6107 4.45169 29.2485 3.81384L30.3245 2.7379C27.9669 1.91093 25.4343 1.45901 22.7977 1.45901C10.227 1.45924 0 11.6862 0 24.2569C0 36.8276 10.2272 47.0548 22.7979 47.0548C35.3686 47.0548 45.5958 36.8276 45.5958 24.2569C45.5958 21.5264 45.1114 18.9074 44.2269 16.4791L43.0702 17.6355Z" fill="url(#paint0_linear_1874_3922)"/>
      <defs>
        <linearGradient id="paint0_linear_1874_3922" x1="65.1074" y1="-12.3519" x2="-53.6924" y2="129.566" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFB546"/>
          <stop offset="0.222485" stopColor="#FFB546"/>
          <stop offset="0.303339" stopColor="#E29727"/>
          <stop offset="0.376029" stopColor="#D28615"/>
          <stop offset="0.448225" stopColor="#CA7E0D"/>
          <stop offset="0.51973" stopColor="#F5AA3B"/>
          <stop offset="0.606565" stopColor="#C77B0A"/>
          <stop offset="0.667378" stopColor="#D08413"/>
          <stop offset="0.764676" stopColor="#DF9424"/>
          <stop offset="0.855482" stopColor="#FFB546"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

export default ChallengeDarts