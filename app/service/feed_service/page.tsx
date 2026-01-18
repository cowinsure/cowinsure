/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect } from "react";
import BannerGeneral from "@/components/Home/BannerGeneral";
import SectionHeading from "@/components/SectionHeading";
import AOS from "aos";
import "aos/dist/aos.css";
import FeedFaqSection from "@/components/service/Feed Services/FeedFAQ";

// import banner from '../../public/agriculture-farmland-2023-11-27-05-02-44-utc.jpg';
// import Link from "next/link";

const products = [
  {
    image:
      "https://akijfeed.com/wp-content/uploads/al_opt_content/IMAGE/akijfeed.com/wp-content/uploads/2024/12/DAIRY-CATTLE_25-KG.jpg.bv.webp?bv_host=akijfeed.com",
    name: "Daily Cattle Feed",
    description:
      "High-quality feed formulated for dairy cattle to ensure optimal milk production and overall health.",
    price: 25.99,
  },
  {
    image:
      "https://akijfeed.com/wp-content/uploads/al_opt_content/IMAGE/akijfeed.com/wp-content/uploads/2024/12/BEEF-CATTLE_25-KG.jpg.bv.webp?bv_host=akijfeed.com",
    name: "Beef Cattle Feed",
    description:
      "Nutrient-rich feed specially designed for beef cattle to support growth, muscle development, and weight gain.",
    price: 18.5,
  },
  {
    image:
      "https://akijfeed.com/wp-content/uploads/al_opt_content/IMAGE/akijfeed.com/wp-content/uploads/2024/12/BEEF-BUILDER_25-KG-2.jpg.bv.webp?bv_host=akijfeed.com",
    name: "Beef Builder Feed",
    description:
      "Protein-rich feed for livestock aimed at building strength, enhancing muscle mass, and promoting healthy growth.",
    price: 22.75,
  },
  {
    image:
      "https://akijfeed.com/wp-content/uploads/al_opt_content/IMAGE/akijfeed.com/wp-content/uploads/2024/12/MILK-BOOSTER_25-KG.jpg.bv.webp?bv_host=akijfeed.com",
    name: "Milk Booster Feed",
    description:
      "Specially formulated pellets for cows to improve milk yield, support digestion, and maintain optimal health.",
    price: 20.0,
  },
];

const FeedService = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });

    // Optional: refresh AOS on component update
    return () => {
      // If needed, you can refresh or cleanup
      AOS.refresh();
    };
  }, []);
  return (
    <div className="h-auto overflow-hidden">
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
      {/* Banner Section */}
      <BannerGeneral bannerUrl={"/investmentpic2.jpg"}>
        <div className="relative z-10 flex flex-col items-center justify-center h-full bg-black bg-opacity-50 text-white text-center p-5">
          <h1 className="text-xl lg:text-6xl font-semibold mb-4">
            Feed Services
          </h1>
          <p className="text-lg lg:text-2xl mb-6">
            Quality feed solutions to optimize livestock nutrition and
            productivity.
          </p>
          {/* <Link href="/contact">
            <button className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-md">
              Get Feed Service
            </button>
          </Link> */}
        </div>
      </BannerGeneral>

      {/* Our Products Section */}
      <section className="max-w-[1350px] mx-auto lg:mt-32">
        <SectionHeading title="Our Products" />


        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10 px-10 rounded-2xl py-10">
          {products.map((product, index) => (
            <div
              key={index}
              className="relative bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer group"
            >
              {/* Product Image */}
              <div className="relative h-64 w-full overflow-hidden rounded-t-2xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                />
                {/* Floating badge */}
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full font-semibold text-sm shadow-lg">
                  New
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 flex flex-col h-full">
                <div className="">
                  <h3 className="text-xl font-bold text-[#334b35] mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                    {product.description}
                  </p>
                </div>

                {/* WhatsApp Button */}
                <div className="flex ">
                  <a
                    href={`https://wa.me/8801999467873/?text=I'm interested in ${encodeURIComponent(
                      product.name,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 hover:bg-green-500 text-green-600 hover:text-white font-semibold rounded-lg transition-all duration-300 border border-green-500 flex-1"
                  >
                    {/* WhatsApp Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.52 3.48A11.87 11.87 0 0012 0C5.37 0 0 5.37 0 12a11.94 11.94 0 001.85 6.28L0 24l5.77-1.88A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52zM12 22c-2.03 0-3.92-.62-5.5-1.67l-.39-.23-3.42 1.12 1.14-3.33-.26-.42A9.95 9.95 0 012 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.02-7.98l-2.29-.66a1 1 0 00-1.07.3l-.52.53a8.28 8.28 0 01-3.85-3.85l.53-.52a1 1 0 00.3-1.07l-.65-2.3a1 1 0 00-1.1-.65l-1.57.25a1 1 0 00-.9 1.09 11.22 11.22 0 0011 11 1 1 0 001.09-.9l.24-1.57a1 1 0 00-.65-1.1z" />
                    </svg>
                    Order Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Feed Services Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <SectionHeading title="About Our Feed Services" />

        <div className="text-left space-y-8 mt-10">
          <p
            className="text-lg text-gray-700 text-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Our feed services provide premium nutrition solutions for livestock
            to promote healthy growth, maximize productivity, and maintain
            overall wellbeing. We combine science-based formulations with
            practical feeding strategies.
          </p>

          <ul
            className="list-disc list-inside text-gray-700 space-y-2"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <li>Customized feed formulations for cattle, poultry, and goats</li>
            <li>Expert advice on portion control and feeding schedules</li>
            <li>Supplementation guidance to boost immunity and productivity</li>
            <li>Quality assurance with high-grade ingredients</li>
            <li>On-site consultations for optimized feeding plans</li>
          </ul>

          <div className="grid md:grid-cols-2 gap-8">
            <div
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300"
              data-aos="fade-right"
              data-aos-delay="300"
            >
              <h3 className="text-xl font-semibold text-[#334b35] mb-4">
                Tailored Feed Formulations
              </h3>
              <p className="text-gray-600 mb-4">
                We create feed mixes that match the specific nutritional
                requirements of different livestock types and life stages.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>High-protein cattle feed</li>
                <li>Energy-rich poultry rations</li>
                <li>Balanced goat nutrition packs</li>
              </ul>
            </div>

            <div
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300"
              data-aos="fade-left"
              data-aos-delay="300"
            >
              <h3 className="text-xl font-semibold text-[#334b35] mb-4">
                Feeding Advisory Services
              </h3>
              <p className="text-gray-600 mb-4">
                Our experts provide actionable advice to maximize efficiency and
                improve animal health through optimized feeding practices.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Daily and weekly feeding schedules</li>
                <li>Feed portion recommendations</li>
                <li>Supplement usage guidance</li>
              </ul>
            </div>
          </div>

          <div
            className="bg-green-50 border-l-4 border-green-400 p-6 rounded-xl shadow-sm mt-10"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <h3 className="text-lg font-bold text-[#334b35] mb-2">
              Why Choose Our Feed Services?
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Scientifically formulated for optimal growth and health</li>
              <li>High-quality ingredients with safety assurance</li>
              <li>Customized solutions for your farms unique needs</li>
              <li>Expert guidance to maximize productivity</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Feed Awareness Section - Redesigned */}
      <section className="py-20 bg-white">
        <SectionHeading
          title="Learn About Feed"
          subtitle="Why Quality Feed Matters"
        />
        {/* Left: Text Content */}
        <div
          className="flex flex-col justify-center max-w-7xl mx-auto px-6 text-center"
          data-aos="fade-right"
        >
          <p className="text-lg text-gray-700 leading-8 mb-6">
            Proper nutrition is the foundation of livestock health and
            productivity. Choosing the right feed can significantly impact milk
            yield, weight gain, and overall farm profitability. Our awareness
            program helps farmers understand feed quality, read labels, and
            implement sustainable feeding practices.
          </p>
          <p className="text-gray-600">
            By focusing on balanced nutrition, quality sourcing, and efficient
            feeding, you can maximize productivity while reducing waste.
          </p>
        </div>

        <div className="max-w-[1350px] mx-auto px-6 flex ">
          {/* Feed Feature Cards Section with Left Image */}
          <section className="py-20 bg-white">
            <div className=" px-6 lg:flex lg:items-center lg:gap-12">
              {/* Left: Section Image */}
              <div className="lg:w-1/2 mb-10 lg:mb-0" data-aos="fade-right">
                <img
                  src="/farmerimg.jpg"
                  alt="Feed Services Illustration"
                  className="w-full rounded-2xl shadow-lg object-cover"
                />
              </div>

              {/* Right: Feature Cards */}
              <div className="lg:w-1/2 grid sm:grid-cols-1 md:grid-cols-1 gap-6">
                {[
                  {
                    title: "Nutrient Balance",
                    desc: "Ensure feeds provide the right mix of proteins, vitamins, and minerals for healthy growth and development.",
                    icon: (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c.667 0 1.333.333 2 1s1.333 1 2 1 1.333-.333 2-1 1.333-1 2-1M4 16h16M4 12h16M4 8h16"
                      />
                    ),
                  },
                  {
                    title: "Quality Assurance",
                    desc: "Source feeds from trusted suppliers and verify quality to avoid contaminants and ensure safety for your livestock.",
                    icon: (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    ),
                  },
                ].map((card, idx) => (
                  <div
                    key={idx}
                    data-aos="fade-up"
                    data-aos-delay={100 + idx * 100}
                    className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-3 hover:scale-[1.03] ring-1 ring-green-100 p-6"
                  >
                    {/* Icon + Title */}
                    <div className="flex items-start gap-5 mb-4">
                      <div className="bg-gradient-to-br from-green-100 to-green-200 p-4 rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-8 h-8 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          {card.icon}
                        </svg>
                      </div>
                      <h3 className="text-lg lg:text-xl font-semibold text-gray-800">
                        {card.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm lg:text-base">
                      {card.desc}
                    </p>

                    {/* Decorative Circle */}
                    <div className="absolute -top-6 -right-6 w-16 h-16 bg-green-100 rounded-full opacity-30 pointer-events-none"></div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* FAQ Section */}
      <div className="text-center">
        <FeedFaqSection />
      </div>
    </div>
  );
};

export default FeedService;
