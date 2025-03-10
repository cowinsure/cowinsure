import React from 'react'
import Image from 'next/image';
import cover from '../../public/sampleCow2.jpg';


function TestPage() {
    return (
        <div className='container mx-auto h-screen mt-[10vh] flex flex-row justify-center gap-4 items-center'>

            <div className='flex-1 flex-col h-auto  justify-center items-center group bg-gray-800 rounded-lg'>
                <div className='relative h-[300px]  rounded-t-lg   overflow-hidden'>
                    <div className='absolute h-auto rounded-t-lg inset-0 bg-contain left-0 group-hover:-left-full transition-all duration-500'>
                        <Image
                            src={cover}
                            alt='cover'
                            layout="fill"
                            objectFit="cover"
                            objectPosition='center'
                            className="rounded-t-lg w-full h-[500px]"
                            unoptimized
                            priority
                        />
                        <div className='absolute rounded-t-lg bg-green-300 bg-opacity-20 top-[-100%] z-30 right-0 w-full h-full group-hover:top-0 transition-all duration-300 ease-in-out overflow-hidden'>

                        </div>
                    </div>
                    hello

                </div>
                <div className='w-0 group-hover:w-full transition-all duration-500 border-2 border-transparent group-hover:border-green-700'></div>
                <div className='rounded-b-lg group-hover:bg-green-950  transition-all duration-500 container mx-auto flex flex-col justify-center items-center w-full h-auto p-5'>

                    <div className='flex flex-row lg:flex-row items-end justify-between w-full px-2 rounded-b-lg'>
                        <div className='text-xl text-white font-semibold'>Project</div>
                        <div className='text-white text-xl font-bold'> cow 101</div>
                    </div>
                </div>



            </div>

            <div className='relative flex-1 flex-col h-auto  justify-center items-center group bg-gray-800 rounded-lg'>
                <div className='relative h-[400px]  rounded-t-lg bg-black   overflow-hidden'>
                    <div className='absolute h-auto rounded-lg inset-0 bg-contain left-0 group-hover:-left-12 transition-all duration-500'>
                        <Image
                            src={cover}
                            alt='cover'
                            layout="fill"
                            objectFit="cover"
                            objectPosition='center'
                            className="rounded-lg w-full h-[500px]"
                            unoptimized
                            priority
                        />
                        <div className='absolute rounded-t-lg bg-green-300 bg-opacity-20 top-[-100%] z-30 right-0 w-full h-full group-hover:top-0 transition-all duration-300 ease-in-out overflow-hidden'>

                        </div>


                    </div>



                </div>
                <div className=' absolute bottom-0 left-0 right-0 z-50  mx-5  overflow-hidden group-hover:overflow-visible '>
                    <div className='relative z-20 flex flex-col h-[100px] justify-center items-center  bg-green-800 rounded-t-lg text-2xl font-bold text-white'>
                        <span>Smart  Organic  </span>
                        <span> Services</span>
                        {/* <div className='absolute invisible bottom-[100%] z-10 bg-black w-full group-hover:visible group-hover:bottom-[-31px] transition-all duration-500'>hellow</div> */}
                    </div>

                    <div className='rounded-b-lg overflow-hidden absolute left-0  right-0  invisible bottom-[0%] bg-transparent   group-hover:visible group-hover:bottom-[-31px]    transition-all duration-500
                    flex flex-col  justify-center items-center text-black text-2xl font-bold
                    '>
                        
                        <div className='w-full group-hover:bg-green-900 group-hover:text-center text-white'> {"->"}</div>
                        
                        </div>

                </div>
              
                {/* <div className='w-0 group-hover:w-full transition-all duration-500 border-2 border-transparent group-hover:border-green-700'></div> */}




            </div>
            <div className='card flex-1 flex-col h-auto w-44 justify-center items-center bg-gray-500'>
                <h1 className='text-white text-4xl font-bold'>Test Page</h1>
                <Image
                    src={cover}
                    alt='cover'
                    className="rounded-lg object-cover w-full h-48"
                    width={500}
                    height={400}
                    priority
                />
            </div>
        </div>
    )
}

export default TestPage
