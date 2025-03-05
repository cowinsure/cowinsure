import HerosSectionCommon from '@/components/common/HerosSectionCommon'
import React from 'react'
import bannerImage from '../../../../public/farmManagement.jpg';
import OurServicesCommon from '@/components/common/OurServicesCommon';


function FinacialManagementAdvisory() {
  return (
    <div className='h-auto mt-[80px]'>
     <HerosSectionCommon title='Farm Management & Advisory' bannerUrl={bannerImage}/>
     <div className='bg-[#F6F4EC]'>

     <OurServicesCommon serviceName="Farm Management  Advisory Service"/>
     </div>
    </div>
  )
}

export default FinacialManagementAdvisory
