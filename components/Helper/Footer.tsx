import React from 'react'
// import Image from 'next/image';
// import google from '../../public/googleplay.svg';
// import apple from '../../public/appstore.png';
import { CiLinkedin } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-10 px-6 md:px-16">
    <div className=" flex flex-col justify-start lg:justify-around  lg:flex-row ">
      
      {/* Left Section - Company Info */}
      <div>
        <h2 className="text-2xl font-bold text-green-800 flex items-center">
         InsureCow
        </h2>
        <p className="mt-3 text-gray-600">
         Bangladesh Office: House 109, Road 5, Block B, Niketon, Dhaka, Bangladesh
        </p>
        <p className="mt-3 text-gray-600">
         Singapore Office: 192 Waterloo St. #05-03 Skyline, Singapore 187966 
        </p>

        {/* Social Icons */}
        <div className="flex gap-3 mt-4">
          <a href="#" className="p-1 bg-black text-white rounded">
          <CiLinkedin  className='text-2xl'/>
          </a>
          <a href="#" className="p-2 bg-black text-white rounded">
           <FaXTwitter/>
          </a>
          <a href="#" className="p-2 bg-black text-white rounded">
          <FaFacebookSquare/>
          </a>
          <a href="#" className="p-2 bg-black text-white rounded">
          <FaYoutube/>
          </a>
          <a href="#" className="p-2 bg-black text-white rounded">
          <FaSquareInstagram/>
          </a>
        </div>

        {/* Contact Info */}
        <p className="mt-4 text-gray-600">info@insure.global</p>
        <p className="text-gray-600">+8801999INSURE</p>
      </div>

      {/* Middle Section - About */}
      <div>
        <h3 className="text-xl font-semibold text-green-800">About Company</h3>
        <ul className="mt-3 space-y-2 text-gray-600">
          <li><a href="/service">Services</a></li>
          <li><a href="/impact">Impact</a></li>
          <li><a href="/about_us">About Us</a></li>
          <li>
            {/* <a href="#" className="flex items-center gap-2">
              Career
              <span className="bg-green-600 text-white px-2 py-1 text-xs rounded-full">We are hiring!</span>
            </a> */}
          </li>
          {/* <li><a href="#">FAQ</a></li> */}
        </ul>
      </div>

      {/* Right Section - Download App */}
      {/* <div>
        <h3 className="text-xl font-semibold text-green-800">Download Our App</h3>
        <div className="mt-3">
          <a href="#">
            <Image src={google} alt="Google Play" className="w-40 mb-2" />
          </a>
          <a href="#">
            <Image src={apple} alt="App Store" className="w-40" />
          </a>
        </div>
      </div> */}
    </div>

    {/* Footer Bottom Section */}
    <div className="border-t mt-10 pt-5 text-center text-gray-500 text-sm">
      <p>Copyright © 2024 InsureCow | All Rights Reserved</p>
      <div className="flex justify-center gap-4 mt-2">
        <a href="#" className="hover:underline">Privacy Policy</a>
        <a href="#" className="hover:underline">Terms of Use</a>
      </div>
    </div>
  </footer>
  )
}

export default Footer
