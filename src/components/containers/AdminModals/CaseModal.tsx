import { Form, Formik } from 'formik'

import { Button } from '../../base/Button'

import ModalWrapper from '../ModalWrapper'
import InputWithInlineLabel from '../../common/InputWithInlineLabel'
import ActionModalHeader from './ActionModalHeader'
import SelectWithInlineLabel from '../../common/SelectWithInlineLabel'
import UploaderWithInlineLabel from '../../common/UploaderWithInlineLabel'

import { ICaseAdminItem } from '../../../types/CaseAdmin'

interface CaseModalProps {
  handleClose: () => void
  caseData: ICaseAdminItem | null
}

const CaseModal = ({ handleClose, caseData }: CaseModalProps) => {
  return (
    <ModalWrapper
      closeModal={handleClose}
      modalClasses='relative py-5 px-4 xs:px-6 shadow-dark-15 rounded-2xl gradient-blue-primary relative max-w-4xl w-full m-auto overflow-hidden'
    >
      <ActionModalHeader>
        <span className='font-black text-3xl capitalize text-gradient-gold'>{caseData ? 'Change Case' : 'Create Case'}</span>
      </ActionModalHeader>
      <Formik
        initialValues={{
          caseName: caseData?.caseName ?? '',
          selectedCategory: caseData?.category ?? '',
          casePrice: caseData?.price ?? '0',
          image: null
        }}
        onSubmit={(values) => {
          console.log(values)
          handleClose()
        }}
      >
        {({ handleChange, values }) => (
          <Form>
            <div className='py-4 space-y-3'>
              <InputWithInlineLabel
                value={values.caseName}
                onChange={handleChange('caseName')}
                type='text'
                placeholder='...'
                label='Case Name'
              />
              <SelectWithInlineLabel
                value={values.selectedCategory}
                label='Select Category'
                onChange={handleChange('selectedCategory')}
                options={['Not best category', 'Best category', 'None', 'level cases']}
              />
              <InputWithInlineLabel
                value={values.casePrice}
                onChange={handleChange('casePrice')}
                type='number'
                placeholder='...'
                label='Case price'
                withIcon
              />
              <UploaderWithInlineLabel label='Upload image' onChange={handleChange('image')} />
            </div>
            <div className='flex items-center justify-center gap-4'>
              <Button color='BlueAccentPrimary' type='button' onClick={handleClose}>
                <span className='px-3 py-2.5 text-gray-primary'>Cancel</span>
              </Button>
              <Button color='GreenPrimary' type='submit'>
                <span className='px-3 py-2.5'>{caseData ? 'Save Settings' : 'Create Case'}</span>
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  )
}

export default CaseModal
