"use client";

import React, { ReactNode, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface AppBrandingProps {
  bannerUrl: string | StaticImport;
  children: ReactNode;
}

const BannerGeneral = ({ children, bannerUrl }: AppBrandingProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax movement
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div
      ref={ref}
      className="relative w-full h-[50vh] lg:h-[100vh] md:h-[40vh] overflow-hidden"
    >
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src={bannerUrl}
          alt="Banner"
          fill
          className="object-cover object-center"
          priority
        />
      </motion.div>

      {children}
    </div>
  );
};

export default BannerGeneral;
