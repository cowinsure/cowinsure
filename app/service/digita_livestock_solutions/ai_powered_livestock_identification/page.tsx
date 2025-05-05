
import React from 'react'
import bannerImage from '../../../../public/aibg.png';
import HerosSectionCommon from '@/components/common/HerosSectionCommon';
import OurServicesCommon from '@/components/common/OurServicesCommon';

function AiPoweredLiveStockSolutions() {
  return (
    <div className='h-auto'>
     <HerosSectionCommon title='AI-Powered Livestock Solutions' bannerUrl={bannerImage}/>

     <div className='bg-[#F6F4EC]'>

     <OurServicesCommon serviceName="AI service"/>
     </div>

    </div>
  )
}

export default AiPoweredLiveStockSolutions
