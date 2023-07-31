import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import clsx from 'clsx'

import { Button } from '../../base/Button'

import ModalWrapper from '../ModalWrapper'
import InputWithInlineLabel from '../../common/InputWithInlineLabel'
import ActionModalHeader from './ActionModalHeader'

import { Tab } from '@headlessui/react'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import ItemCard from '../../common/Cards/ItemCard'
import { getCostByFieldName } from '../../../helpers/numbers'
import CoinsWithDiamond from '../../common/CoinsWithDiamond'
import RefreshIcon from '../../icons/RefreshIcon'
import { useSocketCtx } from '../../../store/SocketStore'
import { toast } from 'react-toastify'
import { IRootCaseItem, IRootMarketItem } from '../../../types/Cases'
import DiamondIcon from '../../icons/DiamondIcon'
import { getToast } from '../../../helpers/toast'
import { getRandomId } from '../../../helpers/casesHelpers'
import InputWithLabel from '../../base/InputWithLabel'
import IconContainer from '../IconContainer'

interface CaseAdminModalProps {
  handleClose: () => void
  caseData: IRootCaseItem | null
}

interface SkinInterface extends IRootMarketItem {
  isSelected: boolean
}

interface SkinInCase extends SkinInterface {
  chanceInCase?: number
  priceInCase?: number
}

const CaseAdminModal = ({ handleClose, caseData }: CaseAdminModalProps) => {
  const { socket } = useSocketCtx()
  const [tabIndex, setTabIndex] = useState(0)
  const [skins, setSkins] = useState<SkinInCase[]>([])

  const selectedSkins = useMemo(() => skins.filter((skin) => skin.isSelected), [skins])

  const handleSelectSkin = useCallback(
    (skinId: number) => {
      setSkins((prev) => {
        return prev.map((item) => {
          if (item.id === skinId) {
            return { ...item, isSelected: !item.isSelected }
          }
          return item
        })
      })
    },
    [skins]
  )

  const handleResetSelectedSkins = useCallback(() => {
    setSkins([])
    loadItems()
  }, [])

  const getCostInSelectedSkins = (): number => {
    return getCostByFieldName(selectedSkins, 'price')
  }

  const getSkinsIds = (skins: SkinInterface[]) => {
    return skins.map((skin) => skin.id)
  }

  const loadItems = () => {
    socket.emit('load_all_items', (error: boolean | string, skins: IRootMarketItem[]) => {
      if (typeof error === 'string') {
        getToast(error)
      }

      if (!error) {
        if (!caseData) {
          setSkins(
            skins.map((skin) => ({
              ...skin,
              isSelected: false,
              chanceInCase: 1,
              priceInCase: skin.price
            }))
          )
        }
        if (caseData) {
          setSkins(
            // return mergedArray
            skins.map((skin) => {
              const isAlreadySelected = caseData.items.find(
                (selectedItem) => skin.id === selectedItem.id
              )

              return {
                ...skin,
                isSelected: typeof isAlreadySelected !== 'undefined'
              }
            })
          )
        }
      }
    })
  }

  useEffect(() => {
    loadItems()
  }, [])

  const caseSchema = Yup.object({
    caseName: Yup.string()
      .min(2, 'Case Name must be at least 2 characters')
      .required('Case Name Required'),
    shortName: Yup.string()
      .min(2, 'Short Case Name must be at least 2 characters')
      .required('Short Name Required'),
    casePrice: Yup.number()
      .min(1, 'Case price must be greater than 0')
      .required('Case Price Required'),
    image: Yup.string().url('Invalid URL').required('Image Required')
  })

  console.log(selectedSkins)

  return (
    <ModalWrapper
      closeModal={handleClose}
      modalClasses="h-5/6 relative py-5 px-4 xs:px-6 shadow-dark-15 rounded-2xl gradient-blue-primary relative max-w-4xl w-full m-auto space-y-4 overflow-y-auto scrollbar-thumb-blue-secondary scrollbar-track-blue-darken/40 scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-full"
    >
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
            )}
          >
            General
          </Tab>
          <Tab
            className={clsx(
              'capitalize font-semibold text-17 w-full h-11 border-b-[1px] flex items-center justify-center',
              {
                'text-blue-golf border-blue-golf bg-blue--golf': tabIndex === 1,
                'text-gray-primary border-blue-light-primary': tabIndex !== 1
              }
            )}
          >
            Skins
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <Formik
              initialValues={{
                caseName: caseData?.name ?? '',
                shortName: caseData?.short ?? '',
                casePrice: getCostInSelectedSkins() ?? '0',
                image: caseData?.img ?? '',
                formikSkins: selectedSkins
              }}
              onSubmit={(values, { setSubmitting, setFieldValue }) => {
                caseSchema
                  .validate(values, { abortEarly: false })
                  .then(() => {
                    if (getSkinsIds(selectedSkins).length >= 1) {
                      socket.emit(
                        'create_case',
                        {
                          name: values.caseName,
                          short: values.shortName,
                          image: values.image,
                          cost: values.casePrice,
                          skins: values.formikSkins.map((skin) => ({
                            name: skin.name,
                            image: skin.image,
                            price: skin.priceInCase,
                            chance: skin.chanceInCase
                          }))
                        },
                        (error: string | boolean) => {
                          if (typeof error === 'string') {
                            toast.error(error)
                          }
                          if (!error) {
                            getToast('Case created successful')
                            handleClose()
                          }
                        }
                      )
                    } else {
                      getToast('Please select minimum 1 skin')
                    }
                  })
                  .catch((errors) => {
                    console.log(errors)
                    const messages = errors.inner.join(', ')
                    getToast(messages)
                  })
                  .finally(() => {
                    setSubmitting(false)
                  })
              }}
            >
              {({ handleChange, values, setFieldValue, setFieldTouched }) => (
                <Form>
                  <div className="space-y-4">
                    <div className="py-4 space-y-3">
                      <InputWithInlineLabel
                        value={values.caseName}
                        onChange={handleChange('caseName')}
                        type="text"
                        placeholder="..."
                        label="Case Name"
                      />
                      <InputWithInlineLabel
                        value={values.shortName}
                        onChange={handleChange('shortName')}
                        type="text"
                        placeholder="..."
                        label="Short Case Name"
                      />
                      <InputWithInlineLabel
                        value={values.casePrice}
                        onChange={handleChange('casePrice')}
                        type="number"
                        placeholder="..."
                        label="Case price"
                        icon={
                          <div className="relative w-6 h-6 text-center leading-6 shrink-0 bg-green-primary/20 rounded text-green-primary">
                            <DiamondIcon className="-inset-full absolute m-auto" />
                          </div>
                        }
                      />
                      <InputWithInlineLabel
                        value={values.image}
                        onChange={handleChange('image')}
                        type="text"
                        placeholder="..."
                        label="Image Url"
                      />
                      <div className="grid grid-cols-6 w-full gap-y-2">
                        {selectedSkins.map((caseItem, index) => (
                          <div key={caseItem.name} className="flex flex-col gap-2 h-full p-2">
                            <ItemCard
                              variant="CaseAdminItem"
                              image={caseItem.image}
                              color={caseItem.color}
                              price={caseItem.price}
                              id={caseItem.id}
                              name={caseItem.name}
                            />
                            <InputWithLabel
                              type="number"
                              placeholder="..."
                              value={values.formikSkins[index].chanceInCase ?? 0}
                              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setFieldValue(
                                  `formikSkins.${index}.chanceInCase`,
                                  Number(event.target.value)
                                )
                              }}
                              labelClasses="flex flex-col"
                              label="Chance %"
                            />
                            <div className="relative">
                              <InputWithLabel
                                labelClasses="flex flex-col"
                                type="number"
                                label="Price in case"
                                placeholder="..."
                                value={values.formikSkins[index].priceInCase ?? 0}
                                inputSecondWrapperClasses="relative z-10 gradient-blue-secondary flex items-center min-h-[57px] py-2.5 pl-10 pr-3"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                  setFieldValue(
                                    `formikSkins.${index}.priceInCase`,
                                    Number(event.target.value)
                                  )
                                }}
                              />
                              <span className="absolute top-[48px] left-2">
                                <IconContainer>
                                  <DiamondIcon />
                                </IconContainer>
                              </span>
                            </div>

                            <Button color="RedLight" onClick={() => handleSelectSkin(caseItem.id)}>
                              <span className="h-12 flex items-center justify-center w-full">
                                Delete
                              </span>
                            </Button>
                          </div>
                        ))}
                      </div>
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
                  </div>
                </Form>
              )}
            </Formik>
          </Tab.Panel>
          <Tab.Panel>
            <div className="space-y-2">
              <div className="flex items-center justify-end gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-gray-primary text-sm font-semibold hidden xs:block">
                    Total selected
                  </span>
                  <div className="h-9 bg-blue-ocean-secondary/25 border-2 border-blue-ocean-secondary/50 px-3  md:px-4 rounded font-bold text-sm flex items-center justify-between">
                    {selectedSkins.length}/<span className="text-white/60">{skins.length}</span>
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
              <div className="h-[300px] ls:h-[400px] lg:h-[500px] gap-1 flex flex-wrap justify-center overflow-y-scroll scrollbar-thumb-blue-secondary scrollbar-track-blue-darken/40 scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-full">
                {skins.map((caseItem) => (
                  <ItemCard
                    variant="CaseAdminItem"
                    key={getRandomId()}
                    onSelect={handleSelectSkin}
                    {...caseItem}
                  />
                ))}
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </ModalWrapper>
  )
}

export default memo(CaseAdminModal)
