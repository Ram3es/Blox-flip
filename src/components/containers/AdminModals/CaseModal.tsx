import { Form, Formik } from 'formik'
import clsx from 'clsx'

import { Button } from '../../base/Button'

import ModalWrapper from '../ModalWrapper'
import InputWithInlineLabel from '../../common/InputWithInlineLabel'
import ActionModalHeader from './ActionModalHeader'
import SelectWithInlineLabel from '../../common/SelectWithInlineLabel'

import { ICaseAdminItem } from '../../../types/CaseAdmin'
import { Tab } from '@headlessui/react'
import { useCallback, useState } from 'react'
import { cards } from '../../../mocks/cards'
import ItemCard from '../../common/Cards/ItemCard'
import { IItemCard } from '../../../types/ItemCard'
import { getCostByFieldName } from '../../../helpers/numbers'
import CoinsWithDiamond from '../../common/CoinsWithDiamond'
import RefreshIcon from '../../icons/RefreshIcon'

interface CaseModalProps {
  handleClose: () => void
  caseData: ICaseAdminItem | null
}

const CaseModal = ({ handleClose, caseData }: CaseModalProps) => {
  const [tabIndex, setTabIndex] = useState(0)

  const [skins, setSkins] = useState<IItemCard[]>(cards)

  const selectedSkins = skins.filter((skin) => skin.isSelected)

  const updateArrayBySelectedSkin = (skins: IItemCard[], skinId: string, isSelected: boolean) => {
    return skins.map((skin) => (skin.id === skinId ? { ...skin, isSelected } : skin))
  }

  const isItemSelected = (skins: IItemCard[], skinId: string) => {
    return skins.some((skin) => skin.id === skinId && skin.isSelected)
  }

  const findSkinByItemId = (skinId: string) => skins.find((skin) => skin.id === skinId)

  const handleSelectSkin = useCallback(
    (skinId: string) => {
      const skin = findSkinByItemId(skinId)

      if (!skin) return

      const isSelected = isItemSelected(skins, skin.id)

      setSkins((prev) => updateArrayBySelectedSkin(prev, skinId, !isSelected))
    },
    [skins]
  )

  const handleResetSelectedSkins = useCallback(() => {
    setSkins(skins.map((skin) => ({ ...skin, isSelected: false })))
  }, [])

  const getCostInSelectedSkins = (): number => {
    return getCostByFieldName(selectedSkins, 'price')
  }

  const getSelectedSkinsIds = (selectedSkins: IItemCard[]) => {
    return selectedSkins.map((skin) => skin.id)
  }

  return (
    <ModalWrapper
      closeModal={handleClose}
      modalClasses="h-5/6 relative py-5 px-4 xs:px-6 shadow-dark-15 rounded-2xl gradient-blue-primary relative max-w-4xl w-full m-auto space-y-4 overflow-hidden">
      <ActionModalHeader>
        <span className="font-black text-3xl capitalize text-gradient-gold">
          {caseData ? 'Change Case' : 'Create Case'}
        </span>
      </ActionModalHeader>
      <Tab.Group selectedIndex={tabIndex} onChange={setTabIndex}>
        <Tab.List className="flex">
          <Tab
            className={clsx(
              'capitalize font-semibold text-17 w-full h-11 border-b-[1px] flex items-center justify-center',
              {
                'text-blue-golf border-blue-golf bg-blue--golf': tabIndex === 0,
                'text-gray-primary border-blue-light-primary': tabIndex !== 0
              }
            )}>
            General
          </Tab>
          <Tab
            className={clsx(
              'capitalize font-semibold text-17 w-full h-11 border-b-[1px] flex items-center justify-center',
              {
                'text-blue-golf border-blue-golf bg-blue--golf': tabIndex === 1,
                'text-gray-primary border-blue-light-primary': tabIndex !== 1
              }
            )}>
            Cases
          </Tab>
        </Tab.List>
        <Formik
          initialValues={{
            caseName: caseData?.caseName ?? '',
            selectedCategory: caseData?.category ?? '',
            casePrice: caseData?.price ?? '0',
            image: caseData?.image ?? '...'
          }}
          onSubmit={(values) => {
            console.log(values)
            handleClose()
          }}>
          {({ handleChange, values }) => (
            <Form>
              <div className="space-y-4">
                <Tab.Panels>
                  <Tab.Panel>
                    <div className="py-4 space-y-3 h-[340px]">
                      <InputWithInlineLabel
                        value={values.caseName}
                        onChange={handleChange('caseName')}
                        type="text"
                        placeholder="..."
                        label="Case Name"
                      />
                      <SelectWithInlineLabel
                        value={values.selectedCategory}
                        label="Select Category"
                        onChange={handleChange('selectedCategory')}
                        options={['Not best category', 'Best category', 'None', 'level cases']}
                      />
                      <InputWithInlineLabel
                        value={values.casePrice}
                        onChange={handleChange('casePrice')}
                        type="number"
                        placeholder="..."
                        label="Case price"
                        withIcon
                      />
                      <InputWithInlineLabel
                        value={values.image}
                        onChange={handleChange('image')}
                        type="text"
                        placeholder="..."
                        label="Image Url"
                      />
                    </div>{' '}
                  </Tab.Panel>
                  <Tab.Panel>
                    <div className="h-[340px] space-y-2">
                      <div className="flex items-center justify-end gap-2">
                        <div className="flex items-center gap-3">
                          <span className="text-gray-primary text-sm font-semibold hidden xs:block">
                            Total selected
                          </span>
                          <div className="h-9 bg-blue-ocean-secondary/25 border-2 border-blue-ocean-secondary/50 px-3  md:px-4 rounded font-bold text-sm flex items-center justify-between">
                            {selectedSkins.length}/
                            <span className="text-white/60">{skins.length}</span>
                            <span className="text-gray-primary uppercase font-semibold text-xs hidden xs:block">
                              &nbsp;skins
                            </span>
                          </div>
                          <CoinsWithDiamond
                            containerColor="GreenGradientSecondary"
                            containerSize="Large"
                            typographyQuantity={getCostInSelectedSkins()}
                            typographyFontSize="Size16"
                          />
                        </div>
                        <Button type="button" onClick={handleResetSelectedSkins}>
                          <RefreshIcon />
                        </Button>
                      </div>
                      <div className="h-[280px] gap-1 flex flex-wrap justify-center overflow-y-auto scrollbar-thumb-blue-secondary scrollbar-track-blue-darken/40 scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-full">
                        {skins.map((caseItem) => (
                          <ItemCard
                            variant="CaseAdminItem"
                            key={caseItem.id}
                            onSelect={handleSelectSkin}
                            {...caseItem}
                            />
                        ))}
                      </div>
                    </div>
                  </Tab.Panel>
                </Tab.Panels>
                <div className="flex items-center justify-center gap-4">
                  <Button color="BlueAccentPrimary" type="button" onClick={handleClose}>
                    <span className="px-3 py-2.5 text-gray-primary">Cancel</span>
                  </Button>
                  <Button color="GreenPrimary" type="submit">
                    <span className="px-3 py-2.5">
                      {caseData ? 'Save Settings' : 'Create Case'}
                    </span>
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Tab.Group>
    </ModalWrapper>
  )
}

export default CaseModal
