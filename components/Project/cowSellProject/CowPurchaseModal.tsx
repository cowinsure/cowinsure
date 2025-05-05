'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion'
import logo from '../../../public/insurelogo.png'
import DialogCustom from '@/components/Helper/Dialog';
import { useParams } from 'next/navigation';

interface ExtraData {
  age: number;
  sex: string;
  breed: string;
  horns: string;
  colour: string;
  isSold: boolean;
  cattleId: string;
  weightKg: number;
  heightFeet: number;
  askingPrice: number;
  sellingPrice: number;
  dehorningStatus: string;
  dewormingStatus: string;
  identifyingMarks: string;
  sourceOfPurchase: string;
  anyDiseaseHistory: string;
  vaccinationStatus: string;
  currentOwnerFarmName: string;
  generalHealthCondition: string;
  numberOfCutMarksOnSkin: number;
  locationOfCurrentHolding: string;
}

interface Portfolio {
  id: string;
  name: string;
  location: string;
  investment_value: string;
  currency: string;
  investment_period: string;
  expected_return_min: string;
  expected_return_max: string;
  total_return_min: string;
  total_return_max: string;
  image_url: string;
  description: string;
  extra_data: ExtraData;
  created_at: string;
  updated_at: string;
}

interface CowPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface DynamicFieldResponse {
  field_id: string | number
  value: string
}

interface finalForm {
  name: '',
  phone: '',
  email: '',
  insurance_type_id: 6, // Hardcoded as per the required output
  responses: DynamicFieldResponse[]

}
interface FormField {
  id: number;
  label: string;
  field_type: string;
  required: boolean;
}
interface ApiResponse {
  status: string;
  message: string;
  data: FormField[];
}

const CowPurchaseModal: React.FC<CowPurchaseModalProps> = ({ isOpen, onClose, onSuccess }) => {

  const { id } = useParams() as { id: string };
    const [isSubmitting, setIsSubmitting] = useState(false);
      const [formFields, setFormFields] = useState<FormField[]>([]);
    const [isChecked, setChecked] = useState(false);
    const [formValues, setFormValues] = useState<finalForm>({
      name: '',
      phone: '',
      email: '',
      insurance_type_id: 6, // Hardcoded as per the required output
      responses: [],
    });
    const [location, setLocation] = useState('')
    
          const [loading, setLoading] = useState(true);
  
    const [submissionMessage, setSubmissionMessage] = useState('');
    const [openDialog, setOpenDialog] = useState(false);

    const [projectDetails, setProjectDetails] = useState<Portfolio | null>(null);

          useEffect(() => {
              const fetchProjectDetails = async () => {
                  try {
                      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/portfolio/${id}/`);
                      const data = await response.json();
                      setProjectDetails(data.data);
      
                      setLoading(false);
                  } catch (error) {
                      console.error('Error fetching project details:', error);
                      setLoading(false);
                  }
              };
      
              fetchProjectDetails();
          }, [id]);
      
  
    const handleCloseDialog = () => {
      setOpenDialog(false);
      onSuccess();
    };
    

      // Helper: trigger browser Geolocation
      const useMyLocation = () => {
        if (!navigator.geolocation) {
          alert('Geolocation is not supported by your browser.');
          return;
        }
      
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;
            const locationString = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
            setLocation(locationString);
      
            const field = findByLabel("Location");
            if (field) {
              const updatedResponses = formValues.responses.filter(
                (response) => response.field_id !== field.id
              );
              updatedResponses.push({
                field_id: field.id,
                value: locationString,
              });
      
              setFormValues({
                ...formValues,
                responses: updatedResponses,
              });
            }
          },
          (err) => {
            console.error(err);
            alert('Unable to retrieve location. Please enable GPS and grant permission.');
          },
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
      };

      useEffect(() => {
        // only run once both are loaded
        if (!projectDetails || formFields.length === 0) return;
      
        const cowField = formFields.find(f => f.label === "Cow ID");
        if (!cowField) {
          console.warn("No dynamic field labeled “Cow ID” found in formFields");
          return;
        }
      
        setFormValues(prev => {
          // remove any previous Cow ID entry, then append the new one
          const filtered = prev.responses.filter(r => r.field_id !== cowField.id);
          return {
            ...prev,
            responses: [
              ...filtered,
              { field_id: cowField.id, value: projectDetails.name }
            ]
          };
        });
      }, [projectDetails, formFields]);
      
      
  
    useEffect(() => {
      const fetchFormFields = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/insurance/insurance-types/6/form/`);
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
                insurance_type_id: 6, // Hardcoded as per the required output
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
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
            className="
              fixed inset-0 z-50 flex items-center justify-center p-4
            "
          >
            <div className="relative bg-[#FFF6F3] rounded-lg shadow-lg w-full max-w-xl p-6 overflow-auto max-h-[90vh]">
              {/* Close */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                aria-label="Close"
                className="absolute top-4 right-4 text-xl font-bold"
              >
                ×
              </motion.button>

              {/* Logo */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex justify-center mb-4"
              >
                <Image src={logo} alt="insureCow" width={200} height={40} />
              </motion.div>

              {/* Form */}
              <form onSubmit={handleSubmit}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                {/* Name */}
                <div className="flex flex-col">
                  <label className="mb-1 font-medium">Name</label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    className="border p-2 rounded"
                    type="text"
                    id='name'
                    name='name'
                    placeholder="Enter name"
                    value={formValues.name}
                    onChange={(e) => setFormValues({ ...formValues, [e.target.name]: e.target.value })}
                    required
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col">
                  <label className="mb-1 font-medium">Phone Number</label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    className="border p-2 rounded"
                    type='tel'
                    id='phone'
                    name='phone'
                    placeholder="Enter phone number"
                    value={formValues.phone}
                    onChange={(e) => setFormValues({...formValues,[e.target.name]:e.target.value})}
                    required
                  />
                </div>

                {/* Note */}
                <div className="flex flex-col">
                  <label className="mb-1 font-medium">Add Note</label>
                  <motion.textarea
                    whileFocus={{ scale: 1.02 }}
                    className="border p-2 rounded h-24"
                    id='note'
                    name='note'
                    placeholder="Any queries..."
                    value={formValues.responses.find(response => response.field_id === findByLabel("Add Note")?.id)?.value || ''}
                    onChange={(e)=>{
                
                      const field = findByLabel("Add Note"); 
                      if (field) handleChange(e, field);
                    }}
                  />
                </div>

                {/* Date */}
                <div className="flex flex-col">
                  <label className="mb-1 font-medium">Book Your Visit Date</label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    className="border p-2 rounded"
                    type="date"
                    id='date'
                    name='date'
                    value={formValues.responses.find(response => response.field_id === findByLabel("Book Your Visit Date")?.id)?.value || ''}
                    onChange={(e)=>{
                
                      const field = findByLabel("Book Your Visit Date"); 
                      if (field) handleChange(e, field);
                    }}
                    required
                  />
                </div>

                {/* Location */}
                <div className="flex flex-col">
                  <label className="mb-1 font-medium">Location</label>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type='button'
                    onClick={useMyLocation}
                    className="self-start mb-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                  >
                    Use My Location
                  </motion.button>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    className="border p-2 rounded"
                    type="text"
                    id='location'
                    name='location'
                    placeholder="Lat, Long"
                    value={
                      formValues.responses.find(
                        (response) => response.field_id === findByLabel("Location")?.id
                      )?.value || ''
                    }
                    onChange={(e) => {
                      const field = findByLabel("Location");
                      if (field) handleChange(e, field);
                    }}
                    readOnly
                  />
                </div>

                {/* Address */}
                <div className="flex flex-col">
                  <label className="mb-1 font-medium">Address</label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    className="border p-2 rounded"
                    type="text"
                    id='address'
                    name='address'
                    placeholder="Enter address"
                    value={formValues.responses.find(response => response.field_id === findByLabel("Address")?.id)?.value || ''}
                    onChange={(e)=>{
                
                      const field = findByLabel("Address"); 
                      if (field) handleChange(e, field);
                    }}
                    required
                  />
                </div>
              
              </motion.div>
             

              {/* Totals */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-4 text-gray-700 space-y-1"
              >
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{projectDetails.extra_data.sellingPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charge:</span>
                  <span>1500</span>
                </div>
                <div className="flex justify-between">
                  <span>VAT (%):</span>
                  <span>0</span>
                </div>
                <div className="flex justify-between font-bold border-t pt-2">
                  <span>Total:</span>
                  <span>{projectDetails.extra_data.sellingPrice +1500}</span>
                </div>
              </motion.div>

              <div className="flex items-center pt-4">
          <input
            type="checkbox"
            id="termsAccepted"
            name="termsAccepted"
            checked={isChecked}
            onChange={()=>{
              setChecked(!isChecked)
            }}
            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            required
          />
          <label htmlFor="termsAccepted" className="ml-2 block text-sm text-green-600">
            I accept the terms and conditions
          </label>
        </div>

              {/* Confirm */}
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type='submit'
                disabled={isSubmitting}
                className="mt-6 w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </motion.button>
              </form>
            </div>
            {openDialog ? <DialogCustom message={submissionMessage} onClose={()=>{handleCloseDialog()}} />: ""}
            <ToastContainer />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CowPurchaseModal
