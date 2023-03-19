import React, { useState } from 'react'
import { Button } from '../../components/Base/Button'
import AddBoxCard from '../../components/common/Cards/AddBoxCard'
import UnboxingCard from '../../components/common/Cards/UnboxingCard'
import { QuantityCoins } from '../../components/Common/QuantityCoins/QuantityCoins'
import BattleModal from '../../components/Containers/BattleModal'
import PaymentMethodContainer from '../../components/Containers/PaymentMethodContainer'
import DaggersGreenGradient from '../../components/Icons/DaggersGreenGradient'
import UnboxingIconTitle from '../../components/Icons/UnboxingIconTitle'
import VerticalDivider from '../../components/Icons/VerticalDivider'
import NavHeader from '../../components/Navigate/NavHeader'
import { IUnboxCard } from '../../types/itemCard'

const CreateBattle = () => {
  const [isOpenModal, setOpenModal] = useState(false)
  const [casesBetted, setCasesToBet] = useState<IUnboxCard[]>([])
  return (
        <div className ="max-w-1190 w-full mx-auto">
          <NavHeader
            title='Battle Creation'
            renderIcon={() => <DaggersGreenGradient iconClasses='w-[25px] h-[25px] ml-2' />}
            ><div>
                <div className="flex flex-wrap items-center ">
                  <div className=' flex items-center mb-3 xxs:mb-0'>
                    <div className="w-4 shrink-0 mr-2.5 text-blue-golf">
                      <UnboxingIconTitle iconClasses='w-[17px] h-[17px]' />
                    </div>
                    <div className="text-gray-primary font-semibold shrink-0">
                      <span className="text-white">3</span> Cases
                    </div>
                    <div className="w-px shrink-0 mx-4">
                      <VerticalDivider />
                    </div>
                  </div>
                    <div className='flex items-center mt-3 xxs:mt-0'>
                      <span className="text-gray-primary mr-2.5 font-semibold">Total cost</span>
                      <div className="bg-green-primary/15 flex items-center p-1.5 pr-4 rounded">
                        <QuantityCoins quantity={1500} />
                      </div>
                      <div className="w-px shrink-0 mx-4">
                        <VerticalDivider />
                      </div>
                    </div>
                    <div className=' w-full flex justify-end xxs:w-fit mt-3 xxs:mt-0 '>
                      <Button
                        onClick={() => []}
                        className="bg-green-primary hover:bg-green-500  border border-green-primary py-2 px-7 leading-4 rounded "
                        >Create
                      </Button>
                    </div>
                </div>
              </div>
          </NavHeader>
          <PaymentMethodContainer>
            <AddBoxCard openModal={() => setOpenModal(true)} />
            {casesBetted.map((card) => (<UnboxingCard key={card.id} id={card.id} name={card.name} price={card.price} onSelect={() => { }} />)) }
          </PaymentMethodContainer>
          <BattleModal
            isOpen={isOpenModal}
            onSubmit={setCasesToBet}
            onClose={() => setOpenModal(false)}
             />
        </div>
  )
}

export default CreateBattle
