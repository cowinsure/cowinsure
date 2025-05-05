import HerosSectionCommon from '@/components/common/HerosSectionCommon'
import OurServicesCommon from '@/components/common/OurServicesCommon'
import React from 'react'
import bannerImage from '../../../../public/farmers-with.jpg';

function DairyEquipmentProcessingSupport() {
  return (
    <div className='h-auto'>
    <HerosSectionCommon title='Dairy Equipment & Processing Support' bannerUrl={bannerImage}/>

    <div className='bg-[#F6F4EC]'>

    <OurServicesCommon serviceName="Dairy_product_diversification_and_processing"/>
    </div>

   </div>
  )
}

export default DairyEquipmentProcessingSupport
