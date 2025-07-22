'use client'
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DialogCustom from '../Helper/Dialog';

interface DynamicFieldResponse {
  field_id: string | number
  value: string
}

interface finalForm {
  name: '',
  phone: '',
  email: '',
  insurance_type_id: number, // Hardcoded as per the required output
  responses: DynamicFieldResponse[]

}
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

const CowInvestmentForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
    const [formFields, setFormFields] = useState<FormField[]>([]);
  const [isChecked, setChecked] = useState(false);
  const [formValues, setFormValues] = useState<finalForm>({
    name: '',
    phone: '',
    email: '',
    insurance_type_id: 5, // Hardcoded as per the required output
    responses: [],
  });

  const [submissionMessage, setSubmissionMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    const fetchFormFields = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/insurance/insurance-types/5/form/`);
        const result: ApiResponse = await response.json();
        if (result.status === 'success') {
        
          setFormFields(result.data);
          console.log(result.data);
        }
      } catch (error) {
        console.error('Error fetching form fields:', error);
      }
    };

    fetchFormFields();
  }, []);



  const findByLabel = (label:string) => {
    return formFields.find(item => item.label === label);
}

 const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field:FormField) => {
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
    if (!isChecked) {
      alert('You must accept the terms and conditions to proceed.');
      return;
    }
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/insurance/submit-form/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formValues)
          });
          
          const result = await response.json();
          if (response.ok) {
            toast.success('Your insurance request has been sent successfully.');
            setSubmissionMessage(result.message);
            setOpenDialog(true);
            
            setFormValues({
              name: '',
              phone: '',
              email: '',
              insurance_type_id: 5, // Hardcoded as per the required output
              responses: [],
            });
          } else {
            toast.error('Failed to submit. Please try again later.'); 
          }
          
        } catch (error) {
          toast.error('An error occurred. Please try again later.' + error
          );
        } finally {
          setIsSubmitting(false);
        }

          // Handle form submission logic here
          console.log('Form submitted:', formValues);
        };

  return (

    <>
        <div className=' h-full w-auto flex flex-col justify-center items-center lg:flex-col p-5'>
          <h2 className="text-3xl font-bold text-[#334b35] text-center mb-10">
                Invest on Cow
              </h2>
      <form onSubmit={handleSubmit} className="space-y-6 ">
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder='Name'
              id="name"
              name="name"
              value={formValues.name}
              onChange={(e) => setFormValues({ ...formValues, [e.target.name]: e.target.value })}

              className="mt-1 block w-full px-4 py-3 rounded-md shadow-sm bg-[#F6F4EC] focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            />
          </div>
          <div className="flex-1">
            <input
              type="number"
              placeholder='Phone Number'
              id="phone"
              name="phone"
              value={formValues.phone}
              onChange={(e) => setFormValues({ ...formValues, [e.target.name]: e.target.value })}

              className="mt-1 block w-full px-4 py-3 rounded-md shadow-sm bg-[#F6F4EC] focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            />
          </div>
        </div>


        <div>
          <input
            type="text"
            placeholder='Occupation'
            id="designation"
            name="designation"
            value={formValues.responses.find(response => response.field_id === findByLabel("Occupation")?.id)?.value || ''}

            onChange={(e)=>{
                
              const field = findByLabel("Occupation"); 
              if (field) handleChange(e, field);
            }}
            className="mt-1 block w-full px-4 py-3 rounded-md shadow-sm bg-[#F6F4EC] focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            required
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="termsAccepted"
            name="termsAccepted"
            checked={isChecked}
            onChange={()=>{
              setChecked(!isChecked)
            }}
            className="h-4 w-4 text-green-600 focus:ring-green-500 rounded"
            required
          />
          <label htmlFor="termsAccepted" className="ml-2 block text-sm text-green-600">
            I accept the terms and conditions
          </label>
        </div>
        <div className="flex items-center justify-center pt-4 pl-2 pr-2">
                <button
                  type="submit"
                  className="relative text-center p-3 lg:w-[150px] lg:h-[40px] bg-green-300 text-green-800 font-semibold rounded-md overflow-hidden group cursor-pointer flex items-center justify-center"
                  disabled={isSubmitting}
                >
                <span className="relative z-10 group-hover:text-white text-md transition-colors duration-300">
                 {isSubmitting ? 'Submitting...' : 'Submit'}
                </span>
                <div className="absolute inset-0 bg-green-800 transform -translate-x-[-145px] group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></div>
                </button>
              </div>
      </form>
    </div>

    {openDialog ? <DialogCustom message={submissionMessage} onClose={()=>{handleCloseDialog()}} />: ""}

    <ToastContainer />
    </>

  );
};

export default CowInvestmentForm;
