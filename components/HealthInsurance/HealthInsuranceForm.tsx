'use client'
import React, { useEffect, useState } from 'react';
import { FaArrowDownLong } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DialogCustom from '../Helper/Dialog';
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
    name: '',
    phone: '',
    email: '',
    insurance_type_id: 3, // Hardcoded as per the required output
    responses: DynamicFieldResponse[]

}

interface DynamicFieldResponse {
    field_id: string | number
    value: string
}

export default function HealthInsuranceForm() {
    const [visibleArrow, setVisibleArrow] = useState<number | null>(0);
    const [coverage, setCoverage] = useState<number | null>(null);
    const [children, setChildrenNumber] = useState<number | null>(null);
    const [parent, setParent] = useState<number | null>(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formFields, setFormFields] = useState<FormField[]>([]);
      const [isChecked , setChecked] = useState(false);
        const [submissionMessage, setSubmissionMessage] = useState('');
        const [openDialog, setOpenDialog] = useState(false);
      
        const handleCloseDialog = () => {
          setOpenDialog(false);
        };
    


    // state for dynamic choices
    const [insuranceFor, setInsuranceFor] = useState<DynamicFieldResponse>(
        {
            field_id: '',
            value: ''
        }
    );
    const [childCount, setNumberOfChild] = useState<DynamicFieldResponse>(
        {
            field_id: '',
            value: ''
        }
    );
    const [healthCoverage, setHealthCoverage] = useState<DynamicFieldResponse>(
        {
            field_id: '',
            value: ''
        }
    );
    const [formValues, setFormValues] = useState<finalForm>({
        name: '',
        phone: '',
        email: '',
        insurance_type_id: 3, // Hardcoded as per the required output
        responses: [],
    });

    const findById = (id: number) => {
        return formFields.find(item => item.id === id);
    }

    useEffect(() => {
        const fetchFormFields = async () => {
            try {
                const response = await fetch('http://52.66.196.177:8000/api/v1/insurance/insurance-types/3/form/');
                const result: ApiResponse = await response.json();
                if (result.status === 'success') {
                    setFormFields(result.data);
                  

                }
            } catch (error) {
                console.error('Error fetching form fields:', error);
            }
        };

        fetchFormFields();
    }, []);



    const handleChange2 = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: FormField) => {
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
        alert('You must accept the terms and conditions to proceed.');
        setIsSubmitting(false);
        return;
      }

   
  
   
       const updatedResponses = {
      ...formValues,
      responses: [
        ...formValues.responses,
        ...(insuranceFor.field_id ? [insuranceFor] : []),
        ...(healthCoverage.field_id ? [healthCoverage] : []),
        ...(childCount.field_id ? [childCount] : [])
      ]
    };

    
    

    
    
        console.log(updatedResponses);
        
        
  
      try {
        const response = await fetch('http://52.66.196.177:8000/api/v1/insurance/submit-form/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedResponses)
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
                  insurance_type_id: 3, // Hardcoded as per the required output
                  responses: [],
                });
              }else{
                toast.error('Failed to submit. Please try again later.'); 
              }
  
      }catch(error){
  //  console.error('Error submitting livestock insurance form:', error);
        toast.error('An error occurred. Please try again later.' + error);
      } finally{
        setIsSubmitting(false);
      }
      // Handle form submission logic here
      // console.log('Formatted Submission:', formValues);
      // console.log('Form submitted:', formData);
    };
    return (
        <>

        <div className='h-full w-full  flex flex-col lg:flex-col'>
            <div className='flex flex-row justify-center items-center gap-3'>
                <div className='flex flex-col items-center  justify-center'>
                    <div className='flex flex-col border justify-center items-center  text-center lg:w-28 border-green-600  shadow-sm shadow-green-400 p-5 rounded-md cursor-pointer' onClick={() => setVisibleArrow(0)}>
                        <FaPerson className='text-2xl text-green-500'/>
                        <span>self</span>
                    </div>
                    <div className='h-8 text-2xl mt-2 text-green-600'>
                        {visibleArrow === 0 && <span>
                            <FaArrowDownLong /></span>}

                    </div>
                </div>

                <div className='flex flex-col items-center justify-center'>
                    <div className='flex flex-col  justify-center items-center border lg:w-28 border-green-600 shadow-sm shadow-green-400 p-5 rounded-md cursor-pointer' onClick={() => setVisibleArrow(1)}>
                    <GiLovers className='text-2xl text-green-500'/>
                        <span>couple</span>
                    </div>
                    <div className='h-8 text-2xl mt-2 text-green-500'>
                        {visibleArrow === 1 && <span>
                            <FaArrowDownLong /></span>}

                    </div>
                </div>

                <div className='flex flex-col items-center justify-center'>
                    <div className='flex flex-col  justify-center items-center border lg:w-28 border-green-600 shadow-sm shadow-green-400 p-5 rounded-md cursor-pointer' onClick={() => setVisibleArrow(2)}>
                    <MdFamilyRestroom className='text-2xl text-green-500'/>
                        <span>family</span>
                    </div>
                    <div className='h-8 text-2xl mt-2 text-green-500'>
                        {visibleArrow === 2 && <span>
                            <FaArrowDownLong /></span>}

                    </div>
                </div>

                <div className='flex flex-col items-center justify-center'>
                    <div className='flex flex-col justify-center items-center border lg:w-28 border-green-600 shadow-sm shadow-green-400 p-5 rounded-md cursor-pointer' onClick={() => setVisibleArrow(3)}>
                        <RiParentFill className='text-2xl text-green-500' />
                        <span>parent</span>
                    </div>
                    <div className='h-8 mt-2 text-2xl text-green-500'>
                        {visibleArrow === 3 && <span>
                            <FaArrowDownLong /></span>}

                    </div>
                </div>
            </div>

            <div className='h-full w-full border border-green-600 rounded-md flex flex-col lg:flex-col p-5'>
                {/* form start from below */}
                <div className="px-4 py-8">
                    <form onSubmit={handleSubmit} className="space-y-4 text-start">
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
                                <label htmlFor="phone" className="block text-start text-lg font-medium text-green-600">Phone</label>
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
                        <div className="flex space-x-4">
                            <div className='flex-1'>
                                <label htmlFor="yourAge" className="block text-start text-lg font-medium text-green-600">{findById(8)?.label}</label>
                                <select
                                    id="8"
                                    name="yourAge"
                                    value={formValues.responses.find(response => response.field_id === findById(8)?.id)?.value || ''}
                                    onChange={(e) => {

                                        const field = findById(8);
                                        if (field) handleChange2(e, field);
                                    }}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
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
                            {visibleArrow === 1 ?

                                <div className='flex-1'>
                                    <label htmlFor="spouseAge" className="block text-start text-lg font-medium text-green-600">{findById(11)?.label}</label>
                                    <select
                                        id="11"
                                        name="spouseAge"
                                        value={formValues.responses.find(response => response.field_id === findById(11)?.id)?.value || ''}
                                        onChange={(e) => {

                                            const field = findById(11);
                                            if (field) handleChange2(e, field);
                                        }}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"

                                    >
                                        <option value="">Select age</option>
                                        {Array.from({ length: 100 }, (_, i) => (
                                            <option key={i + 1} value={i + 1}>
                                                {i + 1}
                                            </option>
                                        ))}

                                    </select>
                                </div>


                                : <></>}



                        </div>

                        {visibleArrow === 3 ?
                            <>
                                <div className="flex  flex-col gap-3">
                                    <span className='text-xl'>{findById(12)?.label}</span>
                                    <div className='flex items-center justify-start gap-4'>
                                        <div className={`border lg:w-[150px] text-center bg-white rounded-lg p-2 ${parent === 0 ? 'border-green-600 text-green-700' : 'text-gray-500 border-gray-200'} border-green-600 hover:text-green-700 cursor-pointer `}
                                            onClick={() => {
                                                setParent(0)
                                                setInsuranceFor(
                                                    {
                                                        field_id: 12,
                                                        value: findById(12)?.choices[0] || ''
                                                    }
                                                )
                                            }}>{findById(12)?.choices[0]}</div>
                                        <div className={`border lg:w-[150px] text-center bg-white rounded-lg p-2 ${parent === 1 ? 'border-green-600 text-green-700' : 'text-gray-500 border-gray-200'} border-green-600 hover:text-green-700 cursor-pointer `}
                                            onClick={() => {
                                                setParent(1)
                                                setInsuranceFor(
                                                    {
                                                        field_id: 12,
                                                        value: findById(12)?.choices[1] || ''
                                                    }
                                                )

                                            }}>{findById(12)?.choices[1]}</div>
                                        <div className={`border lg:w-[150px] text-center bg-white rounded-lg p-2 ${parent === 2 ? 'border-green-600 text-green-700' : 'text-gray-500 border-gray-200'} border-green-600 hover:text-green-700 cursor-pointer `}
                                            onClick={() => {
                                                setParent(2)
                                                setInsuranceFor(
                                                    {
                                                        field_id: 12,
                                                        value: findById(12)?.choices[2] || ''
                                                    }
                                                )

                                            }}>{findById(12)?.choices[2]}</div>

                                    </div>
                                </div>

                                <div className="flex space-x-4">
                                    {parent === 0 || parent === 2 ?

                                        <div className='flex-1'>
                                            <label htmlFor="fatherAge" className="block text-start text-lg font-medium text-green-600">{findById(13)?.label}</label>
                                            <select
                                                id="13"
                                                name="fatherAge"
                                                value={formValues.responses.find(response => response.field_id === findById(13)?.id)?.value || ''}
                                                onChange={(e) => {

                                                    const field = findById(13);
                                                    if (field) handleChange2(e, field);
                                                }}
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"

                                            >
                                                <option value="">Select age</option>
                                                {Array.from({ length: 100 }, (_, i) => (
                                                    <option key={i + 1} value={i + 1}>
                                                        {i + 1}
                                                    </option>
                                                ))}

                                            </select>
                                        </div>

                                        : <></>}

                                    {parent === 1 || parent === 2 ?

                                        <div className='flex-1'>
                                            <label htmlFor="motherAge" className="block text-start text-lg font-medium text-green-600">{findById(14)?.label}</label>
                                            <select
                                                id="14"
                                                name="motherAge"
                                                value={formValues.responses.find(response => response.field_id === findById(14)?.id)?.value || ''}
                                                onChange={(e) => {

                                                    const field = findById(14);
                                                    if (field) handleChange2(e, field);
                                                }}
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"

                                            >
                                                <option value="">Select age</option>
                                                {Array.from({ length: 100 }, (_, i) => (
                                                    <option key={i + 1} value={i + 1}>
                                                        {i + 1}
                                                    </option>
                                                ))}

                                            </select>
                                        </div>

                                        : <></>}

                                </div>
                            </>


                            :


                            <></>}


                        {visibleArrow === 2 ?
                            <div className="flex  flex-col gap-3">
                                <span className='text-xl'>{findById(9)?.label}</span>
                                <div className='flex items-center justify-start gap-4'>
                                    <div className={`border lg:w-[150px] text-center bg-white rounded-lg p-2 ${children === 0 ? 'border-green-600 text-green-700' : 'text-gray-500 border-gray-200'} border-green-600 hover:text-green-700 cursor-pointer `}
                                        onClick={() => { setChildrenNumber(0)

                                            setNumberOfChild(
                                                {
                                                    field_id: 9,
                                                    value: findById(9)?.choices[0] || ''
                                                }
                                            )

                                         }}>{findById(9)?.choices[0]}</div>
                                    <div className={`border lg:w-[150px] text-center bg-white rounded-lg p-2 ${children === 1 ? 'border-green-600 text-green-700' : 'text-gray-500 border-gray-200'} border-green-600 hover:text-green-700 cursor-pointer `}
                                        onClick={() => { setChildrenNumber(1)

                                            setNumberOfChild(
                                                {
                                                    field_id: 9,
                                                    value: findById(9)?.choices[1] || ''
                                                }
                                            )

                                         }}>{findById(9)?.choices[1]}</div>

                                </div>
                            </div>
                            :


                            <></>}

                        <div className="flex  flex-col gap-3">
                            <span className='text-xl'>{findById(10)?.label}</span>
                            <div className='flex items-center justify-start gap-4'>
                                <div className={`border lg:w-[150px] text-center bg-white rounded-lg p-2 ${coverage === 0 ? 'border-green-600 text-green-700' : 'text-gray-500 border-gray-200'} border-green-600 hover:text-green-700 cursor-pointer `}
                                 onClick={() => { setCoverage(0) 
                                    setHealthCoverage({
                                         field_id: 10,
                                        value: findById(10)?.choices[0] || ''
                                    })
                                 }}>{findById(10)?.choices[0]}</div>
                                <div className={`border rounded-lg lg:w-[150px] bg-white text-center p-2 ${coverage === 1 ? 'border-green-600 text-green-700' : 'text-gray-500 border-gray-200'} border-green-600 hover:text-green-700 cursor-pointer `}
                                 onClick={() => { setCoverage(1)
                                    setHealthCoverage({
                                        field_id: 10,
                                       value: findById(10)?.choices[1] || ''
                                   })

                                  }}>{findById(10)?.choices[1]}</div>
                                <div className={`border rounded-lg lg:w-[150px] bg-white  text-center p-2 ${coverage === 2 ? 'border-green-600 text-green-700' : 'text-gray-500 border-gray-200'} border-green-600 hover:text-green-700 cursor-pointer `} 
                                onClick={() => { setCoverage(2)

                                    setHealthCoverage({
                                        field_id: 10,
                                       value: findById(10)?.choices[2] || ''
                                   })
                                 }}>{findById(10)?.choices[2]}</div>
                                <div className={`border rounded-lg lg:w-[150px] bg-white text-center p-2 ${coverage === 3 ? 'border-green-600 text-green-700' : 'text-gray-500 border-gray-200'} border-green-600 hover:text-green-700 cursor-pointer `}
                                 onClick={() => { setCoverage(3)

                                    setHealthCoverage({
                                        field_id: 10,
                                       value: findById(10)?.choices[3] || ''
                                   })
                                  }}>{findById(10)?.choices[3]}</div>
                            </div>
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
                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"

                            />
                            <label htmlFor="termsAccepted" className="ml-2 block text-sm text-green-600">
                                I accept the terms and conditions
                            </label>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="inline-flex w-full justify-center py-3 px-5 border border-transparent shadow-sm text-2xl font-medium rounded-md text-white bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>
                    </form>
                </div>



            </div>

        </div>
    {openDialog ? <DialogCustom message={submissionMessage} onClose={()=>{handleCloseDialog()}} />: ""}

            <ToastContainer />
        </>
    );
}
