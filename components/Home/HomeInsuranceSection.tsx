'use client';

import React, { useEffect, useState } from 'react'
import { GiBullHorns } from 'react-icons/gi'
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface ExtraData{
    url: string;
    type: string;
  }
  
  interface BaseCard {
    id: number;
    name: string;
    category: string;
    image_url: string;
    extra_data: ExtraData;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  }
  
  interface BaseCardApiResponse {
    status: string;
    message: string;
    data: BaseCard[];
  }
  
  interface BaseCategory {
    id: string;
    name: string;
    description: string;
  }
  
  interface BaseCategoryApiResponse {
    status: string;
    message: string;
    data: BaseCategory[];
  }
  

const HomeInsuranceSection: React.FC = () => {
    const [insuranceSection, setInsuranceSection] = useState<BaseCard[]>([]);
      useEffect(()=>{
        const fetchBaseCategories = async()=>{
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/base-categories/`);
            const result: BaseCategoryApiResponse = await response.json();
            if (result.status==='success'){
              const insuranceSectionCategory = result.data.find(category => category.name === 'Insurance Preview Section');
              if(insuranceSectionCategory){
                fetchBaseCards(insuranceSectionCategory.id);
              }
            }
          }catch(error){
            console.error("Error fetching base categories: ",error);
          }
        };
        const fetchBaseCards = async(categoryId: string) => {
          try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/base-category/${categoryId}/base-cards/`);
            const result: BaseCardApiResponse = await response.json();
            if(result.status === 'success'){
              setInsuranceSection(result.data);
            }
          } catch(error){
            console.error('Error fetching base cards: ',error);
          }
        };
        fetchBaseCategories();
    
        },
      []);  
    
  return (
    <section className=" py-[15vh] h-auto lg:h-auto  flex flex-col  lg:flex-col lg:justify-start  lg:items-center items-center justify-center bg-white">
      <div className="max-w-4xl text-center">
        <GiBullHorns className='w-full lg:text-3xl text-xl text-center text-green-700 mb-2' />

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3, }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-sm lg:text-xl font-bold text-[#687469] mb-2">Digital Insurance Solutions</h2>
          <h1 className="lg:text-5xl text-3xl font-bold text-[#334b35]">Simply compare,
            order, and get covered.</h1>
        </motion.div>
      </div>

      <div className='mt-10 w-full h-auto container mx-auto flex flex-col gap-4 lg:flex-row items-center justify-center  mb-5 '>



      {insuranceSection.map((item,index)=>(
        
        <motion.div
        key={index}
        initial={{ opacity: 0, x: 10 }} // Initial state (hidden)
        whileInView={{ opacity: 1, x: 0 }} // Animate when in view
        viewport={{ once: true }} // Only animate once
        transition={{ duration: 0.3 }} // Animation duration
        className='relative  w-[400px] flex-col h-auto  justify-center items-center group bg-gray-800 rounded-lg'>
                    <div className='relative h-[400px]  rounded-lg bg-black   overflow-hidden'>
                        <div className='absolute h-auto rounded-lg inset-0 bg-contain left-0 group-hover:-left-5 transition-all duration-700'>
                            <Image
                                src={item.image_url}
                                alt={item.name}
                                layout="fill"
                                objectFit="cover"
                                objectPosition='center'
                                className="rounded-lg w-full h-[500px]"
                               
                                priority
                            />
                            <div className='absolute rounded-lg bg-green-300 bg-opacity-20 top-[-100%] z-30 right-0 w-full h-full group-hover:top-0 transition-all duration-700 ease-in-out overflow-hidden'>

                            </div>


                        </div>



                    </div>
                    <Link href={item.extra_data.url} className='absolute  bottom-0 left-0 right-0 z-50 mx-5 overflow-hidden group-hover:overflow-visible'>
                        <div className='relative [transform:rotateX(120deg)] z-20 flex flex-col h-[80px] justify-center items-center  rounded-t-lg text-2xl font-bold text-white  opacity-0 group-hover:opacity-100 group-hover:[transform:rotateX(0deg)] transition-all duration-700'>
                           <div className='w-full flex flex-col justify-center bg-green-800 items-center h-full rounded-tr-lg'>
                          
                            <div className='    text-center '>{item.name}</div>   
                                
                           </div>

                           <div className=' absolute left-0 top-[-32px] rounded-t-md'>
                           <div className='bg-yellow-600  text-xs p-2 text-center text-black rounded-t-md'>{item.extra_data.type}</div>
                           </div>
                        </div>
                    </Link>

                </motion.div>
      ))}

      </div>


    </section>
  )
}

export default HomeInsuranceSection
