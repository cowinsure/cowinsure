"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { GiBullHorns } from "react-icons/gi"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import zeroHunger from "../../public/zerohungerSDG.png"
import provertSDG from "../../public/noprovertySDG.png"
import DecentWorkSDG from "../../public/decentworkSDG.png"
import climateSDG from "../../public/climateSDG.jpg"
import genderequality from "../../public/genderEqualitySDG.png"
import partnerShipSDG from "../../public/partnershipsForTheGoalsSDG.png"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const sdgData = [
  {
    image: provertSDG,
    description: "End poverty in all its forms everywhere by providing financial inclusion to farmers.",
    color: 'bg-red-600',
  },
  {
    image: zeroHunger,
    description: "Achieve food security and improved nutrition through sustainable agriculture.",
    color: 'bg-yellow-500',
  },
  {
    image: genderequality,
    description: "Achieve gender equality and empower all women and men in agriculture.",
    color: 'bg-orange-700',
  },
  {
    image: DecentWorkSDG,
    description: "Promote sustained, inclusive economic growth and decent work for all farmers.",
    color: 'bg-pink-800',
  },
  {
    image: climateSDG,
    description: "Take urgent action to combat climate change through sustainable farming.",
    color: 'bg-green-700',
  },
  {
    image: partnerShipSDG,
    description: "Strengthen the means of production and income generation for smallholder farmers.",
    color: 'bg-blue-900',
  }
]

export default function SDGImpactSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLHeadingElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([iconRef.current, subtitleRef.current, titleRef.current, descriptionRef.current], {
        y: -100,
        opacity: 0,
      })

      gsap.set(cardsContainerRef.current, {
        x: -100,
        opacity: 0,
      })

      gsap.set(cardRefs.current, {
        opacity: 0,
        scale: 0.8,
        y: 50,
      })

      // Create timeline for sequential animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      })

      // Header animations - fall from top
      tl.to(iconRef.current, {
        duration: 0.5,
        y: 0,
        opacity: 1,
        ease: "power2.out",
      })
        .to(
          subtitleRef.current,
          {
            duration: 0.5,
            y: 0,
            opacity: 1,
            ease: "power2.out",
          },
          "-=0.5",
        )
        .to(
          titleRef.current,
          {
            duration: 0.5,
            y: 0,
            opacity: 1,
            ease: "power2.out",
          },
          "-=0.5",
        )
        .to(
          descriptionRef.current,
          {
            duration: 0.5,
            y: 0,
            opacity: 1,
            ease: "power2.out",
          },
          "-=0.3",
        )

      // Cards container animation - slides from left
      tl.to(
        cardsContainerRef.current,
        {
          duration: 0.5,
          x: 0,
          opacity: 1,
          ease: "power2.out",
        },
        "-=0.3",
      )

      // Individual cards animation - staggered appearance
      tl.to(
        cardRefs.current,
        {
          duration: 0.5,
          opacity: 1,
          scale: 1,
          y: 0,
          ease: "back.out(1.7)",
          stagger: {
            amount: 0.75,
            from: "start",
          },
        },
        "-=0.5",
      )

      // Add flip animations for each card
      cardRefs.current.forEach((card) => {
        if (card) {
          const frontSide = card.querySelector(".front-side")
          const backSide = card.querySelector(".back-side")

          if (frontSide && backSide) {
            // Set initial states for flip
            gsap.set(backSide, { rotationX: 180 })

            // Hover animations
            card.addEventListener("mouseenter", () => {
              gsap.to(frontSide, {
                rotationX: -180,
                duration: 0.6,
                ease: "power2.inOut",
              })
              gsap.to(backSide, {
                rotationX: 0,
                duration: 0.6,
                ease: "power2.inOut",
              })
            })

            card.addEventListener("mouseleave", () => {
              gsap.to(frontSide, {
                rotationX: 0,
                duration: 0.6,
                ease: "power2.inOut",
              })
              gsap.to(backSide, {
                rotationX: 180,
                duration: 0.6,
                ease: "power2.inOut",
              })
            })
          }
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="container mx-auto flex flex-col justify-center items-center lg:flex-col lg:justify-center lg:items-center py-20"
    >
      <div className="max-w-4xl text-center">
        <div ref={iconRef}>
          <GiBullHorns className="w-full text-3xl text-center text-green-700 mb-3" />
        </div>
        <h2 ref={subtitleRef} className="text-xl font-bold text-[#687469]">
          SDG
        </h2>
        <h1 ref={titleRef} className="text-5xl font-bold text-[#334b35]">
          SDG Impact
        </h1>
      </div>

      <p ref={descriptionRef} className="text-center font-semibold text-gray-500 mt-10 text-2xl lg:max-w-[80vh]">
        The activities we undertake everyday are helping to achieve the below Sustainable Development Goals as defined
        by UN.
      </p>

      <div
        ref={cardsContainerRef}
        className="w-[99%] rounded-lg flex flex-1 flex-wrap flex-row justify-center items-center gap-2 lg:gap-5 md:gap-5 lg:justify-center lg:items-center"
      >
        {sdgData.map((sdg, index) => (
          <div
            key={index}
            ref={(el) => {
              cardRefs.current[index] = el
            }}
            className="mt-20 w-[25vh] cursor-pointer rounded-lg flex flex-col items-center justify-center"
            style={{ perspective: "1000px" }}
          >
            <div className="relative w-full h-[25vh]" style={{ transformStyle: "preserve-3d" }}>
              {/* Front Side - Image */}
              <div
                className="front-side absolute inset-0 h-[25vh] rounded-lg overflow-hidden"
                style={{ backfaceVisibility: "hidden" }}
              >
                <Image
                  src={sdg.image || "/placeholder.svg"}
                  alt='SDG Image'
                  fill
                  className="rounded-lg object-cover w-full h-full overflow-clip"
                />
              </div>

              {/* Back Side - Message */}
              <div
                className={`back-side absolute inset-0 w-full h-full rounded-lg bg-gradient-to-br ${sdg.color} flex flex-col justify-center items-center p-4 text-white`}
                style={{ backfaceVisibility: "hidden" }}
              >
                <p className="text-sm text-center leading-relaxed">{sdg.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
