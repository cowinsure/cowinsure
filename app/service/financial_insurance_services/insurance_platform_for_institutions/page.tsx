import HerosSectionCommon from '@/components/common/HerosSectionCommon'
import OurServicesCommon from '@/components/common/OurServicesCommon'
import React from 'react'
import bannerImage from '../../../../public/brandinggrassfieldimg.jpeg';
import HomeInsuranceSection from '@/components/Home/HomeInsuranceSection';

function InsurancePlatformForInstitutions() {
  return (
    <div className='h-auto mt-[10vh] overflow-hidden'>
    <HerosSectionCommon title='Insurance Platform For Institutions' bannerUrl={bannerImage}/>

    <div className='bg-[#F6F4EC]'>

    <OurServicesCommon serviceName="Insurance_platform_for_institutions"/>

    <HomeInsuranceSection/>
    </div>

   </div>
  )
}

export default InsurancePlatformForInstitutions
