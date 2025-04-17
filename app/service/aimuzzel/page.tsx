import ServiceHeroSection from '@/components/service/ServiceHeroSection'
import React from 'react'
import bannerImage from '../../../public/aibg.png'; // Replace with your actual image path


function Aimuzzel() {
  return (
    <div>
     <ServiceHeroSection bannerUrl={bannerImage} link={undefined} />
    </div>
  )
}

export default Aimuzzel
