import HerosSectionCommon from '@/components/common/HerosSectionCommon'
import OurServicesCommon from '@/components/common/OurServicesCommon'
import React from 'react'
import bannerImage from '../../../../public/cover3.jpg';

function DairyEquipmentProcessingSupport() {
  return (
    <div className='h-auto mt-[80px]'>
    <HerosSectionCommon title='Training Skill Development' bannerUrl={bannerImage}/>

    <div className='bg-[#F6F4EC]'>

    <OurServicesCommon serviceName="Dairy_product_diversification_and_processing"/>
    </div>

   </div>
  )
}

export default DairyEquipmentProcessingSupport
