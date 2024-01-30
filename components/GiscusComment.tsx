'use client'

import Giscus from '@giscus/react'
import React from 'react'

import GISCUS_CONFIG from '@/data/gicusConfig'

const Comment = () => {
  return (
    <div className='my-8'>
      <Giscus {...GISCUS_CONFIG} />
    </div>
  )
}
export default Comment
