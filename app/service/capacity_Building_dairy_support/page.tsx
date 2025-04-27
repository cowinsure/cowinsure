import HerosSectionCommon from '@/components/common/HerosSectionCommon'
import React from 'react'
import bannerImage from '../../../public/aibg.png';
import training from '../../../public/cover3.jpg';
import dairySupport from '../../../public/farmers-with.jpg';
import ServiceHighlighted from '@/components/common/ServiceHighlighted';


function CapacityBuildingDairySupport() {
  return (
    <div className='h-auto mt-[80px]'>
   
    <HerosSectionCommon title='Capacity Building & Dairy Support' bannerUrl={bannerImage}/>
    <div className='bg-[#F6F4EC]'>



   <ServiceHighlighted url='/service/capacity_Building_dairy_support/training_skill_development' image={training} title='Training & Skill Development' description=' Empowering farmers with financial literacy, best practices, and dairy processing skills' reverse/>
   <ServiceHighlighted url='/service/capacity_Building_dairy_support/dairy_equipment_processing_Support' image={dairySupport} title='Dairy Equipment & Processing Support' description='Affordable machinery for processing, preservation, and value-added dairy products'   />
    </div>

   </div>
  )
}

export default CapacityBuildingDairySupport
