import React from "react";
import { GiBullHorns } from "react-icons/gi";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;

  iconRef?: (el: HTMLDivElement | null) => void;
  subtitleRef?: (el: HTMLSpanElement | null) => void;
  titleRef?: (el: HTMLHeadingElement | null) => void;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle = "",
  iconRef,
  subtitleRef,
  titleRef,
}) => {
  return (
    <div className="mb-5 text-center">
      <div ref={iconRef} className="flex items-center justify-center">
        <GiBullHorns className="w-auto text-3xl text-green-700 mb-3 pl-2 pr-2" />
      </div>

      {subtitle && (
        <span
          ref={subtitleRef}
          className="pl-2 pr-2 text-sm text-[#687469] uppercase font-semibold"
        >
          {subtitle}
        </span>
      )}

      <h2
        ref={titleRef}
        className="text-3xl lg:text-5xl font-bold text-[#334b35] mt-2 pl-2 pr-2 leading-8"
      >
        {title}
      </h2>
    </div>
  );
};

export default SectionHeading;
