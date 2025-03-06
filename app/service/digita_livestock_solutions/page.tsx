import HerosSectionCommon from '@/components/common/HerosSectionCommon'
import ServiceHighlighted from '@/components/common/ServiceHighlighted'
import React from 'react'
import bannerImage from '../../../public/aibg.jpg';
import farmManagement from '../../../public/farmManagement.jpg';


function DigitalLiveStockSolutions() {
  return (
    <div className='h-auto mt-[80px]'>
   
    <HerosSectionCommon title='Digital Livestock Solutions' bannerUrl={bannerImage}/>
    <div className='bg-[#F6F4EC]'>



   <ServiceHighlighted url='/service/digita_livestock_solutions/ai_powered_livestock_identification' image={bannerImage} title='AI-Powered Livestock Identification' description='Secure identification using AI, digital twins, and muzzle printometry for fraud prevention and digital collateral.' reverse/>
   <ServiceHighlighted url='/service/digita_livestock_solutions/farm_management_advisory' image={farmManagement} title='Farm Management & Advisory' description='Comprehensive livestock care with health monitoring, nutrition, breeding, and 24/7 vet support.'   />
    </div>

   </div>
  )
}

export default DigitalLiveStockSolutions
