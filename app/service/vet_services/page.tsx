/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState, FormEvent } from "react";
import BannerGeneral from "@/components/Home/BannerGeneral";
import FaqSection from "@/components/Home/FaqSection";
import { motion, AnimatePresence } from "framer-motion";
import ImageCapture from "@/components/ImageCapture";

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
  const [location, setLocation] = useState("");
  const [cattle, setCattle] = useState("");
  const [remarks, setRemarks] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [formValues, setFormValues] = useState<finalForm>({
    name: "",
    phone: "",
    email: "",
    insurance_type_id: 4, // Hardcoded as per the required output
    responses: [],
  });
  const [submitting, setSubmitting] = useState(false);
  // const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [urgency, setUrgency] = useState("");
    const [formFields, setFormFields] = useState<FormField[]>([]);
  

  const cattleOptions = ["Cow"];
  const urgencyOptions = ["Low", "Moderate", "High"];
  const serviceOptions = ["Vaccination", "Health checkup"];
  
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
      const fetchFormFields = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/insurance/insurance-types/4/form/`
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

  const handleSubmit = async (e) => {
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
        { method: "POST", body: JSON.stringify(payload) }
      );

      let result: any = null;
      try {
        result = await res.json();
      } catch (err) {
        const txt = await res.text();
        console.error("Non-JSON response:", txt);
        throw new Error(txt || "Non-JSON response from server");
      }

      if (res.ok) {
        alert("Request submitted successfully");
        setIsModalOpen(false);
        setName("");
        setMobile("");
        setLocation("");
        setCattle("");
        setRemarks("");
        setImage(null);
        setUrgency("");
        setFormValues({ name: "", phone: "", email: "", insurance_type_id: 4, responses: [] });
      } else {
        console.error("Submission error:", result);
        alert(result?.message || "Submission failed");
      }
    } catch (err) {
      console.error("Submit exception:", err);
      alert("An error occurred while submitting the form");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="h-auto overflow-hidden">
      {/* Banner Section */}
      <BannerGeneral bannerUrl={"/cowinspection.jpg"}>
        <div className="relative z-10 flex flex-col items-center justify-center h-full bg-green-950 bg-opacity-50 text-white text-center p-5">
          <h1 className="text-xl lg:text-6xl font-semibold mb-4">
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
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl lg:text-4xl font-bold text-left text-[#334b35] mb-8 underline">
          About Our Veterinary Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* ROW 1 */}
          {/* <div className="rounded-2xl overflow-hidden">
            <img
              src="/treat.jpg"
              alt="Treat"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="rounded-2xl bg-white p-10 flex flex-col justify-center">
            <h3 className="text-3xl font-bold mb-4">TREAT</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Delivering expert veterinary care for every animal no matter
              where.
            </p>
          </div> */}

          {/* ROW 2 (reversed) */}
          <div className="rounded-2xl bg-white p-10 flex flex-col justify-center shadow-xl">
            <h3 className="text-3xl font-bold mb-4 text-gray-600">
              Health Check Up
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Providing training to promote long-lasting improvements in animal
              welfare.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden">
            <img
              src="/vaccine.png"
              alt="Train"
              className="w-full h-60 object-cover"
            />
          </div>

          {/* ROW 3 */}
          <div className="rounded-2xl overflow-hidden">
            <img
              src="/health.png"
              alt="Respond"
              className="w-full h-60 object-cover"
            />
          </div>

          <div className="rounded-2xl bg-white p-10 flex flex-col justify-center shadow-xl">
            <h3 className="text-3xl font-bold mb-4 text-gray-600">
              Vaccination
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Aiding animals and their communities in their time of need.
            </p>
          </div>
        </div>
      </section>

      {/* Awareness Campaign Section */}
      <section className=" py-16 relative bg-white">
        {/* <div className="w-full h-full bg-white absolute -top-20 skew-y-[10deg] -z-20"></div> */}
        {/* <div className="w-full h-full bg-white absolute top-0 -skew-x-[18deg] -z-20"></div> */}
        {/* <div className="w-full h-full bg-white absolute top-20 skew-y-[5deg] -z-20"></div> */}
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-left text-[#334b35] mb-2 underline">
            Why Veterinary Services Matter
          </h2>
          <div className="mx-auto">
            <p className="text-lg text-gray-700 mb-6 text-left">
              Investing in veterinary care is crucial for sustainable livestock
              farming. Healthy animals lead to better productivity, higher
              yields, and economic stability for farmers.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center bg-green-200 p-3 rounded-lg">
                <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🐄</span>
                </div>
                <h3 className="text-xl font-semibold text-[#334b35] mb-2">
                  Disease Prevention
                </h3>
                <p className="text-gray-600">
                  Vaccinations and checkups prevent outbreaks that can devastate
                  herds.
                </p>
              </div>

              <div className="text-center bg-green-200 p-3 rounded-lg">
                <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">📈</span>
                </div>
                <h3 className="text-xl font-semibold text-[#334b35] mb-2">
                  Increased Productivity
                </h3>
                <p className="text-gray-600">
                  Healthy livestock produce more milk, meat, and offspring.
                </p>
              </div>

              <div className="text-center bg-green-200 p-3 rounded-lg">
                <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="text-xl font-semibold text-[#334b35] mb-2">
                  Economic Benefits
                </h3>
                <p className="text-gray-600">
                  Reduce losses from illness and improve farm profitability.
                </p>
              </div>
            </div>
            <div className="text-left mt-8">
              <p className="text-lg text-gray-700">
                Join our awareness campaign to spread the importance of
                veterinary care in livestock management. Together, we can build
                healthier communities and sustainable agriculture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <div className="text-center">
        <FaqSection />
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
                <div>
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
                </div>

                {/* Cattle */}
                <div>
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
                </div>

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
                  <label className="text-sm font-medium text-slate-600">Mobile Number</label>
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
                        <label className="text-sm font-medium text-slate-600">{field.label}</label>
                        <select
                          value={value}
                          onChange={(e) => handleDynamicChange(e.target.value, field)}
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
                        <label className="text-sm font-medium text-slate-600">{field.label}</label>
                        {isRemarks ? (
                          <textarea
                            rows={3}
                            value={value}
                            onChange={(e) => handleDynamicChange(e.target.value, field)}
                            required={field.required}
                            className="mt-1 w-full rounded-md text-black border border-slate-300 px-2 py-1 focus:border-green-600 focus:ring-2 focus:ring-green-500/30 outline-none transition"
                            placeholder={field.label}
                          />
                        ) : (
                          <input
                            value={value}
                            onChange={(e) => handleDynamicChange(e.target.value, field)}
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
                        <label className="text-sm font-medium text-slate-600">{field.label}</label>
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
                  className={`w-full mt-4 rounded-md bg-green-600 py-3 font-semibold text-white transition-all duration-300 hover:bg-green-700 hover:shadow-lg active:scale-[0.98] ${submitting ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                  {submitting ? 'Submitting...' : 'Submit Request'}
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
