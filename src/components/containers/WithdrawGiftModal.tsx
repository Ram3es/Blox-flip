import { useCopyToClipboard } from '../../helpers/hooks/useCopyToClipboard'
import { getToast } from '../../helpers/toast'
import { Button } from '../base/Button'
import CheckMarkRoundedIcon from '../icons/CheckMarkRoundedIcon'
import { CopyIconSecond } from '../icons/CopyIconSecond'
import DiamondIcon from '../icons/DiamondIcon'
import ModalWrapper from './ModalWrapper'

interface WithdrawGiftModalProps {
  handleClose: () => void
  code: string
  image: string
}

const WithdrawGiftModal = ({ handleClose, code, image }: WithdrawGiftModalProps) => {
  const { handleCopyText } = useCopyToClipboard(code)

  return (
    <ModalWrapper
      closeModal={handleClose}
      modalClasses="relative py-6 px-4 xs:px-6 shadow-dark-15 rounded-2xl gradient-blue-primary relative w-4/5 sm:max-w-4xl sm:w-full m-auto overflow-hidden"
    >
      <div className="flex flex-col gap-9">
        <div className="flex justify-center items-center gap-2 xs:gap-4">
          <DiamondIcon className="xs:w-[42px] xs:h-[35px] text-green-secondary" />
          <span className="xs:text-4xl font-extrabold uppercase">Withdraw</span>
        </div>
        <div className="h-[1px] w-full bg-blue-accent-primary" />
        <div className="grid grid-cols-[0.5fr_1fr] xs:grid-cols-[0.3fr_1fr] grid-rows-[1.3fr_1px_0.7fr] rounded-xl bg-gradient-gift-card pr-12">
          <div className="row-span-3">
            <img className="w-full h-full rounded-md" src={image} alt="gift box" />
          </div>
          <Button
            className="padding-2 xs:p-0 text-gray-secondary-light font-semibold xs:text-22 cursor-pointer flex items-center justify-center gap-4"
            onClick={(e) => {
              handleCopyText(e)
              getToast('copied code successful')
            }}
          >
            <span>{code}</span>
            <CopyIconSecond className="hidden xs:block" />
          </Button>
          <div className="mx-6 col-start-2 h-[1px] w-full bg-blue-accent-primary" />
          <div className="p-2 xs:p-0 col-start-2 row-start-3 text-green-accent-secondary gap-[7px] flex items-center justify-center">
            <CheckMarkRoundedIcon className="hidden xs:block" />
            <span className="font-semibold xs:text-lg">
              This gift card has now been claimed, congratulations!
            </span>
          </div>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default WithdrawGiftModal
