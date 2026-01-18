/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import BannerGeneral from "@/components/Home/BannerGeneral";
import { motion, AnimatePresence } from "framer-motion";
import ImageCapture from "@/components/ImageCapture";
import ContactUs from "@/components/Helper/ContactUs";

import { ShieldCheck, TrendingUp, Wallet } from "lucide-react";
import "animate.css";
import AOS from "aos";
import "aos/dist/aos.css";
import SectionHeading from "@/components/SectionHeading";
import FaqSectionStatic from "@/components/service/vetservice/StaticFAQ";

interface Faq {
  question: string;
  answer: string;
}

interface ApiResponse {
  status: string;
  message: string;
  data: FormField[];
}

interface FormField {
  id: number;
  label: string;
  field_type: string;
  required: boolean;
  choices: string[];
}
interface finalForm {
  name: string;
  phone: string;
  email?: string;
  insurance_type_id: number; // Hardcoded as per the required output
  responses: DynamicFieldResponse[];
}

interface DynamicFieldResponse {
  field_id: number;
  value: string;
}

const VetService = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  const [image, setImage] = useState<File | null>(null);
  const [formValues, setFormValues] = useState<finalForm>({
    name: "",
    phone: "",
    email: "",
    insurance_type_id: 4, // Hardcoded as per the required output
    responses: [],
  });
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  // const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formFields, setFormFields] = useState<FormField[]>([]);

  const findByLabel = (label: string) => {
    return formFields.find((item) => item.label === label);
  };

  const getResponseValue = (fieldId: number) => {
    return (
      formValues.responses.find((r) => r.field_id === fieldId)?.value || ""
    );
  };

  const handleDynamicChange = (value: string, field: FormField) => {
    setFormValues((prev) => {
      const responses = [...prev.responses];
      const idx = responses.findIndex((r) => r.field_id === field.id);
      if (idx > -1) {
        responses[idx] = { ...responses[idx], value };
      } else {
        responses.push({ field_id: field.id, value });
      }
      return { ...prev, responses };
    });
  };

  useEffect(() => {
    AOS.init();
    const fetchFormFields = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/insurance/insurance-types/4/form/`,
        );
        const result: ApiResponse = await response.json();
        if (result.status === "success") {
          setFormFields(result.data);
          console.log(result.data);
        }
      } catch (error) {
        console.error("Error fetching form fields:", error);
      }
    };

    fetchFormFields();
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !mobile) {
      alert("Please fill all required fields");
      return;
    }

    // build final payload including dynamic responses and kept name/phone
    const payload: finalForm = {
      ...formValues,
      name,
      phone: mobile,
      insurance_type_id: 4,
    };

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("phone", payload.phone);
      formData.append("insurance_type_id", String(payload.insurance_type_id));

      const responses = [...payload.responses];
      console.log(payload);

      // Attach image if present to first file field (if any)
      // if (image) {
      //   const fileFields = formFields.filter((f) => f.field_type === "file");
      //   if (fileFields.length > 0) {
      //     const fileField = fileFields[0];
      //     formData.append(`file_${fileField.id}`, image, image.name);
      //     const idx = responses.findIndex((r) => r.field_id === fileField.id);
      //     if (idx > -1) responses[idx].value = image.name;
      //     else responses.push({ field_id: fileField.id, value: image.name });
      //   } else {
      //     formData.append("file", image, image.name);
      //   }
      // }

      formData.append("responses", JSON.stringify(responses));
      console.log(formData);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/insurance/submit-form/`,
        { method: "POST", body: JSON.stringify(payload) },
      );

      let result;
      try {
        result = await res.json();
      } catch (err) {
        const txt = await res.text();
        console.error("Non-JSON response:", txt);
        throw new Error(txt || "Non-JSON response from server" + err);
      }

      if (res.ok) {
        setToast({
          message: "Request submitted successfully",
          type: "success",
        });
        setIsModalOpen(false);
        setName("");
        setMobile("");

        setImage(null);

        setFormValues({
          name: "",
          phone: "",
          email: "",
          insurance_type_id: 4,
          responses: [],
        });
      } else {
        console.error("Submission error:", result);
        setToast({
          message: result?.message || "Submission failed",
          type: "error",
        });
      }
    } catch (err) {
      console.error("Submit exception:", err);
      setToast({
        message: "An error occurred while submitting the form",
        type: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // auto-dismiss toast
  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(id);
  }, [toast]);

  return (
    <div className="h-auto overflow-hidden">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 max-w-sm w-full px-4 py-2 rounded shadow-lg text-white ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
          role="status"
        >
          {toast.message}
        </div>
      )}

      {/* Banner Section */}
      <BannerGeneral bannerUrl={"/Vet.jpeg"}>
        <div className="relative z-10 flex flex-col items-center justify-center h-full bg-black bg-opacity-30 text-white text-center p-5">
          <h1 className="text-3xl lg:text-6xl font-semibold mb-4">
            Veterinary Services
          </h1>
          <p className="text-lg lg:text-2xl mb-6">
            Comprehensive health checkups and vaccination support for your
            livestock
          </p>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md"
          >
            Get Vet Service
          </button>
        </div>
      </BannerGeneral>

      {/* About Vet Services Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 bg-[#F6F4EC]">
        <SectionHeading
          title="About Our Veterinary Services"
          subtitle="Our Services"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-12">
          {/* Left: Image */}
          <div className="w-full h-[420px] rounded-2xl overflow-hidden shadow-lg">
            <img
              src={"/trusted_vet_serv.jpeg"}
              alt="AgriCore Veterinary Services"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right: Content */}
          <div className="text-[#334b35]">
            <h3
              className="text-2xl lg:text-3xl mb-4"
              data-aos="fade-in"
              data-aos-delay="0"
            >
              Trusted Veterinary Care by AgriCore
            </h3>

            <p
              className="text-[#687469] mb-6 leading-relaxed"
              data-aos="fade-in"
              data-aos-delay="100"
            >
              At <span className="font-semibold text-[#334b35]">AgriCore</span>,
              we are committed to providing reliable, professional, and
              compassionate veterinary services to ensure the health,
              productivity, and well-being of your livestock. Our expert team
              focuses on preventive care, disease management, and long-term
              animal welfare.
            </p>

            <ul className="space-y-3 text-[#687469]">
              <li
                className="flex items-start gap-3"
                data-aos="fade-up"
                data-aos-delay="0"
                data-aos-duration="600"
              >
                <span className="text-green-700 font-bold">✔</span>
                Regular health check-ups to prevent diseases early
              </li>
              <li
                className="flex items-start gap-3"
                data-aos="fade-up"
                data-aos-delay="100"
                data-aos-duration="600"
              >
                <span className="text-green-700 font-bold">✔</span>
                Professional vaccination programs for livestock safety
              </li>
              <li
                className="flex items-start gap-3"
                data-aos="fade-up"
                data-aos-delay="200"
                data-aos-duration="600"
              >
                <span className="text-green-700 font-bold">✔</span>
                Emergency care and treatment support
              </li>
              <li
                className="flex items-start gap-3"
                data-aos="fade-up"
                data-aos-delay="300"
                data-aos-duration="600"
              >
                <span className="text-green-700 font-bold">✔</span>
                Nutritional guidance for healthy growth and productivity
              </li>
              <li
                className="flex items-start gap-3"
                data-aos="fade-up"
                data-aos-delay="400"
                data-aos-duration="600"
              >
                <span className="text-green-700 font-bold">✔</span>
                Disease prevention and biosecurity consultation
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Awareness Campaign Section */}
      <section className="py-20 bg-[#ffffff]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            title="Why Veterinary Services Matter"
            subtitle="Importance"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-12">
            {/* Left: Content */}
            <div>
              <h3 className="text-2xl lg:text-3xl text-[#334b35] mb-4">
                Building Healthier Farms with AgriCore
              </h3>

              <p className="text-[#687469] mb-6 leading-relaxed">
                Veterinary services play a vital role in sustainable livestock
                management. With proper care, farmers can prevent diseases,
                improve productivity, and protect their livelihoods.
                <span className="font-semibold text-[#334b35]">
                  {" "}
                  AgriCore
                </span>{" "}
                supports farmers through expert veterinary guidance and
                awareness programs.
              </p>

              <ul className="space-y-4 text-[#687469]">
                <li className="flex items-start gap-3">
                  <span className="text-green-700 font-bold">✔</span>
                  Prevents the spread of contagious animal diseases
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-700 font-bold">✔</span>
                  Improves milk, meat, and reproduction performance
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-700 font-bold">✔</span>
                  Reduces financial losses caused by illness
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-700 font-bold">✔</span>
                  Promotes animal welfare and ethical farming
                </li>
              </ul>

              <p className="mt-6 text-[#687469] leading-relaxed">
                By raising awareness and providing access to veterinary care,
                AgriCore helps farmers build stronger, healthier, and more
                sustainable agricultural communities.
              </p>
            </div>

            {/* Right: Feature Cards */}
            <div className="relative grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 place-items-center gap-5 lg:gap-0">
              {/* Card 1 - Top Right */}
              <div
                data-aos="zoom-out-left"
                data-aos-duration="800"
                data-aos-delay="0"
                className="lg:col-start-2 lg:row-start-1 bg-white p-5 rounded-2xl 
               border border-green-100 shadow-sm 
               drop-shadow-lg transition-all duration-300 -z-0 translate-y-20 translate-x-1"
              >
                <div className="flex items-center gap-2 text-green-700 text-sm font-semibold uppercase mb-2">
                  <ShieldCheck size={16} />
                  Protection
                </div>
                <h4 className="text-lg font-bold text-[#334b35] mb-3">
                  Disease Prevention
                </h4>
                <p className="text-sm text-[#687469] leading-relaxed">
                  Routine health checks and vaccination programs help prevent
                  the spread.
                </p>
              </div>

              {/* Card 2 - Middle Left */}
              <div
                data-aos="zoom-out-up"
                data-aos-duration="800"
                data-aos-delay="200"
                className="lg:col-start-1 lg:row-start-2 translate-x-10 bg-white p-5 rounded-2xl 
               border border-green-100 shadow-sm 
               drop-shadow-lg -translate-y-12 transition-all duration-300 -z-0"
              >
                <div className="flex items-center gap-2 text-green-700 text-sm font-semibold uppercase mb-2">
                  <TrendingUp size={16} />
                  Performance
                </div>
                <h4 className="text-lg font-bold text-[#334b35] mb-3">
                  Higher Productivity
                </h4>
                <p className="text-sm text-[#687469] leading-relaxed">
                  Healthy animals grow faster, reproduce better, and deliver
                  higher milk and meat yields.
                </p>
              </div>

              {/* Card 3 - Bottom Right */}
              <div
                data-aos="zoom-out-right"
                data-aos-duration="800"
                data-aos-delay="400"
                className="lg:col-start-2 lg:row-start-3 -translate-x-10 -translate-y-24 bg-white p-5 rounded-2xl 
               border border-green-100 shadow-sm 
               drop-shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-2 text-green-700 text-sm font-semibold uppercase mb-2">
                  <Wallet size={16} />
                  Stability
                </div>
                <h4 className="text-lg font-bold text-[#334b35] mb-3">
                  Economic Security
                </h4>
                <p className="text-sm text-[#687469] leading-relaxed">
                  Preventive veterinary care minimizes medical costs and
                  protects farmers from financial losses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <div className="text-center bg-[#F6F4EC]">
        <FaqSectionStatic faqs={
         [
  {
    question: "What services does Insurecow provide?",
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
]
        } />
      </div>

      <div className="text-center bg-[#F6F4EC]">
        <ContactUs />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <AnimatePresence>
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              data-lenis-prevent
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative w-full max-w-xl mx-4 bg-white rounded-2xl shadow-xl flex flex-col max-h-[90vh] p-6"
            >
              {/* Close */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute right-5 top-5 text-slate-400 hover:text-slate-700 transition"
              >
                ✕
              </button>

              {/* Header */}
              <div className="mb-10">
                <h2 className="text-2xl font-semibold text-[#334b35]">
                  Request Vet Service
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Fill in the details and our vet will contact you shortly
                </p>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="space-y-5 overflow-y-auto overscroll-contain"
              >
                {/* Keep name & mobile; render dynamic fields using findByLabel */}
                {/* <div>
                  <label className="text-sm font-medium text-slate-600">
                    Select your service
                  </label>
                  <select
                    value={cattle}
                    onChange={(e) => setCattle(e.target.value)}
                    required
                    className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1 bg-white focus:border-green-600 focus:ring-2 focus:ring-green-500/30 outline-none transition text-black"
                  >
                    <option value="">Select service</option>
                    {serviceOptions.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                </div> */}

                {/* Cattle */}
                {/* <div>
                  <label className="text-sm font-medium text-slate-600">
                    Cattle Type
                  </label>
                  <select
                    value={cattle}
                    onChange={(e) => setCattle(e.target.value)}
                    required
                   className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1 bg-white focus:border-green-600 focus:ring-2 focus:ring-green-500/30 outline-none transition text-black"
                  >
                    <option value="">Select cattle</option>
                    {cattleOptions.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                </div> */}

                {/* Name */}
                <div>
                  <label className="text-sm font-medium text-slate-600">
                    Name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Your full name"
                    className="mt-1 w-full rounded-md text-black border border-slate-300 px-2 py-1 focus:border-green-600 focus:ring-2 focus:ring-green-500/30 outline-none transition"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-600">
                    Mobile Number
                  </label>
                  <input
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                    placeholder="01XXXXXXXXX"
                    className="mt-1 w-full rounded-md border text-black border-slate-300 px-2 py-1 focus:border-green-600 focus:ring-2 focus:ring-green-500/30 outline-none transition"
                  />
                </div>

                {formFields.map((field) => {
                  const lookup = findByLabel(field.label);
                  const value = lookup ? getResponseValue(lookup.id) : "";
                  if (field.field_type === "choice") {
                    return (
                      <div key={field.id}>
                        <label className="text-sm font-medium text-slate-600">
                          {field.label}
                        </label>
                        <select
                          value={value}
                          onChange={(e) =>
                            handleDynamicChange(e.target.value, field)
                          }
                          required={field.required}
                          className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1 bg-white focus:border-green-600 focus:ring-2 focus:ring-green-500/30 outline-none transition text-black"
                        >
                          <option value="">Select</option>
                          {field.choices.map((c) => (
                            <option key={c} value={c.trim()}>
                              {c.trim()}
                            </option>
                          ))}
                        </select>
                      </div>
                    );
                  }

                  if (field.field_type === "text") {
                    const isRemarks = /remarks/i.test(field.label);
                    return (
                      <div key={field.id}>
                        <label className="text-sm font-medium text-slate-600">
                          {field.label}
                        </label>
                        {isRemarks ? (
                          <textarea
                            rows={3}
                            value={value}
                            onChange={(e) =>
                              handleDynamicChange(e.target.value, field)
                            }
                            required={field.required}
                            className="mt-1 w-full rounded-md text-black border border-slate-300 px-2 py-1 focus:border-green-600 focus:ring-2 focus:ring-green-500/30 outline-none transition"
                            placeholder={field.label}
                          />
                        ) : (
                          <input
                            value={value}
                            onChange={(e) =>
                              handleDynamicChange(e.target.value, field)
                            }
                            required={field.required}
                            placeholder={field.label}
                            className="mt-1 w-full rounded-md text-black border border-slate-300 px-2 py-1 focus:border-green-600 focus:ring-2 focus:ring-green-500/30 outline-none transition"
                          />
                        )}
                      </div>
                    );
                  }

                  if (field.field_type === "file") {
                    return (
                      <div key={field.id}>
                        <label className="text-sm font-medium text-slate-600">
                          {field.label}
                        </label>
                        <ImageCapture
                          image={image}
                          setImage={(f) => {
                            setImage(f);
                            handleDynamicChange(f ? f.name : "", field);
                          }}
                        />
                      </div>
                    );
                  }

                  return null;
                })}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className={`w-full mt-4 rounded-md bg-green-600 py-3 font-semibold text-white transition-all duration-300 hover:bg-green-700 hover:shadow-lg active:scale-[0.98] ${submitting ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                  {submitting ? "Submitting..." : "Submit Request"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default VetService;
