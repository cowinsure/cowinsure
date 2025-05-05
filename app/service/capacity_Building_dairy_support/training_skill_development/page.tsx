
import HerosSectionCommon from '@/components/common/HerosSectionCommon'
import OurServicesCommon from '@/components/common/OurServicesCommon'
import React from 'react'
import bannerImage from '../../../../public/cover3.jpg';

function TrainingSkillDevelopment() {
  return (
    <div className='h-auto'>
    <HerosSectionCommon title='Training Skill Development' bannerUrl={bannerImage}/>

    <div className='bg-[#F6F4EC]'>

    <OurServicesCommon serviceName="Trainning_and_skill_development"/>
    </div>

   </div>
  )
}

export default TrainingSkillDevelopment
