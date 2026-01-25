"use client";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import village from "../../../public/village.png";
import BackgroundImageLayer from "@/components/common/BackgroundImageLayer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Faq {
  question: string;
  answer: string;
}

const FEED_FAQS: Faq[] = [
  {
    question: "What types of feed do you offer?",
    answer:
      "We provide a variety of feed options for cattle, poultry, goats, and other livestock, including energy-rich, protein-rich, and balanced rations.",
  },
  {
    question: "Can you create customized feed formulations?",
    answer:
      "Yes, our nutrition experts can design custom feed mixes tailored to your livestock's species, age, and production goals.",
  },
  {
    question: "Do you provide guidance on feeding schedules?",
    answer:
      "Absolutely. We offer detailed feeding advisory services to help you maximize growth and productivity while minimizing waste.",
  },
  {
    question: "How can I ensure feed quality?",
    answer:
      "All our feeds are sourced from reputable suppliers, and we perform quality checks to ensure safety and nutritional consistency.",
  },
  {
    question: "Do you provide on-site consultation?",
    answer:
      "Yes, our team can visit your farm to assess your current feeding practices and provide actionable recommendations.",
  },
  {
    question: "Are your feeds suitable for organic or free-range livestock?",
    answer:
      "We offer formulations that comply with organic and free-range standards, ensuring high-quality nutrition without compromising regulations.",
  },
];

const FeedFaqSection: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const faqRefs = useRef<(HTMLLIElement | null)[]>([]);
  const answerRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  // Scroll-triggered animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(titleRef.current, { y: -20, opacity: 0 });
      gsap.set(faqRefs.current, { y: -100, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(titleRef.current, {
        duration: 0.35,
        y: 0,
        opacity: 1,
        ease: "power2.out",
      });
      tl.to(
        faqRefs.current,
        { duration: 0.8, y: 0, opacity: 1, ease: "power2.out", stagger: 0.3 },
        "-=0.5",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Answer dropdown animation
  useEffect(() => {
    if (expandedIndex !== null && answerRefs.current[expandedIndex]) {
      const answerElement = answerRefs.current[expandedIndex];
      gsap.set(answerElement, {
        height: 0,
        opacity: 0,
        y: -30,
        overflow: "hidden",
      });
      gsap.to(answerElement, {
        duration: 0.6,
        height: "auto",
        opacity: 1,
        y: 0,
        ease: "power2.out",
      });
    }

    answerRefs.current.forEach((answerElement, index) => {
      if (answerElement && index !== expandedIndex) {
        gsap.to(answerElement, {
          duration: 0.5,
          height: 0,
          opacity: 0,
          y: -40,
          ease: "power2.in",
          onComplete: () => {
            gsap.set(answerElement, { y: -30 });
          },
        });
      }
    });
  }, [expandedIndex]);

  const toggleExpand = (index: number) => {
    const button = faqRefs.current[index]?.querySelector("button");
    if (button)
      gsap.to(button, {
        scale: 0.98,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      });
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      className="faq-section relative h-auto py-10 pb-20"
    >
      <BackgroundImageLayer
        imageUrl={village.src}
        opacity={0.05}
        size="80%"
        position="bottom"
      />
      <div className="relative z-10 container mx-auto px-4">
        <h2
          ref={titleRef}
          className="text-2xl lg:text-5xl font-bold mb-24 mt-5 text-[#334b35] text-center opacity-0"
        >
          Frequently Asked Questions
        </h2>

        <ul className="space-y-6 max-w-4xl mx-auto">
          {FEED_FAQS.map((faq, index) => (
            <li
              key={index}
              ref={(el) => {
                faqRefs.current[index] = el;
              }}
              className="border-b border-gray-200 pb-6 opacity-0"
            >
              <button
                className="w-full text-left text-xl font-semibold text-[#334b35] hover:text-green-700 transition-colors duration-300 flex justify-between items-center group"
                onClick={() => toggleExpand(index)}
              >
                <span className="pr-4">{faq.question}</span>
                <span
                  className={`text-2xl transition-transform duration-300 ${expandedIndex === index ? "rotate-45" : "rotate-0"} group-hover:scale-110`}
                >
                  +
                </span>
              </button>

              <div className="overflow-hidden">
                <p
                  ref={(el) => {
                    answerRefs.current[index] = el;
                  }}
                  className="mt-4 text-lg lg:text-xl text-gray-600 leading-relaxed text-left"
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

export default FeedFaqSection;
