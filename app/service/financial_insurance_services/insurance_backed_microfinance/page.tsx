
import HerosSectionCommon from '@/components/common/HerosSectionCommon'
import OurServicesCommon from '@/components/common/OurServicesCommon'
import bannerImage from '../../../../public/agriculture-farmland-2023-11-27-05-02-44-utc.jpg';
import React from 'react'

function InsuranceBackedMicrofinance() {
  return (
    <div className='h-auto mt-[80px]'>
    <HerosSectionCommon title='Insurance Backed Microfinance' bannerUrl={bannerImage}/>

    <div className='bg-[#F6F4EC]'>

    <OurServicesCommon serviceName="Insurance_Backed_Microfinance"/>
    </div>

   </div>
  )
}

export default InsuranceBackedMicrofinance
