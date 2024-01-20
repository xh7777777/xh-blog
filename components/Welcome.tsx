'use client'

import React from 'react'
import Image from 'next/image';
import { motion } from 'framer-motion'
import { TitleText, TypingText } from './animation/Text';
import { planetVariants, staggerContainer, fadeIn } from '../utils/motion';
import avatar from '../public/static/images/avatar.png'

function Welcome() {
  return (
    <section className={`relative z-10`}>
    <motion.div
    // @ts-ignore
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className={`mx-auto flex lg:flex-row flex-col gap-8`}
    >
      <motion.div
        variants={fadeIn('right', 'tween', 0.2, 1)}
        className="flex-[0.95] flex flex-col"
      >
        <TitleText title="你好！" />
        <TypingText title="欢迎访问的我个人博客，我将在这里分享我感兴趣的技术以及热爱的音乐。" />
        <motion.div className=' flex justify-between'>
          <button>我的项目</button>
          <button>我的简历</button>
          <button>我的音乐</button>
        </motion.div>
      </motion.div>

      <motion.div
        variants={fadeIn('left', 'tween', 0.2, 1)}
        className={`flex-1 flex justify-center lg:justify-end`}
      >
        <Image
          width={100}
          height={100}
          src={avatar}
          alt="get-started"
          className=" w-60 h-60 rounded-full"
        />
      </motion.div>
    </motion.div>
  </section>
  )
}

export default Welcome