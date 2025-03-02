'use client'

import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import brandLogo from '../../../public/brandlogo.png'
import { motion} from "framer-motion";

interface Department {
  name: string;
  images: string[] | StaticImageData[];
}

const departments: Department[] = [
  { name: 'Executive Body', images: [brandLogo, brandLogo, brandLogo] },
  { name: 'Advisors', images: [brandLogo, brandLogo, brandLogo,brandLogo, brandLogo, brandLogo] },
  { name: 'Business Development', images: [brandLogo, brandLogo, brandLogo] },
  { name: 'Brand Communication', images: [brandLogo, brandLogo, brandLogo] },
  { name: 'Software Development', images: [brandLogo, brandLogo, brandLogo] },
];

const TeamSection: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(departments[0]);
  const [animateImages, setAnimateImages] = useState(false);



  const handleDepartmentClick = (department: Department) => {
    setAnimateImages(true);
    setTimeout(() => {
      setSelectedDepartment(department);
      setAnimateImages(false);
    }, 500); // Duration of the slide-up animation
  };

  return (
    <section className=" container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-6xl text-[#687469] font-bold">Our Team</h1>
        <p className="text-lg mt-4 text-[#334b35]">Meet the people who make it all happen.</p>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/4">
          <ul className="space-y-4">
            {departments.map((department) => (
              <li
                key={department.name}
                className="cursor-pointer text-lg font-medium text-center hover:border-green-700 border-2 rounded-md p-5 text-green-700 hover:text-white hover:bg-green-700"
                onClick={() => handleDepartmentClick(department)}
              >
                {department.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedDepartment &&
            selectedDepartment.images.map((image, index) => (
              <motion.div
                key={index}
                className="border-black border-2 rounded-md relative w-full h-[40vh] cursor-pointer overflow-hidden"
                initial={{ opacity: 0, y: animateImages ? 100 : 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Image
                  src={image}
                  placeholder='blur'
                  blurDataURL=''
                  alt={selectedDepartment.name}
                  objectPosition='top'
                  className="rounded-lg cursor-pointer object-cover w-auto h-auto"
                />
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
