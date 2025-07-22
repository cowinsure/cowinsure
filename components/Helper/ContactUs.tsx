"use client"
import type React from "react"
import { useState, useEffect, useRef } from "react"
import { GiBullHorns } from "react-icons/gi"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import BackgroundImageLayer from "../common/BackgroundImageLayer"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    description: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Refs for GSAP animations
  const containerRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const formRef = useRef<HTMLElement>(null)
  const inputRefs = useRef<(HTMLInputElement | HTMLTextAreaElement | null)[]>([])
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([iconRef.current, titleRef.current], {
        y: -50,
        opacity: 0,
      })

      gsap.set(formRef.current, {
        y: 100,
        opacity: 0,
      })

      gsap.set(inputRefs.current, {
        x: -30,
        opacity: 0,
      })

      gsap.set(buttonRef.current, {
        scale: 0.8,
        opacity: 0,
      })

      // Create timeline with scroll trigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      })

      // Icon animation - falls from top with bounce
      tl.to(iconRef.current, {
        duration: 0.8,
        y: 0,
        opacity: 1,
        ease: "power2.out",
      })

      // Title animation - falls from top
      tl.to(
        titleRef.current,
        {
          duration: 0.6,
          y: 0,
          opacity: 1,
          ease: "power2.out",
        },
        "-=0.4",
      )

      // Form container slides up
      tl.to(
        formRef.current,
        {
          duration: 0.25,
          y: 0,
          opacity: 1,
          ease: "power2.out",
        },
        "-=0.3",
      )

      // Input fields animate in with stagger
      tl.to(
        inputRefs.current,
        {
          duration: 0.25,
          x: 0,
          opacity: 1,
          ease: "power2.out",
          stagger: 0.1,
        },
        "-=0.5",
      )

      // Button scales in
      tl.to(
        buttonRef.current,
        {
          duration: 0.4,
          scale: 1,
          opacity: 1,
          ease: "back.out(1.7)",
        },
        "-=0.2",
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Button animation on submit
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      })
    }

    const requestData = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      description: formData.description,
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/contact-us/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })

      if (response.ok) {
        toast.success("Your message has been sent successfully.")
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          description: "",
        })

        // Success animation - form fields clear with animation
        gsap.to(inputRefs.current, {
          scale: 1.05,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut",
        })
      } else {
        toast.error("Failed to send your message. Please try again later.")
      }
    } catch (error) {
      console.error("Error submitting contact form:", error)
      toast.error("An error occurred. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <BackgroundImageLayer imageUrl="/contactUs.png" opacity={0.05} />
      <div className="relative py-12">
        <div ref={iconRef}>
          <GiBullHorns className="text-3xl text-green-700 text-center w-full" />
        </div>
        <h2 ref={titleRef} className="text-2xl lg:text-5xl font-bold text-[#334b35]">
          Contact Us
        </h2>
        <section
          ref={formRef}
          className="w-[95%] md:w-[65%] lg:w-[60%] h-auto mt-4 rounded-lg container mx-auto p-4"
        >
          <div className="px-4 py-8">
            <form onSubmit={handleSubmit} className="justify-center items-center space-y-6 text-start">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <input
                    ref={(el) => {
                      inputRefs.current[0] = el
                    }}
                    type="text"
                    placeholder="First Name"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="mt-1 block h-[70px] lg:text-lg font-medium w-full p-4 py-2 lg:p-6 lg:py-4 rounded-xl shadow-sm focus:outline-none focus:bg-white sm:text-sm transition-all duration-300 hover:shadow-md focus:shadow-lg"
                    required
                  />
                </div>
                <div className="flex-1">
                  <input
                    ref={(el) => {
                      inputRefs.current[1] = el
                    }}
                    type="text"
                    placeholder="Last Name"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="mt-1 block h-[70px] lg:text-lg font-medium w-full p-4 py-2 lg:p-6 lg:py-4 rounded-xl shadow-sm focus:outline-none focus:bg-white sm:text-sm transition-all duration-300 hover:shadow-md focus:shadow-lg"
                    required
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <input
                    ref={(el) => {
                      inputRefs.current[2] = el
                    }}
                    type="email"
                    placeholder="Email Address"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block h-[70px] lg:text-lg font-medium w-full p-4 py-2 lg:p-6 lg:py-4 rounded-xl shadow-sm focus:outline-none focus:bg-white sm:text-sm transition-all duration-300 hover:shadow-md focus:shadow-lg"
                    required
                  />
                </div>
                <div className="flex-1">
                  <input
                    ref={(el) => {
                      inputRefs.current[3] = el
                    }}
                    type="tel"
                    placeholder="Phone Number"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block h-[70px] lg:text-lg font-medium w-full p-4 py-2 lg:p-6 lg:py-4 rounded-xl shadow-sm focus:outline-none focus:bg-white sm:text-sm transition-all duration-300 hover:shadow-md focus:shadow-lg"
                    required
                  />
                </div>
              </div>
              <div>
                <textarea
                  ref={(el) => {
                    inputRefs.current[4] = el
                  }}
                  id="description"
                  placeholder="Write Message"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block h-[20vh] lg:text-lg font-medium w-full p-4 py-2 lg:p-6 lg:py-4 rounded-xl shadow-sm focus:outline-none focus:ring-indigo-500 sm:text-sm transition-all duration-300 hover:shadow-md focus:shadow-lg"
                  rows={4}
                  required
                />
              </div>
              <div className="flex items-center justify-center pt-4 pl-2 pr-2">
                <button
                  ref={buttonRef}
                  type="submit"
                  className="relative text-center p-3 lg:w-[200px] lg:h-[60px] bg-green-300 text-green-800 font-semibold rounded-md overflow-hidden group cursor-pointer flex items-center justify-center transition-all duration-300 hover:shadow-lg"
                  disabled={isSubmitting}
                >
                  <span className="relative z-10 group-hover:text-white text-md transition-colors duration-300">
                    {isSubmitting ? "SENDING A MESSAGE..." : "SEND A MESSAGE"}
                  </span>
                  <div className="absolute inset-0 bg-green-800 transform -translate-x-[-195px] group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></div>
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
      <ToastContainer />
    </div>
  )
}

export default ContactUs
