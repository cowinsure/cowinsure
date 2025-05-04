"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import CowPurchaseModal from "@/components/Project/cowSellProject/CowPurchaseModal";
import { useParams } from "next/navigation";
import { formatToBDT } from "@/utils/currencyFormatter";
import { motion, AnimatePresence } from "framer-motion";

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

const TestPage = () => {
  const { id } = useParams() as { id: string };
  const [loading, setLoading] = useState(true);

  const [projectDetails, setProjectDetails] = useState<Portfolio | null>(null);

  const [activeTab, setActiveTab] = useState("Overview");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabs = ["Overview", "Delivery Terms", "Payment Terms", "FAQs"];

  const [faqNterms, setFaqNterms] = useState<BaseCategory[]>([]);

  // const [activeImage,setActiveImage] = useState(0)

  // const cowImages = [
  //   Image1,
  //   Image2
  // ]

  const closeAll = () => {
    setIsModalOpen(false);
  };

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
    const fetchBaseCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/base-categories/`
        );
        const result: BaseCategoryApiResponse = await response.json();
        if (result.status === "success") {
          setFaqNterms(result.data);
        }
      } catch (error) {
        console.error("Error fetching base categories: ", error);
      }
    };
    fetchBaseCategories();
  }, []);

  if (loading) {
    return <div className="h-screen w-screen text-center">Loading...</div>;
  }

  if (!projectDetails) {
    return <div>Error loading project details.</div>;
  }

  return (
    <motion.div
      className="bg-[#F7F7F7] p-6 pt-12 lg:p-10 lg:pt-14"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Top Section */}
      <motion.div
        className="max-w-6xl mx-auto bg-white rounded-md shadow-md overflow-hidden lg:flex"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Image Gallery */}
        <motion.div
          className="lg:w-1/2 p-4"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="rounded-md overflow-hidden mb-4">
            <Image
              src={projectDetails.image_url}
              alt="cow-main"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
        </motion.div>

        {/* Main Info */}
        <div className="lg:w-1/2 p-6 flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center space-y-6">
            <h2 className="text-3xl font-medium">
              Breed: {projectDetails.extra_data.breed}
            </h2>
            <h2 className="text-xl">
              Color: {projectDetails.extra_data.colour}
            </h2>
            <h2 className="text-2xl">
              <span className="text-green-800">
                {projectDetails.extra_data.weightKg} KG
              </span>
            </h2>
          </div>
          <p className="text-4xl font-bold text-green-900 my-4">
            {formatToBDT(projectDetails.extra_data.sellingPrice)}
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded"
          >
            Buy Now
          </button>
        </div>
        <CowPurchaseModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={closeAll}
        />
      </motion.div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto bg-green-100 mt-10 pb-1 rounded-md shadow-md">
        <div className="bg-green-100 rounded-lg p-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative overflow-hidden py-3 font-medium rounded-md transition-colors duration-300 ${
                  activeTab === tab
                    ? "bg-green-800 text-white"
                    : "bg-green-200 text-green-900 hover:text-white"
                } group `}
              >
                <span className="relative z-10">{tab}</span>
                <span className="absolute inset-0 bg-green-800 transition-all duration-500 transform scale-x-0 origin-left group-hover:scale-x-100 rounded-md" />
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white p-6 pb-10 rounded-lg shadow-sm m-2 min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, x: 10, y: 20 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.15 }}
            >
              {activeTab === "Overview" && (
                <div>
                  {/* Overview Content */}
                  <div className="text-lg lg:text-xl grid grid-cols-1 md:grid-cols-2 gap-y-8">
                    {[
                      { label: "Cow ID", value: projectDetails.name },
                      {
                        label: "Cow Breed",
                        value: projectDetails.extra_data.breed,
                      },
                      {
                        label: "Age",
                        value: `${projectDetails.extra_data.age} Months`,
                      },
                      { label: "Gender", value: projectDetails.extra_data.sex },
                      {
                        label: "Color",
                        value: `${projectDetails.extra_data.colour}`,
                      },
                      {
                        label: "Current Live Weight",
                        value: `${projectDetails.extra_data.weightKg} KG`,
                      },
                      {
                        label: "Height",
                        value: `${projectDetails.extra_data.heightFeet} Feet`,
                      },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <li>
                          <strong>{item.label}:</strong> {item.value}
                        </li>
                      </div>
                    ))}
                  </div>

                  <div className="w-full flex flex-col lg:gap-5 justify-start items-start lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1 flex flex-col lg:flex-col gap-5 justify-start items-start lg:items-start lg:justify-start">
                      <h1 className="text-3xl font-bold text-[#334b35] text-start w-full mt-14 mb-2">
                        Description
                      </h1>
                      <div
                        className="text-start text-lg"
                        dangerouslySetInnerHTML={{
                          __html: projectDetails.description,
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "Delivery Terms" && (
                <p>
                  {
                    faqNterms.find(
                      (category) => category.name === "Delivery Terms"
                    )?.description
                  }
                </p>
              )}
              {activeTab === "Payment Terms" && (
                <p>
                  {
                    faqNterms.find(
                      (category) => category.name === "Payment Terms"
                    )?.description
                  }
                </p>
              )}
              {activeTab === "FAQs" && (
                <p>
                  {
                    faqNterms.find(
                      (category) => category.name === "FAQs - Cow Details"
                    )?.description
                  }
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default TestPage;
