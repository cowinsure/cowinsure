import FarmHeroSection from '@/components/FarmManagement/FarmHeroSection'
import React from 'react'
import farmPic from '../../../public/farmManagement.jpg'

function FarmManagment() {
  return (
    <div>
      <FarmHeroSection bannerUrl={farmPic}/>
    </div>
  )
}

export default FarmManagment
