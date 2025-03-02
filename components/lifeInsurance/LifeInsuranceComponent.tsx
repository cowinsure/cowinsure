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
  insurance_type_id: 2, // Hardcoded as per the required output
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

const LifeInsuranceForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
    const [formFields, setFormFields] = useState<FormField[]>([]);
  const [isChecked, setChecked] = useState(false);
  const [formValues, setFormValues] = useState<finalForm>({
    name: '',
    phone: '',
    email: '',
    insurance_type_id: 2, // Hardcoded as per the required output
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
        const response = await fetch('http://52.66.196.177:8000/api/v1/insurance/insurance-types/2/form/');
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


  const [formData, setFormData] = useState({
    farmerName: '',
    phoneNumber: '',

    designation: '',
    termsAccepted: false
  });

  const findByLabel = (label:String) => {
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
          const response = await fetch('http://52.66.196.177:8000/api/v1/insurance/submit-form/', {
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
              insurance_type_id: 2, // Hardcoded as per the required output
              responses: [],
            });
          } else {
            toast.error('Failed to submit. Please try again later.'); 
          }
          
        } catch (error) {
          toast.error('An error occurred. Please try again later.');
        } finally {
          setIsSubmitting(false);
        }

          // Handle form submission logic here
          console.log('Form submitted:', formValues);
        };

  return (

    <>
        <div className='h-full w-full border border-green-400 flex flex-col lg:flex-col p-5'>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1">
            <label htmlFor="name" className="block text-lg text-start font-medium text-green-600">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formValues.name}
              onChange={(e) => setFormValues({ ...formValues, [e.target.name]: e.target.value })}

              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            />
          </div>
          <div className="flex-1">
            <label htmlFor="phone" className="block text-start text-lg font-medium text-green-600">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formValues.phone}
              onChange={(e) => setFormValues({ ...formValues, [e.target.name]: e.target.value })}

              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            />
          </div>
        </div>


        <div>
          <label htmlFor="designation" className="text-start block text-lg font-medium text-green-600">{findByLabel("Designation")?.label}</label>
          <input
            type="text"
            id="designation"
            name="designation"
            value={formValues.responses.find(response => response.field_id === findByLabel("Designation")?.id)?.value || ''}

            onChange={(e)=>{
                
              const field = findByLabel("Designation"); 
              if (field) handleChange(e, field);
            }}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            required
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="termsAccepted"
            name="termsAccepted"
            checked={isChecked}
            onChange={(e)=>{
              setChecked(!isChecked)
            }}
            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            required
          />
          <label htmlFor="termsAccepted" className="ml-2 block text-sm text-green-600">
            I accept the terms and conditions
          </label>
        </div>
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>

    {openDialog ? <DialogCustom message={submissionMessage} onClose={()=>{handleCloseDialog()}} />: ""}

    <ToastContainer />
    </>

  );
};

export default LifeInsuranceForm;
