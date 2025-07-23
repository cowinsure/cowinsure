"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DialogCustom from "../Helper/Dialog";

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
  insurance_type_id: 1; // Hardcoded as per the required output
  responses: DynamicFieldResponse[];
}

interface DynamicFieldResponse {
  field_id: string | number;
  value: string;
}

const LiveStockInsuranceForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [isChecked, setChecked] = useState(false);
  const [formValues, setFormValues] = useState<finalForm>({
    name: "",
    phone: "",
    email: "",
    insurance_type_id: 1, // Hardcoded as per the required output
    responses: [],
  });

  const [submissionMessage, setSubmissionMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const findByLabel = (label: string) => {
    return formFields.find((item) => item.label === label);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    const fetchFormFields = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/insurance/insurance-types/1/form/`
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

  const handleChange = (
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

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/insurance/submit-form/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
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
          insurance_type_id: 1, // Hardcoded as per the required output
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
      <div className="h-full w-full max-w-4xl rounded-xl bg-[#F6F4EC] flex flex-col p-4 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-green-700 mb-2">
              Cattle Insurance Application
            </h2>
            <p className="text-green-600">
              Please fill in all required information
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-justify">
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
                placeholder="Enter your full name"
                value={formValues.name}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
                className="w-full px-4 py-3 border-2 border-green-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white"
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
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                value={formValues.phone}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
                className="w-full px-4 py-3 border-2 border-green-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-justify">
            <div className="space-y-2">
              <label
                htmlFor="cattleType"
                className="block text-md font-semibold text-green-600"
              >
                {findByLabel("Cattle Type")?.label}
              </label>
              <div className="relative">
                <select
                  id="cattleType"
                  name="cattleType"
                  value={
                    formValues.responses.find(
                      (response) =>
                        response.field_id === findByLabel("Cattle Type")?.id
                    )?.value || ""
                  }
                  onChange={(e) => {
                    const field = findByLabel("Cattle Type");
                    if (field) handleChange(e, field);
                  }}
                  className="w-full px-4 py-3 border-2 border-green-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white appearance-none cursor-pointer"
                  required
                >
                  <option value="">Select cattle type</option>
                  <option value="Stud">Stud</option>
                  <option value="Bull">Bull</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="scopeOfCover"
                className="block text-md font-semibold text-green-600"
              >
                {findByLabel("Scope of Cover")?.label}
              </label>
              <div className="relative">
                <select
                  id="scopeOfCover"
                  name="scopeOfCover"
                  value={
                    formValues.responses.find(
                      (response) =>
                        response.field_id === findByLabel("Scope of Cover")?.id
                    )?.value || ""
                  }
                  onChange={(e) => {
                    const field = findByLabel("Scope of Cover");
                    if (field) handleChange(e, field);
                  }}
                  className="w-full px-4 py-3 border-2 border-green-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white appearance-none cursor-pointer"
                  required
                >
                  <option value="">Select coverage scope</option>
                  <option value="Death Coverage & Permanent Disability">
                    Death Coverage & Permanent Disability
                  </option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-justify">
            <div className="space-y-2">
              <label
                htmlFor="cattleNumber"
                className="block text-md font-semibold text-green-600"
              >
                {findByLabel("Number of Cattle")?.label}
              </label>
              <div className="relative">
                <select
                  id="cattleNumber"
                  name="cattleNumber"
                  value={
                    formValues.responses.find(
                      (response) =>
                        response.field_id ===
                        findByLabel("Number of Cattle")?.id
                    )?.value || ""
                  }
                  onChange={(e) => {
                    const field = findByLabel("Number of Cattle");
                    if (field) handleChange(e, field);
                  }}
                  className="w-full px-4 py-3 border-2 border-green-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white appearance-none cursor-pointer"
                  required
                >
                  <option value="">Select number of cattle</option>
                  {Array.from({ length: 100 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="amount"
                className="block text-md font-semibold text-green-600"
              >
                {findByLabel("Sum Insured")?.label}
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                placeholder="Enter sum insured amount"
                value={
                  formValues.responses.find(
                    (response) =>
                      response.field_id === findByLabel("Sum Insured")?.id
                  )?.value || ""
                }
                onChange={(e) => {
                  const field = findByLabel("Sum Insured");
                  if (field) handleChange(e, field);
                }}
                className="w-full px-4 py-3 border-2 border-green-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white"
                required
              />
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="termsAccepted"
                name="termsAccepted"
                checked={isChecked}
                onChange={() => setChecked(!isChecked)}
                className="mt-1 h-5 w-5 text-green-600 focus:ring-green-500 border-green-300 rounded transition-colors"
                required
              />
              <label
                htmlFor="termsAccepted"
                className="text-sm font-medium text-green-700 leading-6"
              >
                I accept the terms and conditions and confirm that all
                information provided is accurate
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-6 bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-200 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Submitting...</span>
              </div>
            ) : (
              "Submit Application"
            )}
          </button>
        </form>
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
};

export default LiveStockInsuranceForm;
