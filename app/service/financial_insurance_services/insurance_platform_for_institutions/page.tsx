import HerosSectionCommon from '@/components/common/HerosSectionCommon'
import OurServicesCommon from '@/components/common/OurServicesCommon'
import React from 'react'
import bannerImage from '../../../../public/brandinggrassfieldimg.jpeg';

function InsurancePlatformForInstitutions() {
  return (
    <div className='h-auto mt-[80px]'>
    <HerosSectionCommon title='Insurance Platform For Institutions' bannerUrl={bannerImage}/>

    <div className='bg-[#F6F4EC]'>

    <OurServicesCommon serviceName="Insurance_platform_for_institutions"/>
    </div>

   </div>
  )
}

export default InsurancePlatformForInstitutions
