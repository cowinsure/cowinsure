"use client";
import { useEffect, useState, useRef } from "react";
import type React from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BackgroundImageLayer from "../common/BackgroundImageLayer";

import village from "../../public/village.png";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Faq {
  question: string;
  answer: string;
}

interface ApiResponse {
  status: string;
  message: string;
  data: Faq[];
}

const FaqSection: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Refs for animations
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const faqRefs = useRef<(HTMLLIElement | null)[]>([]);
  const answerRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/faqs/`
        );
        const result: ApiResponse = await response.json();
        if (result.status === "success") {
          setFaqs(result.data);
        }
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  // Initial scroll-triggered animations
  useEffect(() => {
    if (!isLoading && faqs.length > 0) {
      const ctx = gsap.context(() => {
        // Set initial states
        gsap.set(titleRef.current, {
          y: -20,
          opacity: 0,
        });

        gsap.set(faqRefs.current, {
          y: -100,
          opacity: 0,
        });

        // Create timeline with scroll trigger
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            // markers: true, // Uncomment for debugging
          },
        });

        // Title animation
        tl.to(titleRef.current, {
          duration: 0.35,
          y: 0,
          opacity: 1,
          ease: "power2.out",
        });

        // FAQ items staggered animation
        tl.to(
          faqRefs.current,
          {
            duration: 0.8,
            y: 0,
            opacity: 1,
            ease: "power2.out",
            stagger: 0.3,
          },
          "-=0.5"
        );
      }, sectionRef);

      return () => ctx.revert();
    }
  }, [isLoading, faqs]);

  // Answer dropdown animation
  useEffect(() => {
    if (expandedIndex !== null && answerRefs.current[expandedIndex]) {
      const answerElement = answerRefs.current[expandedIndex];

      if (answerElement) {
        // Set initial state for the answer
        gsap.set(answerElement, {
          height: 0,
          opacity: 0,
          y: -30,
          overflow: "hidden",
        });

        // Animate the answer dropping down
        gsap.to(answerElement, {
          duration: 0.6,
          height: "auto",
          opacity: 1,
          y: 0,
          ease: "power2.out",
        });
      }
    }

    // Animate closing of previously opened answer with upward motion
    answerRefs.current.forEach((answerElement, index) => {
      if (answerElement && index !== expandedIndex) {
        gsap.to(answerElement, {
          duration: 0.5,
          height: 0,
          opacity: 0,
          y: -40,
          ease: "power2.in",
          onComplete: () => {
            // Reset position after animation completes
            gsap.set(answerElement, { y: -30 });
          },
        });
      }
    });
  }, [expandedIndex]);

  const toggleExpand = (index: number) => {
    // Add a small visual feedback on the button
    const button = faqRefs.current[index]?.querySelector("button");
    if (button) {
      gsap.to(button, {
        scale: 0.98,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      });
    }

    setExpandedIndex(expandedIndex === index ? null : index);
  };

  if (isLoading) {
    return (
      <section className="faq-section min-h-[500px] h-auto py-10 pb-20">
        <div className="container mx-auto px-4 text-center">
          <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 ">Loading FAQs...</p>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="faq-section relative h-auto py-10 pb-20">
      <BackgroundImageLayer imageUrl={village.src} opacity={0.1} size="80%" position="bottom" />
      <div className="relative z-10 container mx-auto px-4">
        <h2
          ref={titleRef}
          className="text-2xl lg:text-5xl font-bold mb-24 mt-5 text-[#334b35] text-center opacity-0"
        >
          Frequently Asked Questions
        </h2>

        <ul className="space-y-6 max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <li
              key={index}
              ref={(el) => {faqRefs.current[index] = el}}
              className="border-b border-gray-200 pb-6 opacity-0"
            >
              <button
                className="w-full text-left text-xl lg:text-2xl font-semibold text-[#334b35] hover:text-green-700 transition-colors duration-300 flex justify-between items-center group"
                onClick={() => toggleExpand(index)}
              >
                <span className="pr-4">{faq.question}</span>
                <span
                  className={`text-2xl transition-transform duration-300 ${
                    expandedIndex === index ? "rotate-45" : "rotate-0"
                  } group-hover:scale-110`}
                >
                  +
                </span>
              </button>

              <div className="overflow-hidden">
                <p
                  ref={(el) => {answerRefs.current[index] = el}}
                  className="mt-4 text-lg lg:text-xl text-gray-600 leading-relaxed"
                  style={{
                    height: expandedIndex === index ? "auto" : "0",
                    opacity: expandedIndex === index ? 1 : 0,
                  }}
                >
                  {faq.answer}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FaqSection;
