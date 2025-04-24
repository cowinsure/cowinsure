'use client'
import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api'
import logo from '../../../public/insurelogo.png'

interface CowPurchaseModalProps {
  isOpen: boolean
  onClose: () => void
}

const libraries: ('places')[] = ['places']

const CowPurchaseModal: React.FC<CowPurchaseModalProps> = ({ isOpen, onClose }) => {
  // 1️⃣ Load the API (this must match your Script include above)
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  })

  // 2️⃣ Refs & state for location + map
  const [location, setLocation] = useState('')
  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(null)
  const geocoderRef = useRef<google.maps.Geocoder>()

  // Initialize Geocoder once API is ready
  useEffect(() => {
    if (isLoaded && !geocoderRef.current && window.google) {
      geocoderRef.current = new window.google.maps.Geocoder()
    }
  }, [isLoaded])

  // 3️⃣ Listen for selection from <gmp-place-autocomplete>
  useEffect(() => {
    const acTag = document.querySelector('gmp-place-autocomplete')
    if (!acTag) return

    const onSelect = async (e: any) => {
      // detail.placePrediction.toPlace() gives a PlaceResult-like object
      const place = e.detail.placePrediction.toPlace()
      // fetch only the fields we need
      await place.fetchFields({ fields: ['formattedAddress','geometry'] })
      const addr = place.formattedAddress || ''
      const loc = place.geometry!.location
      setLocation(addr)
      setMarker({ lat: loc.lat(), lng: loc.lng() })
    }

    acTag.addEventListener('gmp-select', onSelect)
    return () => { acTag.removeEventListener('gmp-select', onSelect) }
  }, [isLoaded])

  // 4️⃣ Reverse-geocode map clicks
  const onMapClick = (e: google.maps.MapMouseEvent) => {
    if (!e.latLng || !geocoderRef.current) return
    const lat = e.latLng.lat(), lng = e.latLng.lng()
    setMarker({ lat, lng })

    geocoderRef.current.geocode(
      { location: { lat, lng } },
      (results, status) => {
        if (status === 'OK' && results && results[0]?.formatted_address) {
          setLocation(results[0].formatted_address)
        } else {
          setLocation(`Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`)
        }
      }
    )
  }

  if (!isLoaded) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-2 overflow-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={e => e.stopPropagation()}
            className="relative bg-[#FFF6F3] rounded-lg shadow-lg w-full max-w-lg p-6 md:p-8 overflow-y-auto max-h-[95%]"
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="absolute top-3 right-3 text-xl font-bold"
            >
              ×
            </motion.button>

            {/* Logo */}
            <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
              <div className="flex justify-center mb-4">
                <Image src={logo} alt="insureCow" width={150} height={60} className="object-contain" />
              </div>
            </motion.div>

            {/* Form */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex flex-col md:flex-row gap-6">
              {/* Left Column */}
              <div className="flex-1 flex flex-col gap-4">
                <p>Name</p>
                <motion.input whileFocus={{ scale: 1.01 }} className="w-full border p-2 rounded" placeholder="Enter name" />
                <p>Phone Number</p>
                <motion.input whileFocus={{ scale: 1.01 }} className="w-full border p-2 rounded" placeholder="Enter phone number" />
                <p>Add note</p>
                <motion.textarea whileFocus={{ scale: 1.01 }} className="w-full border p-2 rounded h-24" placeholder="Leave a note…" />
              </div>

              {/* Right Column */}
              <div className="flex-1 flex flex-col gap-4">
                <p>Book Your Visit Date</p>
                <motion.input whileFocus={{ scale: 1.01 }} className="w-full border p-2 rounded" type="date" defaultValue="2025-01-01" />

                <p>Location</p>
                <div className="relative">
                  <input
                    id="place-input"
                    className="w-full border p-2 rounded"
                    placeholder="Search location"
                    value={location}
                    readOnly
                  />
                  <gmp-place-autocomplete
                    input="place-input"
                    className="absolute inset-0 w-full h-full border-none"
                  />
                </div>

                <div className="h-48 w-full rounded border mt-2 overflow-hidden">
                  <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    center={marker || { lat: 14.5995, lng: 120.9842 }}
                    zoom={marker ? 14 : 10}
                    onClick={onMapClick}
                  >
                    {marker && <Marker position={marker} />}
                  </GoogleMap>
                </div>

                <p>Address</p>
                <motion.input whileFocus={{ scale: 1.01 }} className="w-full border p-2 rounded" placeholder="Enter address" />

                {/* Totals */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-lg text-gray-700 mt-4 space-y-1">
                  <div className="flex justify-between"><span>Subtotal:</span><span>256000</span></div>
                  <div className="flex justify-between"><span>Shipping:</span><span>1000</span></div>
                  <div className="flex justify-between"><span>Vat(%):</span><span>0</span></div>
                  <div className="flex justify-between font-bold border-t pt-2"><span>Total:</span><span>256000</span></div>
                </motion.div>
              </div>
            </motion.div>

            {/* Confirm */}
            <motion.button
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="mt-6 w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded"
            >
              Confirm
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CowPurchaseModal
