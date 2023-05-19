import React from 'react'
import ServicePageContainer from '../../components/containers/ServicePage'

const FAQ = () => {
  return (
        <ServicePageContainer
        title='Frequent answers & questions'
        renderHeaderDescription={() => (
            <>
              <p className='mb-5'>Please read these terms and conditions carefully before using Our Service.</p>
              <p> This site is operated by Liquid Gaming N.V. (153298) and has its office registered in Abraham de Veerstraat 9, Willemstad in Curacao.</p>
              <p> Registered under license GLH-OCCHKTW076092020.</p>
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
