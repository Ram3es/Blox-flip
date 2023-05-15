import React from 'react'
import ServicePageContainer from '../../components/containers/ServicePage'

const Terms = () => {
  return (
        <ServicePageContainer
         title='Terms of Service'
         renderHeaderDescription={() => (
          <>
           <p className='mb-5'>Please read these terms and conditions carefully before using Our Service.</p>
           <p> This site is operated by Liquid Gaming N.V. (153298) and has its office registered in Abraham de Veerstraat 9, Willemstad in Curacao.</p>
           <p> Registered under license GLH-OCCHKTW076092020.</p>
          </>
         )}
        >
          <h2 className='text-xl font-bold text-blue-golf mt-10 mb-6'>Definitions</h2>
          <div className='text-base leading-5 font-normal opacity-60'>
            <p>The words of which the initial letter is capitalized have meanings defined under the following conditions.</p>
            <p>The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
          </div>
          <h2 className='text-xl font-bold text-blue-golf mt-10 mb-6'>Interpretation and Definitions</h2>
          <div className='text-base leading-5 font-normal opacity-60'>
            <p>For the purposes of these Terms and Conditions:</p>
            <div className='terms-list'>
                <p>Account means a unique account created for You to access our Service or parts of our Service.</p>
                <p>{'Company (referred to as either \'the Company\', \'We\', \'Us\' or \'Our\' in this Agreement) refers to Liquid Gaming N.V.'}</p>
                <p>Country refers to: Curacao</p>
                <p>{'On-site credits ​refer to all funds or credits you bought on Duelbits. On-site credits may be traded for other objects of value; including, but not limited to Steam Skins and Crypto Currencies.'}</p>
                <p>Orders mean a request by You to purchase On-site Credits from Us.</p>
                <p>Service refers to the Website.</p>
                <p>{'Terms and Conditions (also referred as \'Terms\') mean these Terms and Conditions that form the entire agreement between You and the Company regarding the use of the Service.'}</p>
                <p>Third-party Social Media Service means any services or content (including data, information, products or services) provided by a third-party that may be displayed, included or made available by the Service.</p>
                <p>Website refers to duelbits.com, accessible from Liquid Gaming N.V.</p>
                <p>You means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</p>
            </div>
          </div>
          <h2 className='text-xl font-bold text-blue-golf mt-10 mb-6'>Definitions</h2>
          <div className='text-base leading-5 font-normal opacity-60'>
            <p>The words of which the initial letter is capitalized have meanings defined under the following conditions.</p>
            <p>The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
          </div>
        </ServicePageContainer>
  )
}

export default Terms
