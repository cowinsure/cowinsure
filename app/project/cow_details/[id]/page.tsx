
'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import FaqSection from '@/components/Home/FaqSection';
import { useParams } from 'next/navigation';

import { formatToBDT } from '@/utils/currencyFormatter';
import CowPurchaseForm from '@/components/Project/CowPurchaseForm';


interface ExtraData {
    age: number;
    sex: string;
    breed: string;
    horns: string;
    colour: string;
    isSold: boolean;
    cattleId: string;
    weightKg: number;
    heightFeet: number;
    askingPrice: number;
    sellingPrice: number;
    dehorningStatus: string;
    dewormingStatus: string;
    identifyingMarks: string;
    sourceOfPurchase: string;
    anyDiseaseHistory: string;
    vaccinationStatus: string;
    currentOwnerFarmName: string;
    generalHealthCondition: string;
    numberOfCutMarksOnSkin: number;
    locationOfCurrentHolding: string;
}

interface Portfolio {
    id: string;
    name: string;
    location: string;
    investment_value: string;
    currency: string;
    investment_period: string;
    expected_return_min: string;
    expected_return_max: string;
    total_return_min: string;
    total_return_max: string;
    image_url: string;
    description: string;
    extra_data: ExtraData;
    created_at: string;
    updated_at: string;
}

function CowDetailsPage() {
    const { id } = useParams() as { id: string };
    const [loading, setLoading] = useState(true);

    const [projectDetails, setProjectDetails] = useState<Portfolio | null>(null);


    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const response = await fetch(`http://52.66.196.177:8000/api/v1/portfolio/${id}/`);
                const data = await response.json();
                setProjectDetails(data.data);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching project details:', error);
                setLoading(false);
            }
        };

        fetchProjectDetails();
    }, [id]);

    if (loading) {
        return <div className='h-screen w-screen text-center'>Loading...</div>;
    }

    if (!projectDetails) {
        return <div>Error loading project details.</div>;
    }

    return (
        <div className='h-auto md:pt-0 mx-auto lg:w-full text-center bg-[#F7F7F7] lg:mt-[10vh]'>
            <div className='pt-[10vh] lg:pt-[10vh] container mx-auto flex flex-col lg:flex-col lg:justify-center lg:items-center justify-center p-5'>
                <div className='relative mb-10 w-full rounded-lg overflow-hidden'>
                    <Image
                        src={projectDetails.image_url}
                        width={800}
                        height={600}
                        alt="Banner"
                        objectPosition='center'
                        className="w-full h-[100vh] object-cover rounded-lg"
                        unoptimized
                    />
                    <div className='absolute bg-black bg-opacity-45 top-0 h-full w-full flex justify-center items-center lg:justify-center lg:items-center'>
                        <h1 className='text-white text-4xl lg:text-6xl font-bold'>{projectDetails.name}</h1>
                    </div>
                </div>
                <h1 className='text-3xl font-bold text-[#334b35] text-start w-full mt-5 mb-5'>Cow Overview</h1>
                <div className='mb-10 w-full flex flex-col lg:gap-5 gap-5 justify-between lg:flex-row lg:items-start lg:justify-between'>
                    <div className='w-full lg:flex-1 p-10 rounded-md bg-green-800 font-bold'>
                        <h2 className='text-2xl text-white mb-5'>Live Weight</h2>
                        <h2 className='text-xl text-white'>{projectDetails.extra_data.weightKg} KG</h2>
                    </div>
                    {/* <div className='w-full lg:flex-1 p-10 rounded-md bg-green-800 font-bold'>
                        <h2 className='text-2xl text-white mb-5'>Expected Final Weight</h2>
                        <h2 className='text-3xl text-white'>{projectDetails.extra_data.expectedFinalWeight} KG</h2>
                    </div> */}
                    <div className='w-full lg:flex-1 p-10 rounded-md bg-green-800 font-bold'>
                        <h2 className='text-2xl text-white mb-5'>Price</h2>
                        <h2 className='text-xl text-white'>{formatToBDT(projectDetails.extra_data.askingPrice)}</h2>
                    </div>

                    <div className='w-full lg:flex-1 p-10 rounded-md bg-green-800 font-bold'>
                        <h2 className='text-2xl text-white mb-5'>Location</h2>
                        <h2 className='text-xl text-white'>{projectDetails.location}</h2>
                    </div>

                </div>


                <div className='w-full flex flex-col lg:gap-5 justify-start items-start lg:flex-row lg:items-start lg:justify-between '>
                    <div className='flex-1 flex flex-col lg:flex-col gap-5 justify-start items-start lg:items-start lg:justify-start'>
                        <h1 className='text-3xl font-bold text-[#334b35] text-start w-full mt-5 mb-5'>Cow Details</h1>
                        <p className='text-start  text-xl font-semibold text-[#687469]'>
                            {projectDetails.description}
                        </p>

                    </div>

                </div>
                <div className='w-full flex flex-col lg:gap-5 justify-start items-start lg:flex-row lg:items-start lg:justify-between mt-10'>
                    <div className='flex flex-col justify-start items-center lg:justify-start lg:items-start lg:w-1/3 '>

                        <div className=' w-full text-start mb-10 text-3xl font-bold text-[#334b35] mt-5'>Buy Cow</div>
                        <CowPurchaseForm />

                    </div>
                    <div className='lg:w-1/2  flex flex-col justify-center items-center lg:flex-col lg:justify-center lg:items-center  ' >
                        <h1 className=' text-3xl font-bold text-[#334b35] text-start w-full mt-10 lg:text-start'>Cow Details</h1>

                        <div className='flex flex-row justify-between gap-10 lg:justify-between w-full mt-10'>

                            <h2 className='text-xl font-bold  '>Cow ID</h2>
                            <h2 className='text-xl font-bold text-green-700 '>{projectDetails.name}</h2>

                        </div>
                        <div className='flex flex-row justify-between gap-10 lg:justify-between w-full mt-5'>
                            <h2 className='text-xl font-bold  '>Cow Breed</h2>
                            <h2 className='text-xl font-bold text-green-700 '>{projectDetails.extra_data.breed}</h2>
                        </div>
                        <div className='flex flex-row justify-between gap-10 lg:justify-between w-full mt-5'>
                            <h2 className='text-xl font-bold text-start '>Teeth</h2>
                            <h2 className='text-xl font-bold text-green-700 '>{projectDetails.extra_data.age} Month</h2>
                        </div>
                        <div className='flex flex-row justify-between gap-10 lg:justify-between w-full mt-5'>
                            <h2 className='text-xl font-bold  '>Gender</h2>
                            <h2 className='text-xl font-bold text-green-700 '>{projectDetails.extra_data.sex}</h2>
                        </div>
                        <div className='flex flex-row justify-between gap-10 lg:justify-between w-full mt-5'>
                            <h2 className='text-xl font-bold  '>Color</h2>
                            <h2 className='text-xl font-bold text-green-700 '>{projectDetails.extra_data.colour}</h2>
                        </div>
                        <div className='flex flex-row justify-between gap-10 lg:justify-between w-full mt-5'>
                            <h2 className='text-xl font-bold  '>Current Live Weight</h2>
                            <h2 className='text-xl font-bold text-green-700 '>{projectDetails.extra_data.weightKg} KG</h2>
                        </div>
                        <div className='flex flex-row justify-between gap-10 lg:justify-between w-full mt-5'>
                            <h2 className='text-xl font-bold  '>Height</h2>
                            <h2 className='text-xl font-bold text-green-700 '>{projectDetails.extra_data.heightFeet} Feet</h2>
                        </div>

                      




                    </div>
                </div>
            </div>


            <div className='mt-11 bg-[#F6F4EC]'>

                <FaqSection />
            </div>


        </div>
    )
}

export default CowDetailsPage
