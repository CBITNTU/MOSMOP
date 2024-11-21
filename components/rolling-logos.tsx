"use client"

import React from 'react'
import { motion } from 'framer-motion'

interface RollingLogosProps {
  logos: string[]
}

export function RollingLogos({ logos }: RollingLogosProps) {
  return (
    <div className="w-full overflow-hidden py-12">
      <motion.div
        className="flex space-x-8"
        animate={{
          x: [0, -100 * logos.length],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        {logos.concat(logos).map((logo, index) => (
          <div key={index} className="flex-none w-32 h-32">
            <img
              src={logo}
              alt={`Collaborator logo ${index + 1}`}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

