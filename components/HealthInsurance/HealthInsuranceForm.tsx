"use client";
import React, { useEffect, useState } from "react";
import { FaArrowDownLong } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DialogCustom from "../Helper/Dialog";
import { FaPerson } from "react-icons/fa6";
import { GiLovers } from "react-icons/gi";
import { MdFamilyRestroom } from "react-icons/md";
import { RiParentFill } from "react-icons/ri";
interface FormField {
  id: number;
  label: string;
  field_type: string;
  required: boolean;
  choices: string[];
}

interface ApiResponse {
  status: string;
  message: string;
  data: FormField[];
}

interface finalForm {
  name: "";
  phone: "";
  email: "";
  insurance_type_id: 3; // Hardcoded as per the required output
  responses: DynamicFieldResponse[];
}

interface DynamicFieldResponse {
  field_id: string | number;
  value: string;
}

export default function HealthInsuranceForm() {
  const [visibleArrow, setVisibleArrow] = useState<number | null>(0);
  const [coverage, setCoverage] = useState<number | null>(null);
  const [children, setChildrenNumber] = useState<number | null>(null);
  const [parent, setParent] = useState<number | null>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [isChecked, setChecked] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // state for dynamic choices
  const [insuranceFor, setInsuranceFor] = useState<DynamicFieldResponse>({
    field_id: "",
    value: "",
  });
  const [childCount, setNumberOfChild] = useState<DynamicFieldResponse>({
    field_id: "",
    value: "",
  });
  const [healthCoverage, setHealthCoverage] = useState<DynamicFieldResponse>({
    field_id: "",
    value: "",
  });
  const [formValues, setFormValues] = useState<finalForm>({
    name: "",
    phone: "",
    email: "",
    insurance_type_id: 3, // Hardcoded as per the required output
    responses: [],
  });

  const findByLabel = (label: string) => {
    return formFields.find((item) => item.label === label);
  };

  useEffect(() => {
    const fetchFormFields = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/insurance/insurance-types/3/form/`
        );
        const result: ApiResponse = await response.json();
        if (result.status === "success") {
          setFormFields(result.data);
        }
      } catch (error) {
        console.error("Error fetching form fields:", error);
      }
    };

    fetchFormFields();
  }, []);

  const handleChange2 = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: FormField
  ) => {
    const updatedResponses = formValues.responses.filter(
      (response) => response.field_id !== field.id
    );
    updatedResponses.push({
      field_id: field.id,
      value: e.target.value,
    });

    setFormValues({
      ...formValues,
      responses: updatedResponses,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!isChecked) {
      alert("You must accept the terms and conditions to proceed.");
      setIsSubmitting(false);
      return;
    }

    const updatedResponses = {
      ...formValues,
      responses: [
        ...formValues.responses,
        ...(insuranceFor.field_id ? [insuranceFor] : []),
        ...(healthCoverage.field_id ? [healthCoverage] : []),
        ...(childCount.field_id ? [childCount] : []),
      ],
    };

    console.log(updatedResponses);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/insurance/submit-form/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedResponses),
        }
      );
      const result = await response.json();
      if (response.ok) {
        toast.success("Your insurance request has been sent successfully.");
        setSubmissionMessage(result.message);
        setOpenDialog(true);
        setFormValues({
          name: "",
          phone: "",
          email: "",
          insurance_type_id: 3, // Hardcoded as per the required output
          responses: [],
        });
      } else {
        toast.error("Failed to submit. Please try again later.");
      }
    } catch (error) {
      //  console.error('Error submitting livestock insurance form:', error);
      toast.error("An error occurred. Please try again later." + error);
    } finally {
      setIsSubmitting(false);
    }
    // Handle form submission logic here
    // console.log('Formatted Submission:', formValues);
    // console.log('Form submitted:', formData);
  };
  return (
    <>
      <div className="h-full w-full flex flex-col lg:flex-col text-justify">
        <div className="flex flex-row justify-center items-center gap-4 ">
          <div className="flex flex-col items-center justify-center">
            <div
              className="flex flex-col border-2 justify-center items-center text-center lg:w-24 border-primary bg-card shadow-lg hover:shadow-xl p-4 rounded-xl cursor-pointer transition-all duration-200 hover:scale-105"
              onClick={() => setVisibleArrow(0)}
            >
              <FaPerson className="text-3xl text-green-600 mb-2" />
              <span className="font-semibold text-foreground">Self</span>
            </div>
            <div className="h-10 text-2xl mt-3 text-green-600">
              {visibleArrow === 0 && (
                <span>
                  <FaArrowDownLong />
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div
              className="flex flex-col justify-center items-center border-2 lg:w-24 border-primary bg-card shadow-lg hover:shadow-xl p-4 rounded-xl cursor-pointer transition-all duration-200 hover:scale-105"
              onClick={() => setVisibleArrow(1)}
            >
              <GiLovers className="text-3xl text-green-600 mb-2" />
              <span className="font-semibold text-foreground">Couple</span>
            </div>
            <div className="h-10 text-2xl mt-3 text-green-600">
              {visibleArrow === 1 && (
                <span>
                  <FaArrowDownLong />
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div
              className="flex flex-col justify-center items-center border-2 lg:w-24 border-primary bg-card shadow-lg hover:shadow-xl p-4 rounded-xl cursor-pointer transition-all duration-200 hover:scale-105"
              onClick={() => setVisibleArrow(2)}
            >
              <MdFamilyRestroom className="text-3xl text-green-600 mb-2" />
              <span className="font-semibold text-foreground">Family</span>
            </div>
            <div className="h-10 text-2xl mt-3 text-green-600">
              {visibleArrow === 2 && (
                <span>
                  <FaArrowDownLong />
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div
              className="flex flex-col justify-center items-center border-2 lg:w-24 border-primary bg-card shadow-lg hover:shadow-xl p-4 rounded-xl cursor-pointer transition-all duration-200 hover:scale-105"
              onClick={() => setVisibleArrow(3)}
            >
              <RiParentFill className="text-3xl text-green-600 mb-2" />
              <span className="font-semibold text-foreground">Parent</span>
            </div>
            <div className="h-10 mt-3 text-2xl text-green-600">
              {visibleArrow === 3 && (
                <span>
                  <FaArrowDownLong />
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="h-full w-full max-w-4xl rounded-xl bg-[#F6F4EC] flex flex-col p-4 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-md font-semibold text-green-600"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  value={formValues.name}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border-2 border-green-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="block text-md font-semibold text-green-600"
                >
                  Phone
                </label>
                <input
                  type="number"
                  id="phone"
                  name="phone"
                  placeholder="Phone Number"
                  value={formValues.phone}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border-2 border-green-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="yourAge"
                  className="block text-md font-semibold text-green-600"
                >
                  {findByLabel("Your Age")?.label}
                </label>
                <div className="relative">
                  <select
                    id="8"
                    name="yourAge"
                    value={
                      formValues.responses.find(
                        (response) =>
                          response.field_id === findByLabel("Your Age")?.id
                      )?.value || ""
                    }
                    onChange={(e) => {
                      const field = findByLabel("Your Age");
                      if (field) handleChange2(e, field);
                    }}
                    className="w-full px-4 py-2 border-2 border-green-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Select age</option>
                    {Array.from({ length: 100 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {visibleArrow === 1 && (
                <div className="space-y-2">
                  <label
                    htmlFor="spouseAge"
                    className="block text-md font-semibold text-green-600"
                  >
                    {findByLabel("Spouse Age")?.label}
                  </label>
                  <select
                    id="11"
                    name="spouseAge"
                    value={
                      formValues.responses.find(
                        (response) =>
                          response.field_id === findByLabel("Spouse Age")?.id
                      )?.value || ""
                    }
                    onChange={(e) => {
                      const field = findByLabel("Spouse Age");
                      if (field) handleChange2(e, field);
                    }}
                    className="w-full px-4 py-2 border-2 border-green-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white appearance-none cursor-pointer"
                  >
                    <option value="">Select age</option>
                    {Array.from({ length: 100 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} Years
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {visibleArrow === 3 && (
              <div className="space-y-4 p-4 bg-muted/50 rounded-xl border border-border">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-green-600">
                    {findByLabel("Insurance For")?.label}
                  </h3>
                  <div className="flex items-center justify-start gap-4 flex-wrap">
                    {findByLabel("Insurance For")?.choices.map(
                      (choice, index) => (
                        <div
                          key={index}
                          className={`border-2 lg:w-[100px] text-center rounded-xl p-2 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-md ${
                            parent === index
                              ? "border-primary bg-primary/10 text-green-600 shadow-lg"
                              : "text-muted-foreground border-border bg-background hover:border-primary/50"
                          }`}
                          onClick={() => {
                            setParent(index);
                            setInsuranceFor({
                              field_id: findByLabel("Insurance For")?.id ?? "",
                              value: choice,
                            });
                          }}
                        >
                          <span className="font-semibold">{choice}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {(parent === 0 || parent === 2) && (
                    <div className="space-y-2">
                      <label
                        htmlFor="fatherAge"
                        className="block text-md font-semibold text-green-600"
                      >
                        {findByLabel("Father Age")?.label}
                      </label>
                      <select
                        id="13"
                        name="fatherAge"
                        value={
                          formValues.responses.find(
                            (response) =>
                              response.field_id ===
                              findByLabel("Father Age")?.id
                          )?.value || ""
                        }
                        onChange={(e) => {
                          const field = findByLabel("Father Age");
                          if (field) handleChange2(e, field);
                        }}
                        className="w-full px-4 py-2 border-2 border-green-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white appearance-none cursor-pointer"
                      >
                        <option value="">Select age</option>
                        {Array.from({ length: 100 }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {(parent === 1 || parent === 2) && (
                    <div className="space-y-2">
                      <label
                        htmlFor="motherAge"
                        className="block text-md font-semibold text-green-600"
                      >
                        {findByLabel("Mother Age")?.label}
                      </label>
                      <select
                        id="14"
                        name="motherAge"
                        value={
                          formValues.responses.find(
                            (response) =>
                              response.field_id ===
                              findByLabel("Mother Age")?.id
                          )?.value || ""
                        }
                        onChange={(e) => {
                          const field = findByLabel("Mother Age");
                          if (field) handleChange2(e, field);
                        }}
                        className="w-full px-4 py-2 border-2 border-green-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white appearance-none cursor-pointer"
                      >
                        <option value="">Select age</option>
                        {Array.from({ length: 100 }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>
            )}

            {visibleArrow === 2 && (
              <div className="space-y-4 p-4 bg-muted/50 rounded-xl border border-border">
                <h3 className="text-xl font-bold text-green-600">
                  {findByLabel("Number of Child (Below 18 years)")?.label}
                </h3>
                <div className="flex items-center justify-start gap-4 flex-wrap">
                  {findByLabel("Number of Child (Below 18 years)")?.choices.map(
                    (choice, index) => (
                      <div
                        key={index}
                        className={`border-2 lg:w-[120px] text-center rounded-xl p-2 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-md ${
                          children === index
                            ? "border-primary bg-primary/10 text-green-600 shadow-lg"
                            : "text-muted-foreground border-border bg-background hover:border-primary/50"
                        }`}
                        onClick={() => {
                          setChildrenNumber(index);
                          setNumberOfChild({
                            field_id:
                              findByLabel("Number of Child (Below 18 years)")
                                ?.id ?? "",
                            value: choice,
                          });
                        }}
                      >
                        <span className="font-semibold">{choice}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            <div className="space-y-4 p-4 bg-muted/50 rounded-xl border border-border">
              <h3 className="text-xl font-bold text-green-600">
                {findByLabel("Health Coverage Amount (?)")?.label}
              </h3>
              <div className="flex items-center justify-start gap-4 flex-wrap">
                {findByLabel("Health Coverage Amount (?)")?.choices.map(
                  (choice, index) => (
                    <div
                      key={index}
                      className={`border-2 lg:w-[130px] text-center rounded-xl p-2 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-md ${
                        coverage === index
                          ? "border-primary bg-primary/10 text-green-600 shadow-lg"
                          : "text-muted-foreground border-border bg-background hover:border-primary/50"
                      }`}
                      onClick={() => {
                        setCoverage(index);
                        setHealthCoverage({
                          field_id:
                            findByLabel("Health Coverage Amount (?)")?.id ?? "",
                          value: choice,
                        });
                      }}
                    >
                      <span className="font-semibold">{choice}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg border border-border bg-green-50 border-green-200">
              <input
                type="checkbox"
                id="termsAccepted"
                name="termsAccepted"
                checked={isChecked}
                onChange={() => setChecked(!isChecked)}
                className="mt-1 h-5 w-5 text-green-600 focus:ring-green-500 border-green-300 rounded transition-colors"
              />
              <label
                htmlFor="termsAccepted"
                className="text-sm font-medium text-green-700 leading-6"
              >
                I accept the terms and conditions
              </label>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2 px-6 bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-200 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {openDialog ? (
        <DialogCustom
          message={submissionMessage}
          onClose={() => {
            handleCloseDialog();
          }}
        />
      ) : (
        ""
      )}

      <ToastContainer />
    </>
  );
}
