
import HerosSectionCommon from '@/components/common/HerosSectionCommon'
import OurServicesCommon from '@/components/common/OurServicesCommon'
import React from 'react'
import bannerImage from '../../../../public/dubai2023.png';

function TrainingSkillDevelopment() {
  return (
    <div className='h-auto mt-[80px]'>
    <HerosSectionCommon title='Training Skill Development' bannerUrl={bannerImage}/>

    <div className='bg-[#F6F4EC]'>

    <OurServicesCommon serviceName="Trainning_and_skill_development"/>
    </div>

   </div>
  )
}

export default TrainingSkillDevelopment
