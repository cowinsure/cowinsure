'use client'

import React, { useEffect, useState } from 'react';

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

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/faqs/`);
        const result: ApiResponse = await response.json();
        if (result.status === 'success') {
          setFaqs(result.data);
        }
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      }
    };

    fetchFaqs();
  }, []);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="faq-section h-auto py-10 pb-20">
      <h2 className="text-2xl lg:text-5xl  font-bold mb-24 mt-5 text-[#334b35]">Frequently Asked Questions</h2>
      <ul className="container mx-auto space-y-4 px-4">
        {faqs.map((faq, index) => (
          <li key={index} className="border-b pb-4">
            <button
              className="w-full text-left text-2xl font-semibold"
              onClick={() => toggleExpand(index)}
            >
              {faq.question}
            </button>
            {expandedIndex === index && (
              <p className="mt-2 text-xl text-start text-gray-600">{faq.answer}</p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FaqSection;
