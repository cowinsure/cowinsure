'use client'
import React from 'react'
import Image from 'next/image'
import logo from '../../../public/insurelogo.png'

interface CowPurchaseModalProps {
  isOpen: boolean
  onClose: () => void
}

const CowPurchaseModal: React.FC<CowPurchaseModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div
      className="
        fixed inset-0 z-50 flex items-center justify-center
        bg-black bg-opacity-40 p-4 overflow-auto
      "
    >
      <div
        className="
          relative bg-[#FFF6F3] rounded-lg shadow-lg
          w-full max-w-lg lg:max-w-[60%] mx-auto
          p-6 md:p-10
          overflow-y-auto max-h-[95%]
        "
      >
        {/* close button inside box */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 text-xl font-bold"
        >
          ×
        </button>

        {/* logo */}
        <div className="flex justify-center mb-6">
          <Image
            src={logo}
            alt="insureCow"
            width={150}
            height={60}
            className="object-contain w-[40vh]"
          />
        </div>

        {/* form grid: stacked on mobile, two‑col on md+ */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* left column */}
          <div className="flex-1 flex flex-col gap-4">
            <p>Name</p>
            <input
              className="w-full border border-gray-400 p-2 rounded"
              type="text"
              placeholder="Enter name"
            />
            <p>Phone Number</p>
            <input
              className="w-full border border-gray-400 p-2 rounded"
              type="tel"
              placeholder="Enter phone number"
            />
            <p>Add note</p>
            <textarea
              className="w-full border border-gray-400 p-2 rounded h-24"
              placeholder="Leave a note for any queries…"
            />
          </div>

          {/* right column */}
          <div className="flex-1 flex flex-col gap-4">
            <p>Book Your Visit Date</p>
            <input
              className="w-full border border-gray-400 p-2 rounded"
              type="date"
              defaultValue="2025-01-01"
            />
            <p>Location</p>
            <input
              className="w-full border border-gray-400 p-2 rounded"
              type="text"
              placeholder="Location"
            />
            <p>Address</p>
            <input
              className="w-full border border-gray-400 p-2 rounded"
              type="text"
              placeholder="Enter address"
            />

            <div className="text-lg text-gray-700 mt-4 space-y-1">
              <div className="flex justify-between"><span>Subtotal:</span><span>256000</span></div>
              <div className="flex justify-between"><span>Shipping:</span><span>1000</span></div>
              <div className="flex justify-between"><span>Vat(%):</span><span>0</span></div>
              <div className="flex justify-between font-bold border-t pt-2"><span>Total:</span><span>256000</span></div>
            </div>
          </div>
        </div>

        {/* confirm */}
        <button
          onClick={onClose}
          className="
            mt-6 w-full
            bg-green-700 hover:bg-green-800
            text-white py-2 rounded
          "
        >
          Confirm
        </button>
      </div>
    </div>
  )
}

export default CowPurchaseModal
