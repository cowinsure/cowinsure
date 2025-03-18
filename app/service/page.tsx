import AppBranding from '@/components/Project/AppBranding'
import React from 'react'
import banner from '../../public/farmers-with.jpg';
import platform from '../../public/brandinggrassfieldimg.jpeg';
import aibg from '../../public/aibg.jpg';
import financialAccess from '../../public/farmerimg.jpg';
import cover3 from '../../public/cover3.jpg';
import farmaManagement from '../../public/farmManagement.jpg';
import insuranceBacked from '../../public/agriculture-farmland-2023-11-27-05-02-44-utc.jpg';
import WhatServiceWeOffer from '@/components/service/WhatServiceWeOffer';
import HomeInsuranceSection from '@/components/Home/HomeInsuranceSection';





const listSlides = [
    {
        image:financialAccess,
        title:"Financial Access",
        description:"Connections to banks, microfinance institutions (MFIs), and investors for affordable financing through profit-sharing models."

    },
    {
        image:aibg,
        title:"AI-Powered Livestock Identification",
        description:"Secure, tamper-proof digital identification using AI Digital Twins and Muzzle Printometry technology, turning livestock into digital collateral."

    },
    {
        image:insuranceBacked,
        title:"Insurance-Backed Microfinance",
        description:"Access to low-interest loans supported by comprehensive insurance coverage, reducing lending risks and helping farmers break free from informal lending cycles."

    },
    {
        image:farmaManagement,
        title:"Farm Management Tools",
        description:"Solutions for herd health monitoring, feed management, breeding schedules, and veterinary care that enhance productivity and reduce livestock mortality."

    },
    {
        image:banner,
        title:"Advisory Support",
        description:"Expert veterinary guidance from graduates of top universities, providing specialized advice in cattle health, beef fattening, dairy management, and vaccination protocols."

    },
    {
        image:cover3,
        title:"Training & Capacity Building",
        description:"Skill-building workshops on financial literacy, best farming practices, and dairy product conversion using specialized equipment."

    },
    {
        image:banner,
        title:"Dairy Equipment Support",
        description:"Machinery that extends the shelf life of milk by enabling farmers to produce butter, ghee, cheese, and other value-added products."

    },
    {
        image:platform,
        title:"Insurance Platform for Institutions",
        description:"API integration for insurance companies, NGOs, and MFIs for secure cattle identification, ensuring that investments are protected by insurance coverage."

    }
]

function page() {
  return (
    <div className='h-auto overflow-hidden'>
      <AppBranding title="Empowering Farmers, Securing Livelihoods – Smart Solutions for Livestock Success" bannerUrl={banner}  />


      <WhatServiceWeOffer slider={listSlides}/>

          {/* insurance section */}
          <HomeInsuranceSection />
      
    </div>
  )
}

export default page
