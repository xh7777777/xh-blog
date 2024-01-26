import React from 'react'
import { experience, experienceProps } from '@/data/authors'
import ExperienceCard from './card/ExperienceCard'

function Experience() {
  return (
    // timeLine
    <div>
        {experience.map((experience: experienceProps) => (
            <ExperienceCard experience={experience} key={experience.name} className='timeline py-4' />
        ))}
    </div>
  )
}

export default Experience