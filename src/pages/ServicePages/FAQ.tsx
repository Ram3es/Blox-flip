import React from 'react'
import ServicePageContainer from '../../components/containers/ServicePage'

const FAQ = () => {
  return (
        <ServicePageContainer
        title='Frequent answers & questions'
        renderHeaderDescription={() => (
            <>
              <p className='mb-5'>Please read these terms and conditions carefully before using Our Service.</p>
              <p>Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet</p>
              <p>Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet</p>
           </>
        )}>
        <h2 className='text-xl font-bold text-blue-golf mt-10 mb-6'>1. How do I deposit?</h2>
        <div className='text-base leading-5 font-normal opacity-60'>
          <p>Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet </p>
        </div>
        <h2 className='text-xl font-bold text-blue-golf mt-10 mb-6'>2. I didn`t receive my deposit?</h2>
        <div className='text-base leading-5 font-normal opacity-60'>
          <p>Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet </p>
        </div>
        <h2 className='text-xl font-bold text-blue-golf mt-10 mb-6'>1. How do I deposit?</h2>
        <div className='text-base leading-5 font-normal opacity-60'>
          <p>Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet </p>
        </div>
        <h2 className='text-xl font-bold text-blue-golf mt-10 mb-6'>2. I didn`t receive my deposit?</h2>
        <div className='text-base leading-5 font-normal opacity-60'>
          <p>Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet </p>
        </div>

        </ServicePageContainer>
  )
}

export default FAQ
