import React from 'react'
import Image from 'next/image'

interface RollingLogosProps {
  logos: string[]
}

export const RollingLogos: React.FC<RollingLogosProps> = ({ logos }) => {
  return (
    <div className="w-full overflow-hidden bg-white py-4">
      <div className="flex animate-scroll">
        {logos.concat(logos).map((logo, index) => (
          <div key={index} className="flex-shrink-0 w-48 mx-4">
            <Image
              src={logo}
              alt={`Collaborator logo ${index + 1}`}
              width={192}
              height={96}
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

