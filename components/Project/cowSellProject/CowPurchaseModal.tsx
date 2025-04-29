'use client'
import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '../../../public/insurelogo.png'

interface CowPurchaseModalProps {
  isOpen: boolean
  onClose: () => void
}

const CowPurchaseModal: React.FC<CowPurchaseModalProps> = ({ isOpen, onClose }) => {
  // Form state
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [note, setNote] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [address, setAddress] = useState('')

  // Helper: trigger browser Geolocation
  const useMyLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.')
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        setLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`)
      },
      (err) => {
        console.error(err)
        alert('Unable to retrieve location. Please enable GPS and grant permission.')
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    )
  }

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
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col">
                  <label className="mb-1 font-medium">Phone Number</label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    className="border p-2 rounded"
                    type="tel"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                {/* Note */}
                <div className="flex flex-col">
                  <label className="mb-1 font-medium">Add Note</label>
                  <motion.textarea
                    whileFocus={{ scale: 1.02 }}
                    className="border p-2 rounded h-24"
                    placeholder="Any queries..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>

                {/* Date */}
                <div className="flex flex-col">
                  <label className="mb-1 font-medium">Book Your Visit Date</label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    className="border p-2 rounded"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>

                {/* Location */}
                <div className="flex flex-col">
                  <label className="mb-1 font-medium">Location</label>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={useMyLocation}
                    className="self-start mb-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                  >
                    Use My Location
                  </motion.button>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    className="border p-2 rounded"
                    type="text"
                    placeholder="Lat, Long"
                    value={location}
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
                    placeholder="Enter address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
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
                  <span>256000</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>1000</span>
                </div>
                <div className="flex justify-between">
                  <span>VAT (%):</span>
                  <span>0</span>
                </div>
                <div className="flex justify-between font-bold border-t pt-2">
                  <span>Total:</span>
                  <span>256000</span>
                </div>
              </motion.div>

              {/* Confirm */}
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="mt-6 w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded"
              >
                Confirm
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CowPurchaseModal
