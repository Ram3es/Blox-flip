import React from 'react'
import ServicePageContainer from '../../components/containers/ServicePage'

const Terms = () => {
  return (
        <ServicePageContainer
         title='Terms of Service'
         renderHeaderDescription={() => (
          <>
           <p className='mb-5'>Please read these terms and conditions carefully before using Our Service.</p>
           <p>Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet</p>
           <p>Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem</p>
          </>
         )}
        >
          <h2 className='text-xl font-bold text-blue-golf mt-10 mb-6'>Definitions</h2>
          <div className='text-base leading-5 font-normal opacity-60'>
            <p>Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet</p>
            <p>Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet</p>
          </div>
          <h2 className='text-xl font-bold text-blue-golf mt-10 mb-6'>Interpretation and Definitions</h2>
          <div className='text-base leading-5 font-normal opacity-60'>
            <p>For the purposes of these Terms and Conditions:</p>
            <div className='terms-list'>
                <p>Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet</p>
                <p>Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet</p>
                <p>Lorem ipsum dolor sit amet</p>
                <p>Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet</p>
                <p>Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet</p>
                <p>Service refers to the Website.</p>
                <p>Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet</p>
                <p>Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet</p>
                <p>Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet</p>
                <p>Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet</p>
            </div>
          </div>
          <h2 className='text-xl font-bold text-blue-golf mt-10 mb-6'>Definitions</h2>
          <div className='text-base leading-5 font-normal opacity-60'>
            <p>Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet</p>
            <p>Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet</p>
          </div>
        </ServicePageContainer>
  )
}

export default Terms
