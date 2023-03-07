import { useEffect, useMemo, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../../components/base/Button'
import DiamondIcon from '../../components/icons/DiamondIcon'
import TriangleArrow from '../../components/icons/TriangleArrow'
import { IMAGES } from '../../constants/Images'
import SearchIcon from '../../components/icons/SearchIcon'
import GreenTipSelect from '../../components/common/GreenTipSelect'
import WithdrawMethod from './WithdrawMethod'
import { useDebounce } from '../../helpers/hooks/useDebounce'
import { IItemCard } from '../../types/itemCard'
import { ISortOptions } from '../../types/sortOptions'
import SortSelect from '../../components/common/SortSelect'

const sortingVariants: ISortOptions [] = [{ title: 'High to low', direction: 'DESC' }, { title: 'Low to high', direction: 'ASC' }]

export const Withdraw = () => {
  const [sortOptions, setSortOptions] = useState<ISortOptions>(sortingVariants[0])
  const [selectedCards, setSelectedCard] = useState<IItemCard[]>([])
  const [inputSearchValue, setSearchValue] = useState('')
  const [searchBy, setSearchBy] = useState('')

  const navigate = useNavigate()
  const { pathname } = useLocation()
  const debounce = useDebounce(500)

  const endPath = pathname.split('/')[2]

  const contextOutlet = useMemo(() => ({ direction: sortOptions.direction, searchBy, selectedCards, setSelectedCard }), [searchBy, sortOptions, selectedCards])

  useEffect(() => {
    debounce(() => setSearchBy(inputSearchValue))
  }, [inputSearchValue])

  const getNavBarTools = () => {
    switch (endPath) {
      case 'roblox-limiteds':
        return (<>
        <div className='flex flex-wrap gap-x-3'>
          <div className=' relative mb-8'>
            <SortSelect options={sortingVariants} onSelect={setSortOptions} currentOptions={sortOptions}/>
          </div>
          <GreenTipSelect onSelect={() => []} />
          <div className=" bg-blue-accent-secondary/25 border border-blue-highlight rounded text-gray-primary w-full xxs:w-40 flex items-center h-[34px] py-1 px-2  mr-2.5">
            <div className="mr-2 w-3.5 shrink-0">
              <SearchIcon/>
            </div>
            <input
              type="text"
              placeholder="Search item"
              value={inputSearchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="grow w-0 mr-2 focus:text-white bg-transparent bg-none border-none outline-none shadow-none" />
          </div>
        </div>
        <div className='max-h-[34px] flex items-center mt-5 md:mt-0 font-semibold xs:text-base'>
          <span className='mr-3'>You have selected</span>
            <span className="bg-blue-accent-secondary text-gray-primary font-semibold py-1 px-3 rounded flex items-center border border-transparent">
              <span className="min-w-fit mr-2">
                <img src={IMAGES.robloxDeposite} alt="hats" width="31" height="19" loading="lazy" decoding="async"/>
              </span>
              Roblox Limiteds
            </span>
        </div>
      </>
        )
      case 'robux':
        return (
          <div className='max-h-[34px] flex items-center mt-5 md:mt-0 font-semibold xs:text-base'>
          <span className='mr-3'>You have selected</span>
          <span className="bg-blue-accent-secondary text-gray-primary font-semibold py-1 px-3 rounded flex items-center">
            <span className="min-w-fit mr-2">
              <img src={IMAGES.robuxDeposite} alt="emeralds" width="31" height="19" loading="lazy" decoding="async"/>
            </span>
            Robux
          </span>
        </div>)
      default:
        return null
    }
  }
  return (
    <div className='min-h-screen flex flex-col sm:flex-row'>
      <div className=' w-full'>
        <div className='flex flex-col xs:flex-row max-w-[1470px] mx-auto'>
          <div className=' w-full flex flex-wrap justify-between mb-8'>
            <div className="flex items-center gap-4 mb-8">
              <Button
                onClick={() => navigate(-1)}
                className='flex items-center justify-center font-semibold p-2 leading-4 gap-1.5 group text-gray-primary rounded bg-blue-accent-secondary hover:bg-blue-accent border border-transparent '
              >
                <TriangleArrow iconClasses='rotate-90' />
                <span className='group-hover:text-white'>Back</span>
              </Button>
              <DiamondIcon className='w-[29px] h-[25px] text-green-secondary ml-2' />
              <h3 className='text-2xl font-bold mr-6 md:mr-0 '>Withdraw</h3>
            </div>
            {getNavBarTools()}
          </div>
          {endPath === 'roblox-limiteds' && <div className='flex items-end  lg:ml-5 lg:items-start pb-8'>
           <Button
              onClick={() => console.log(selectedCards)}
              className='pointer-events-auto flex justify-center items-center leading-9 text-gray-primary text-base font-bold rounded px-2.5 py-1 bg-blue-highlight hover:bg-blue-accent w-64 shrink-0'
              >
                <DiamondIcon className='w-[21px] h-[17px] mr-2' />
                <span>Withdraw</span></Button>
              </div>}
        </div>
        { pathname === '/withdraw' ? <WithdrawMethod /> : <Outlet context={contextOutlet}/>}
      </div>
    </div>
  )
}
