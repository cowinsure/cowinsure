"use client";

import React from "react";
import inspection from "../../../public/livestockinsuranceimg.jpg";
import Image from "next/image";

import { motion } from "framer-motion";
import { GiBullHorns } from "react-icons/gi";
import LifeInsuranceForm from "@/components/lifeInsurance/LifeInsuranceComponent";
import StaticFAQ from "@/components/StaticFAQ";

const LifeInsurance = () => {
  const lifeInsuranceFaqs = [
    {
      question: "What is life insurance?",
      answer:
        "Life insurance is a contract between you and an insurance company that provides a sum of money to your beneficiaries upon your death, in exchange for regular premium payments.",
    },
    {
      question: "Why do I need life insurance?",
      answer:
        "Life insurance helps protect your loved ones financially in case of your unexpected death, covering expenses like mortgages, education, debts, and daily living costs.",
    },
    {
      question: "What types of life insurance are available?",
      answer:
        "The main types include term life insurance, which covers a specific period, and whole life insurance, which provides coverage for your entire life and may build cash value over time.",
    },
    {
      question: "How much life insurance do I need?",
      answer:
        "The amount depends on your financial obligations, income replacement needs, debts, and the lifestyle you want to maintain for your dependents. Many experts recommend 10-15 times your annual income.",
    },
    {
      question: "How are premiums calculated?",
      answer:
        "Premiums are based on factors like your age, health, lifestyle, occupation, coverage amount, and type of policy. Younger, healthier individuals typically pay lower premiums.",
    },
    {
      question: "Can I change my life insurance policy later?",
      answer:
        "Some policies allow you to increase coverage or convert a term policy to a permanent one, but it depends on the terms of your contract and your health at the time of change.",
    },
  ];

  return (
    <div className="h-auto md:pt-0 mx-auto lg:w-full  text-center bg-[#F7F7F7] ">
      <div className="pt-[10vh] lg:pt-[10vh]   container mx-auto flex flex-col lg:flex-col lg:justify-center justify-between">
        <div className="w-full  text-center mb-16">
          <GiBullHorns className="w-full text-3xl text-center text-green-700 mb-2" />

          <motion.div
            initial={{ opacity: 0, y: -200 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3, margin: "100px" }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-xl font-bold text-[#687469] mb-2">
              Digital Insurance Solutions
            </h2>
            <h1 className="text-5xl font-bold text-[#334b35]">
              Simply compare, order, and get covered.
            </h1>
          </motion.div>
        </div>

        <div className=" mt-14 flex flex-col lg:flex-row lg:justify-center  gap-3 lg:mb-[10vh]">
          <div className="lg:w-1/2 flex flex-col items-center justify-center lg:justify-center lg:items-center">
            <div className="md:w-60  md:h-60 rounded-full overflow-hidden border-2 border-gray-300">
              <Image
                src={inspection}
                alt="Profile"
                objectFit="Content"
                className="rounded-full object-cover w-60 h-60"
              />
            </div>

            <div className="text-2xl text-start mt-5 font-semibold text-[#687469]">
              Choose the best{" "}
              <span className="text-3xl text-green-700 font-bold">
                Insurance Plan
              </span>
            </div>
          </div>
          <div className=" lg:w-1/2 flex justify-center items-center lg:justify-center lg:items-center">
            <LifeInsuranceForm />
          </div>
        </div>
      </div>

      <div className="mt-11 bg-[#F6F4EC]">
        <StaticFAQ data={lifeInsuranceFaqs} />
      </div>
    </div>
  );
};

export default LifeInsurance;
