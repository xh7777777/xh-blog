import React from 'react'
import { experienceProps } from '@/data/authors'
import Image from 'next/image'

function ExperienceCard({
  experience,
  className,
}: {
  experience: experienceProps
  className?: string
}) {
  return (
    <div className={className}>
      <div className="flex gap-4 pl-4">
        <div className="flex flex-col items-center justify-center">
          <Image
            src={experience.iconUrl}
            width={100}
            height={100}
            alt={experience.name}
            className="rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <div className="text-2xl font-bold">{experience.name}</div>
          <div className="text-md ttt">{experience.time}</div>
          <div className="text-lg">{experience.career}</div>
        </div>
      </div>
    </div>
  )
}

export default ExperienceCard
