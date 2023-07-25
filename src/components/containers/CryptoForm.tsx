import { FormEvent, useEffect, useState } from 'react'
import * as Yup from 'yup'
import QRCodePlaceHolder from '../../assets/img/qr-kod.png'
import { getIconByPathName } from '../../helpers/iconsHelper'
import { Button } from '../base/Button'
import InputWithLabel from '../base/InputWithLabel'
import { CryptoCalculator } from '../common/CryptoCalculator'
import { CopyIconSecond } from '../icons/CopyIconSecond'
import { useLocation, useOutletContext } from 'react-router-dom'
import { TSocket } from '../../store/SocketStore'
import { useCopyToClipboard } from '../../helpers/hooks/useCopyToClipboard'
import { getToast } from '../../helpers/toast'
import DiamondIcon from '../icons/DiamondIcon'
import CoinsWithDiamond from '../common/CoinsWithDiamond'
import IconContainer from './IconContainer'

enum CryptoFormVariantEnum {
  Withdraw = 'Withdraw',
  Deposit = 'Deposit'
}

interface CryptoFormProps {
  variant?: keyof typeof CryptoFormVariantEnum
}

const CryptoForm = ({ variant = CryptoFormVariantEnum.Deposit }: CryptoFormProps) => {
  const { handleCopyText: setBitcoinAddress, setText, renderText } = useCopyToClipboard()
  const [withdrawAddress, setWithdrawAddress] = useState('')
  const [sendAmount, setSendAmount] = useState(100)
  const [rateCoin, setRateCoin] = useState<number>()
  const {
    pathname,
    state: { type, shortName }
  } = useLocation()
  const { socket } = useOutletContext<{ socket: TSocket }>()

  useEffect(() => {
    if (variant === 'Deposit') {
      socket.emit(`${type as string}`, (err: boolean | string, address: string, rate: number) => {
        if (typeof err === 'string') {
          getToast(err)
        }
        if (!err) {
          setText(address)
          setRateCoin(rate)
        }
      })
    }
  }, [])

  const getLabelByPathName = (pathname: string) => {
    return pathname.split('/')[2]
  }

  const cryptoAddressSchema = Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, 'Withdraw address must be alphanumeric')
    .min(26, 'Withdraw address must be at least 26 characters')
    .max(42, 'Withdraw address must be at most 35 characters')

  const handleWithdrawCrypto = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    cryptoAddressSchema
      .validate(withdrawAddress)
      .then(() => {
        socket.emit(
          'withdraw',
          { type: shortName, address: withdrawAddress, amount: sendAmount },
          (err: string | boolean) => {
            if (typeof err === 'string') {
              getToast(err)
            }
            if (!err) {
              getToast('Withdrawal successful. Wait for funds to arrive')
              setSendAmount(0)
              setWithdrawAddress('')
            }
          }
        )
      })
      .catch((error) => {
        getToast(error.errors[0])
      })
  }

  return (
    <div className="border-t border-b border-t-sky-primary/40 border-b-sky-primary/40 rounded mb-9">
      <div className="border--mask border--radial-blue  bg-gradient-radial from-blue-light-secondary/20 to-blue-accent-secondary/0 rounded text-sm px-3 xxs:px-6 py-9 overflow-hidden relative">
        <div className="relative z-20 text-base">
          <form onSubmit={variant === 'Withdraw' ? handleWithdrawCrypto : () => null}>
            <div className="flex flex-wrap -mx-2 mb-5">
              <div className="relative px-2 w-full xs:w-1/2 md:w-[50%] grow shrink-0 mb-4">
                <InputWithLabel
                  type="text"
                  name="affiliate"
                  label={`${getLabelByPathName(pathname)} Address`}
                  labelClasses="flex flex-col w-full mb-4 items-center capitalize"
                  titleClasses="gradient-blue-secondary text-gray-primary rounded-t-xl py-2 px-5 w-52 text-center inline-block"
                  inputWrapperClasses="bg-dark/25 rounded-xl overflow-hidden w-full"
                  inputSecondWrapperClasses={
                    variant === 'Withdraw'
                      ? 'relative z-10 gradient-blue-secondary flex items-center min-h-[57px] py-2.5 pl-11 pr-3'
                      : null
                  }
                  inputClasses="overflow-ellipsis grow w-0 bg-transparent bg-none border-none outline-none shadow-none leading-5 py-2 mr-12 truncate"
                  placeholder="..."
                  readOnly={variant === 'Deposit'}
                  onChange={(event) => setWithdrawAddress(event.target.value)}
                  value={variant === 'Deposit' ? renderText : withdrawAddress}
                />
                {variant === 'Deposit' && (
                  <div className="absolute z-20 top-[60px] right-4">
                    <Button onClick={setBitcoinAddress} className="w-7 shrink-0" type="button">
                      <CopyIconSecond />
                    </Button>
                  </div>
                )}
                {variant === 'Withdraw' && (
                  <span className="min-w-fit shrink-0 absolute top-[59px] left-6">
                    <img
                      src={getIconByPathName(pathname.split('/')[2])}
                      alt={pathname.split('/')[2]}
                      width="18"
                      height="18"
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                )}
              </div>
              <div className="relative px-2 xs:w-1/2 md:w-[50%] grow shrink-0 mb-4">
                <InputWithLabel
                  type="number"
                  autoComplete="off"
                  label={variant === 'Deposit' ? 'Send Amount' : 'Withdraw Amount'}
                  labelClasses="flex flex-col w-full mb-4 items-center"
                  titleClasses="gradient-blue-secondary text-gray-primary rounded-t-xl py-2 text-center w-52 inline-block"
                  inputWrapperClasses="bg-dark/25 rounded-xl overflow-hidden w-full"
                  inputSecondWrapperClasses="relative z-10 gradient-blue-secondary flex items-center min-h-[57px] py-2.5 pl-10 pr-3"
                  inputClasses="grow bg-transparent bg-dark/25 border-none outline-none leading-5 mr-28 truncate"
                  placeholder="..."
                  value={sendAmount}
                  onChange={(event) => setSendAmount(Number(event.target.value))}
                />
                {variant === 'Deposit' && (
                  <span className="min-w-fit shrink-0 absolute top-[59px] left-6">
                    <img
                      src={getIconByPathName(pathname.split('/')[2])}
                      alt={pathname.split('/')[2]}
                      width="18"
                      height="18"
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                )}
                {variant === 'Withdraw' && (
                  <span className="absolute top-[56px] left-4">
                    <IconContainer>
                      <DiamondIcon />
                    </IconContainer>
                  </span>
                )}
              </div>
            </div>
            <CryptoCalculator rateCoin={rateCoin ?? 1} />
            <div className="flex flex-wrap xs:flex-nowrap justify-center items-center">
              {variant === 'Deposit' && (
                <>
                  <div className="min-w-fit shrink-0 w-28 mx-3 mb-6 xs:mb-0">
                    <img
                      src={QRCodePlaceHolder}
                      alt=""
                      width="115"
                      height="115"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <span className="text-gray-primary text-center grow lg:pr-36">
                    Send only Bitcoin to the address above, or QR code to the left. Do not send any
                    other crypto currency. <br />6 confirmations are required before you are
                    credited to your balance.
                  </span>
                </>
              )}
              {variant === 'Withdraw' && (
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-blue-highlight/0 via-blue-highlight to-blue-highlight/0 w-80 h-px mx-auto shrink-0 mb-7"></div>

                  <div className="text-gray-primary mb-2 font-bold uppercase">
                    YOU ARE WITHDRAWING
                  </div>
                  <div className="flex items-center justify-center mb-7">
                    <CoinsWithDiamond containerSize="Small" typographyQuantity={sendAmount} />
                  </div>
                  <Button type="submit" variant="HighlightDarken" color="BlueHighlight">
                    <div className="flex items-center justify-center px-24 py-3 text-15">
                      <span className="min-w-fit shrink-0 mr-1.5">
                        <DiamondIcon className="w-[20px] h-[17px]" />
                      </span>
                      Withdraw
                    </div>
                  </Button>
                  <div className="mt-7 bg-gradient-to-r from-blue-highlight/0 via-blue-highlight to-blue-highlight/0 w-80 h-px mx-auto shrink-0 mb-7"></div>
                  <div className="font-semibold text-center text-gray-primary mx-auto">
                    Make sure to double check your withdraw address and that it’s the correct one.
                    <br className="hidden xs:inline" /> We’re not responsible for any results of
                    user errors.
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CryptoForm
