'use client'
import { skills } from '@/data/authors'
import React, { useState } from 'react'
import { motion } from 'framer-motion'

function DescriptionCard({ content, isShow }: { content: string; isShow: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: isShow ? 1 : 0, y: isShow ? 0 : 10 }}
      transition={{ duration: 0.3 }}
      className="text-sm ttt prose absolute rounded-md shadow-md border-2 w-56 border-gray-300 bg-slate-50 p-2 -top-20 -left-4"
    >
      {content}
    </motion.div>
  )
}

function SkillList() {
  const [currentActive, setCurrentActive] = useState('')
  function onMouseOver(e) {
        setCurrentActive(e.target.dataset.name)
  }
  return (
    <div>
      <div className="flex h-10 gap-2">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="relative flex h-12 flex-wrap gap-3"
          >
            <DescriptionCard
              content={skill.name + ': ' +skill.description}
              isShow={currentActive === skill.name ? true : false}
            />
            <skill.icon onMouseEnter={onMouseOver} onMouseLeave={()=>setCurrentActive('')} data-name={skill.name} className="group fill-slate-800 dark:fill-slate-50 h-10 w-10" viewBox="0 0 50 50"></skill.icon>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SkillList
