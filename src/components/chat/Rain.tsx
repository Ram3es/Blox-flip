import Logo from '../../assets/img/logo-gametery.svg'
import RainBg from '../../assets/img/rain/rainStripesBg.png'
import RainBtnBg from '../../assets/img/rain/rainBtnBg.svg'
import CoinsWithDiamond from '../common/CoinsWithDiamond'
import { useSocketCtx } from '../../store/SocketStore'
import { useEffect, useState } from 'react'

const Rain = () => {
  const { socket } = useSocketCtx()
  const [isJoined, setIsJoined] = useState(false)
  const [rainAmount, setRainAmount] = useState(0)
  const [isRainStarted, setIsRainStarted] = useState(false)

  const checkAndCallFunction = (serverUnixTimestamp: number) => {
    // Get the current Unix timestamp
    const currentUnixTimestamp = Math.floor(Date.now() / 1000)
    // Calculate the time difference in seconds
    const timeDifference = serverUnixTimestamp - currentUnixTimestamp

    if (timeDifference <= 0) {
      setTimeout(() => setIsRainStarted(false), (timeDifference + 10) * 1000)
    } else {
      setIsRainStarted(true)
    }
  }

  const joinRain = () => {
    socket.emit('join_rain', { captcha: '' }, () => {
      setIsJoined(true)
    })
  }

  useEffect(() => {
    socket.on('rain_show', (res: any) => {
      if (res.amount && res.unix_timestamp) {
        setRainAmount(res.amount)
        checkAndCallFunction(res.unix_timestamp)
      }
    })
    return () => {
      socket.off('rain_show')
    }
  }, [])

  return (
    <>{isRainStarted
      ? <div className="flex flex-col rain-wrapper relative">
      <div
        className="py-2 px-4 flex justify-between items-center bg-cover"
        style={{ backgroundImage: `url(${RainBg})` }}
      >
        <img
          src={Logo}
          alt="Logo"
          loading="lazy"
          decoding="async"
          className="w-[106px]"
        />
        <div className="flex flex-col h-full justify-around gap-2">
          {isJoined
            ? <span className="gradient-ggreen-text font-black text-13">
            RAIN PAYOUT
          </span>
            : ''}
          <div className=" rounded-[3px] px-1 py-0.5 balance">
            <CoinsWithDiamond containerSize="Small" typographyQuantity={rainAmount} />
          </div>
          {!isJoined
            ? <button
            className="w-20 h-9 py-1 flex items-end justify-center font-black text-13 bg-cover"
            style={{ backgroundImage: `url(${RainBtnBg})` }}
            onClick={joinRain}
          >
            CLAIM
          </button>
            : ''}
        </div>
      </div>
      <div
        className="flex w-full justify-between items-center px-4 py-1"
        style={{
          background:
            'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(254deg, rgba(44, 221, 104, 0.44) -9.45%, rgba(0, 0, 0, 0.00) 90.21%), #20253E'
        }}
      >
        <div className="hosted-btn">
          <div
            className="px-2 py-1 flex flex-row gap-2 items-center"
            style={{ backgroundImage: `url(${RainBg})` }}
          >
            <svg
              width="17"
              height="18"
              viewBox="0 0 17 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.3544 2.88091C13.3256 2.88091 13.2966 2.88128 13.2674 2.882C12.886 2.10842 12.314 1.44655 11.5966 0.952631C10.7524 0.371435 9.7625 0.064209 8.73401 0.064209C7.6869 0.064209 6.68224 0.381782 5.82864 0.982516C5.1179 1.48274 4.55484 2.14699 4.18172 2.9207C4.00421 2.89422 3.82504 2.88094 3.64562 2.88094C1.63542 2.88091 0 4.51636 0 6.52653C0 8.53671 1.63542 10.1722 3.64562 10.1722H13.3544C15.3646 10.1722 17 8.53674 17 6.52653C17 4.51633 15.3646 2.88091 13.3544 2.88091Z"
                fill="white"
              />
              <path
                d="M5.19475 15.2671C4.92166 15.1804 4.63013 15.3315 4.54343 15.6046L4.15874 16.8163C4.07204 17.0893 4.22314 17.3809 4.49615 17.4676C4.54837 17.4842 4.60123 17.4921 4.65324 17.4921C4.87319 17.4921 5.07738 17.351 5.14747 17.1302L5.53213 15.9184C5.61882 15.6454 5.46773 15.3538 5.19475 15.2671Z"
                fill="#2CDD68"
              />
              <path
                d="M8.65715 15.2671C8.38413 15.1804 8.09253 15.3315 8.00583 15.6046L7.62114 16.8163C7.53444 17.0893 7.68554 17.3809 7.95856 17.4676C8.01077 17.4842 8.06363 17.4921 8.11564 17.4921C8.33559 17.4921 8.53979 17.351 8.60987 17.1302L8.99457 15.9184C9.08123 15.6454 8.93017 15.3538 8.65715 15.2671Z"
                fill="#2CDD68"
              />
              <path
                d="M12.1186 15.2671C11.8457 15.1804 11.554 15.3315 11.4673 15.6046L11.0826 16.8163C10.9959 17.0893 11.147 17.3809 11.42 17.4676C11.4722 17.4842 11.5251 17.4921 11.5771 17.4921C11.797 17.4921 12.0012 17.351 12.0713 17.1302L12.456 15.9184C12.5427 15.6455 12.3916 15.3538 12.1186 15.2671Z"
                fill="#2CDD68"
              />
              <path
                d="M3.84807 11.6507C3.57505 11.564 3.28345 11.7151 3.19675 11.9881L2.81206 13.1998C2.72536 13.4728 2.87646 13.7644 3.14947 13.8511C3.20169 13.8677 3.25455 13.8756 3.30656 13.8756C3.52651 13.8756 3.7307 13.7345 3.80079 13.5137L4.18548 12.302C4.27218 12.0289 4.12108 11.7373 3.84807 11.6507Z"
                fill="#2CDD68"
              />
              <path
                d="M7.30998 11.6507C7.03693 11.564 6.74536 11.7151 6.65867 11.9881L6.27397 13.1998C6.18728 13.4728 6.33837 13.7644 6.61139 13.8511C6.6636 13.8677 6.71646 13.8756 6.76847 13.8756C6.98843 13.8756 7.19262 13.7345 7.2627 13.5137L7.64736 12.302C7.73402 12.0289 7.58296 11.7373 7.30998 11.6507Z"
                fill="#2CDD68"
              />
              <path
                d="M10.7724 11.6507C10.4993 11.564 10.2078 11.7151 10.1211 11.9881L9.73637 13.1998C9.64968 13.4728 9.80077 13.7644 10.0738 13.8511C10.126 13.8677 10.1789 13.8756 10.2309 13.8756C10.4508 13.8756 10.655 13.7345 10.7251 13.5137L11.1098 12.302C11.1965 12.0289 11.0454 11.7373 10.7724 11.6507Z"
                fill="#2CDD68"
              />
              <path
                d="M14.2348 11.6507C13.9617 11.564 13.6702 11.7151 13.5835 11.9881L13.1988 13.1998C13.1121 13.4728 13.2632 13.7644 13.5362 13.8511C13.5884 13.8677 13.6413 13.8756 13.6933 13.8756C13.9132 13.8756 14.1174 13.7345 14.1875 13.5137L14.5722 12.302C14.6588 12.0289 14.5078 11.7373 14.2348 11.6507Z"
                fill="#2CDD68"
              />
            </svg>
            <span className="gradient-ggreen-text font-black text-13">
              RAIN PAYOUT
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <svg
            width="15"
            height="12"
            viewBox="0 0 15 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 11.25C15 11.4489 14.9282 11.6397 14.8003 11.7803C14.6724 11.921 14.499 12 14.3182 12H6.13636C5.95553 12 5.78211 11.921 5.65425 11.7803C5.52638 11.6397 5.45455 11.4489 5.45455 11.25C5.45455 10.0565 5.88555 8.91193 6.65275 8.06802C7.41994 7.22411 8.46048 6.75 9.54545 6.75H10.9091C11.9941 6.75 13.0346 7.22411 13.8018 8.06802C14.569 8.91193 15 10.0565 15 11.25ZM10.2273 0C9.68787 0 9.16058 0.175947 8.71208 0.505591C8.26358 0.835235 7.91402 1.30377 7.7076 1.85195C7.50118 2.40013 7.44717 3.00333 7.5524 3.58527C7.65764 4.16721 7.91738 4.70176 8.2988 5.12132C8.68022 5.54088 9.16617 5.8266 9.69521 5.94236C10.2242 6.05811 10.7726 5.9987 11.271 5.77164C11.7693 5.54458 12.1952 5.16006 12.4949 4.66671C12.7946 4.17336 12.9545 3.59334 12.9545 3C12.9545 2.20435 12.6672 1.44129 12.1557 0.87868C11.6443 0.31607 10.9506 0 10.2273 0ZM4.09091 0C3.55151 0 3.02422 0.175947 2.57572 0.505591C2.12722 0.835235 1.77766 1.30377 1.57124 1.85195C1.36482 2.40013 1.31081 3.00333 1.41604 3.58527C1.52127 4.16721 1.78102 4.70176 2.16244 5.12132C2.54385 5.54088 3.02981 5.8266 3.55884 5.94236C4.08788 6.05811 4.63625 5.9987 5.13459 5.77164C5.63294 5.54458 6.05888 5.16006 6.35855 4.66671C6.65823 4.17336 6.81818 3.59334 6.81818 3C6.81818 2.20435 6.53085 1.44129 6.01938 0.87868C5.50792 0.31607 4.81423 0 4.09091 0ZM4.09091 11.25C4.0899 10.4622 4.23099 9.68202 4.50603 8.95464C4.78107 8.22725 5.18458 7.56713 5.69318 7.0125C5.27696 6.83964 4.83581 6.75072 4.39091 6.75H3.79091C2.78605 6.75198 1.82287 7.19196 1.11232 7.97355C0.401779 8.75515 0.00180244 9.81466 0 10.92V11.25C0 11.4489 0.0718342 11.6397 0.1997 11.7803C0.327566 11.921 0.500989 12 0.681818 12H4.21364C4.13426 11.7595 4.09275 11.5059 4.09091 11.25Z"
              fill="#2CDD68"
            />
          </svg>
          0
        </div>
      </div>
    </div>
      : ''} </>
  )
}

export default Rain
