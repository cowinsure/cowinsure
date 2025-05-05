import HerosSectionCommon from '@/components/common/HerosSectionCommon'
import React from 'react'
import bannerImage from '../../../public/insurance.jpg';
import financialAccess from '../../../public/farmerimg.jpg';
import insuranceBacked from '../../../public/agriculture-farmland-2023-11-27-05-02-44-utc.jpg';
import platformInsurance from '../../../public/brandinggrassfieldimg.jpeg';
import ServiceHighlighted from '@/components/common/ServiceHighlighted';

function FinancialInsuranceServices() {
  return (
    <div className='h-auto'>
   
     <HerosSectionCommon title='Financial Insurance Services' bannerUrl={bannerImage}/>
     <div className='bg-[#F6F4EC]'>
    


    <ServiceHighlighted url='/service/financial_insurance_services/insurance_backed_microfinance' image={insuranceBacked} title='Insurance-Backed Microfinance' description='Affordable, insured loans helping farmers escape informal lending.' reverse/>
    <ServiceHighlighted url='/service/financial_insurance_services/financial_access_partnerships' image={financialAccess} title='Financial Access & Partnerships' description='Linking farmers to banks, MFIs, and investors with profit-sharing models'   />
    <ServiceHighlighted url='/service/financial_insurance_services/insurance_platform_for_institutions' image={platformInsurance} title='Insurance Platform for Institutions' description='Digital insurance with API integration and secure livestock ID for MFIs & NGOs.' reverse/>
     </div>

    </div>
  )
}

export default FinancialInsuranceServices
