interface Faq {
  question: string;
  answer: string;
}

class StaticData<T> {
  data: T[];

  constructor(data: T[]) {
    this.data = data;
  }
}

export const vetFAQs = new StaticData<Faq>([
  {
    question: "What services does AgriCore provide?",
    answer:
      "We provide a full range of veterinary services including routine check-ups, vaccinations, emergency care, and nutritional advice for your livestock.",
  },
  {
    question: "How do I book an appointment?",
    answer:
      "You can book an appointment by calling our clinic directly or using the online booking form available on our website.",
  },
  {
    question: "Do you provide on-site veterinary services?",
    answer:
      "Yes, our veterinarians can visit your farm or location to provide treatment and check-ups as needed.",
  },
  {
    question: "What are your operating hours?",
    answer:
      "Our clinic is open Monday to Friday from 8:00 AM to 6:00 PM, and Saturday from 9:00 AM to 2:00 PM.",
  },
  {
    question: "What should I bring to my pet's appointment?",
    answer:
      "Please bring any previous medical records, vaccination history, and a list of current medications your animal is taking.",
  },
  {
    question: "How can I get advice in an emergency?",
    answer:
      "For urgent situations, please call our emergency hotline. Our team is trained to provide immediate guidance and assistance.",
  },
]);

export type { Faq };
export { StaticData };