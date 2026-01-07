"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import FaqSection from "@/components/Home/FaqSection";
import { useParams } from "next/navigation";

import { formatToBDT } from "@/utils/currencyFormatter";
// import { HiOutlineMinusSm } from "react-icons/hi";
// import { FaPlus } from "react-icons/fa6";
import CowInvestmentForm from "@/components/Project/CowInvestmentForm";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Clock, TrendingUp } from "lucide-react";

// types/Investment.ts
export interface Category {
  id: string;
  name: string;
}

export interface ProjectDetails {
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
  is_active: boolean;
  created_at: string;
  updated_at: string;
  category: Category;
}

const DetailsID = () => {
  const { id } = useParams() as { id: string };

  const [projectDetails, setProjectDetails] = useState<ProjectDetails | null>(
    null
  );
  const [minTotalReturn, setMinTotalReturn] = useState<number>(0);
  const [maxTotalReturn, setMaxTotalReturn] = useState<number>(0);
  const [investmentValue, setInvestmentValue] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/portfolio/${id}/`
        );
        const data = await response.json();
        setProjectDetails(data.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching project details:", error);
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [id]);

  useEffect(() => {
    setMinTotalReturn(
      projectDetails?.total_return_min
        ? parseInt(projectDetails.total_return_min)
        : 0
    );
    setMaxTotalReturn(
      projectDetails?.total_return_max
        ? parseInt(projectDetails.total_return_max)
        : 0
    );
    setInvestmentValue(
      projectDetails?.investment_value
        ? parseInt(projectDetails.investment_value)
        : 0
    );
  }, [projectDetails]);

  const [profitCount, setProfitCount] = useState(1);

  const incrementProfitCount = () => {
    setProfitCount((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    const minReturn = calculateReturn(
      investmentValue,
      projectDetails?.expected_return_min
        ? parseFloat(projectDetails.expected_return_min)
        : 0
    );
    const totalMin = minReturn * profitCount;
    setMinTotalReturn(totalMin);

    const maxReturn = calculateReturn(
      investmentValue,
      projectDetails?.expected_return_max
        ? parseFloat(projectDetails.expected_return_max)
        : 0
    );
    const totalMax = maxReturn * profitCount;
    setMaxTotalReturn(totalMax);
  }, [
    investmentValue,
    profitCount,
    projectDetails?.expected_return_min,
    projectDetails?.expected_return_max,
  ]);

  console.log(investmentValue, maxTotalReturn, minTotalReturn);

  const decrementProfitCount = () => {
    setProfitCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 1));
  };

  const calculateReturn = (
    investment: number,
    interestRate: number
  ): number => {
    const newv = investment + investment * (interestRate / 100);
    return newv;
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  // if (loading) {
  //   return (
  //     <div className="min-h-[600px] flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
  //         <p className="text-gray-600">Loading Project Details...</p>
  //       </div>
  //     </div>
  //   );
  // }

  if (!projectDetails) {
    return (
      <div className="text-center font-bold text-[#406843] w-full mt-24 mb-24">
        <h1 className="text-5xl mb-10">404 Project Not Found!!!</h1>
        <Link
          className="text-center hover:text-[#202c21] hover:underline"
          href="/project"
        >
          Go back to projects page
        </Link>
      </div>
    );
  }

  console.log(projectDetails);

  return (
    <div className="">
      {/* ===== HERO ===== */}
      <section className="relative h-[85vh] overflow-hidden">
        <Image
          src={projectDetails.image_url}
          alt="Project Banner"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.8 }}
          className="relative z-10 h-full flex items-end"
        >
          <div className="container mx-auto px-6 pb-20 text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-3xl">
              {projectDetails.name}
            </h1>

            {/* KPI CHIPS */}
            <div className="flex flex-wrap gap-4">
              <Kpi icon={TrendingUp} label="Expected Return">
                {projectDetails.expected_return_min}% –{" "}
                {projectDetails.expected_return_max}%
              </Kpi>

              <Kpi icon={Clock} label="Duration">
                {projectDetails.investment_period}
              </Kpi>

              <Kpi icon={MapPin} label="Location">
                {projectDetails.location}
              </Kpi>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== CONTENT ===== */}
      <section className=" container mx-auto px-6 py-20 space-y-20s">
        {/* OVERVIEW */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className=""
        >
          <h2 className="text-3xl font-semibold text-[#1e3a2f] mb-6">
            Project Overview
          </h2>

          {/* STATS GRID */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full mb-8"
          >
            <StatCard
              title="Unit Price"
              value={formatToBDT(parseInt(projectDetails.investment_value))}
            />
            <StatCard
              title="Min Return"
              value={`${projectDetails.expected_return_min}%`}
            />
            <StatCard
              title="Max Return"
              value={`${projectDetails.expected_return_max}%`}
            />
            <StatCard
              title="Investment Period"
              value={projectDetails.investment_period}
            />
          </motion.div>

          <div
            className="prose prose-lg text-[#5f6f65]"
            dangerouslySetInnerHTML={{
              __html: projectDetails.description,
            }}
          />
        </motion.div>

        {/* INVESTMENT PANEL */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-white rounded-2xl shadow-xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden mt-8"
        >
          {/* FORM */}
          <div className="p-8 lg:p-12">
            <CowInvestmentForm />
          </div>

          {/* PROFIT SUMMARY */}
          <div className="bg-gradient-to-br from-green-800 to-green-900 text-white p-8 lg:p-12">
            <h3 className="text-3xl font-semibold mb-8 text-center">
              Profit Projection
            </h3>

            <div className="grid grid-cols-2 gap-6 mb-10">
              <ProfitBox label="Return">
                {projectDetails.expected_return_min}% –{" "}
                {projectDetails.expected_return_max}%
              </ProfitBox>

              <ProfitBox label="Duration">
                {projectDetails.investment_period}
              </ProfitBox>
            </div>

            <div className="bg-white/10 rounded-xl p-6 text-center space-y-4">
              <p className="uppercase text-sm tracking-wider opacity-80">
                Total Estimated Return
              </p>
              <p className="text-3xl font-bold">
                {formatToBDT(minTotalReturn)} – {formatToBDT(maxTotalReturn)}
              </p>

              {/* COUNTER */}
              <div className="flex justify-center items-center gap-6 pt-6">
                <CounterButton
                  onClick={decrementProfitCount}
                  disabled={profitCount <= 1}
                >
                  −
                </CounterButton>

                <span className="text-3xl font-semibold">{profitCount}</span>

                <CounterButton onClick={incrementProfitCount}>+</CounterButton>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="bg-[#f3f4ef] py-20">
        <FaqSection />
      </section>
    </div>
  );
};

const Kpi = ({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ size: number }>;
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-full text-sm">
    <Icon size={18} />
    <span className="opacity-80">{label}:</span>
    <span className="font-semibold">{children}</span>
  </div>
);

const StatCard = ({ title, value }: { title: string; value: string }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition">
    <p className="text-sm text-gray-500 mb-2">{title}</p>
    <p className="text-xl font-semibold text-[#1e3a2f]">{value}</p>
  </div>
);

const ProfitBox = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="bg-white/10 rounded-xl p-5 text-center">
    <p className="text-sm opacity-80 mb-1">{label}</p>
    <p className="text-xl font-semibold">{children}</p>
  </div>
);

const CounterButton = ({
  children,
  ...props
}: {
  children: React.ReactNode;
  [key: string]: any;
}) => (
  <button
    {...props}
    className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 transition text-2xl disabled:opacity-40"
  >
    {children}
  </button>
);

export default DetailsID;
