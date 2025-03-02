'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
// import Image from 'next/image'
// import brandLogo from '../../public/brandlogo.png'

const NavMain = () => {


    const [hidden, setHidden] = useState(false);
    const [startCollPassed, setStartScroll] = useState(false);

  
    useEffect(() => {
      let lastScrollY = window.scrollY;
      console.log(window.scrollY);
      
    
      
      const handleScroll = () => {
        if (window.scrollY > lastScrollY) {
          setHidden(true);
        } else {
          setHidden(false);
        }
        lastScrollY = window.scrollY;
        if(window.scrollY == 0){
       setStartScroll(true);
        }else{
          setStartScroll(false);
        }
      };
      
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
  

  return (
    <nav className={`  bg-white  text-white p-4 shadow-md fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${hidden ? "-translate-y-full" : "translate-y-0"} `}>
      <div className="container mx-auto flex justify-center items-center lg:justify-between gap-5 ">
        
      {/* <Image src={brandLogo} alt="InsureCow Logo" objectFit="cover"
        objectPosition="bottom" height={42}  className="flex justify-center items-center " />
      <img src="https://www.insurecow.com/images/logo.png" className="flex justify-center items-center h-12" /> */}
    
          <h2 className={`text-3xl ${startCollPassed ? "text-green-800":"text-green-800" }  font-extrabold`}>InsureCow</h2>
       
        <ul className="flex flex-row space-x-6">
          <li>
            <Link href="/" className={`${startCollPassed ? "text-[#687469]":"text-green-800" } text-xl font-bold  hover:text-gray-400`}>
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link href="/project" className={`space-x-2 ${startCollPassed ? "text-[#687469]":"text-green-800" } text-xl font-bold  hover:text-gray-400`}>
               <span>Project</span>
            </Link>
          </li>

            <li className="relative group">
            <Link href="/insurance" className={`space-x-2 ${startCollPassed ? "text-[#687469]":"text-green-800" }   text-xl font-bold  hover:text-gray-400`}>
               <span>Insurance</span>
            </Link>
            <ul className="absolute rounded-lg left-0 hidden lg:w-auto  space-y-2 bg-white shadow-lg group-hover:block">
              <li>
              <Link href="/insurance/livestock" className="text-xl font-semibold text-green-800  block px-4 py-2  hover:bg-gray-200">
                Livestock
              </Link>
              </li>
              <li>
              <Link href="/insurance/life" className="text-xl font-semibold text-green-800  block px-4 py-2  hover:bg-gray-200">
                LifeInsurance
              </Link>
              </li>
            </ul>
            </li>
          <li>
            <Link href="/impact"  className={`space-x-2 ${startCollPassed ? "text-[#687469]":"text-green-800" } text-xl font-bold hover:text-gray-400`}>
               <span>Impact</span>
            </Link>
          </li>
          <li>
            <Link href="/about_us"  className={`space-x-2 ${startCollPassed ? "text-[#687469]":"text-green-800" } text-xl font-bold  hover:text-gray-400`}>
              <span>About Us</span>
            </Link>
          </li>
        </ul>
        {/* <div>Subscribe</div> */}
        <div></div>
      </div>
    </nav>
  )
}

export default NavMain
