import AppBranding from '@/components/Project/AppBranding'
import React from 'react'
import banner from '../../public/many-wooden-people-figures-under-umbrella-on-yello.jpg';
import HomeInsuranceSection from '@/components/Home/HomeInsuranceSection';
import FaqSection from '@/components/Home/FaqSection';
import ContactUs from '@/components/Helper/ContactUs';


export default function InsuranceHome() {
  return (
    <div>
        <AppBranding title="Protecting Lives, Securing Livelihoods – Comprehensive Insurance for You and Your Livestock." bannerUrl={banner} link={'\insurance'} />

            {/* insurance section */}
      <HomeInsuranceSection />

      <div className='text-center'>
        <FaqSection/>
      </div>

      <div className='text-center bg-[#F6F4EC]'>
        <ContactUs/>
      </div>
    </div>
  )
}
