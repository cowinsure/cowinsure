import HerosSectionCommon from '@/components/common/HerosSectionCommon'
import OurServicesCommon from '@/components/common/OurServicesCommon'
import React from 'react'
import bannerImage from '../../../../public/farmerimg.jpg';

function FinancialAccessPartnerships() {
  return (
    <div className='h-auto'>
    <HerosSectionCommon title='Financial Access Partnerships' bannerUrl={bannerImage}/>

    <div className='bg-[#F6F4EC]'>

    <OurServicesCommon serviceName="Financial_Access_and_Partnerships"/>
    </div>

   </div>
  )
}

export default FinancialAccessPartnerships
