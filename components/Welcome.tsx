'use client'

import React from 'react'
import Image from 'next/image';
import { motion } from 'framer-motion'
import { TitleText, TypingText } from './animation/Text';
import { planetVariants, staggerContainer, fadeIn } from '../utils/motion';
import Link from 'next/link';
import { avatarURL } from '@/data/authors';

const welcome = `你好,我是xh777`
const description = `我是一名前端工程师，对开源社区、React、Nodejs、CICD、音视频技术等有着很大的热情。
这里汇集了我的思考、生活与我的一切，祝您有很好的阅读体验~`

function Welcome() {
  return (
    <section className={`relative z-10 py-8`}>
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
        <TitleText title={welcome} />
        <TypingText title={description} textStyles='prose text-md ttt py-4' />
        <motion.div className='flex gap-4 py-2 md:py-6'>
          <Link href={'/about'} className=' rounded-sm icon-bg px-4 py-2 ttt'>关于我</Link>
          <Link href={'/blog'} className=' rounded-sm icon-bg px-4 py-2 ttt'>阅读文章</Link>
        </motion.div>
      </motion.div>

      <motion.div
        variants={fadeIn('left', 'tween', 0.2, 1)}
        className={`flex-1 flex justify-center lg:justify-end`}
      >
        <Image
          width={100}
          height={100}
          src={avatarURL}
          alt="get-started"
          className=" w-60 h-60 rounded-full"
        />
      </motion.div>
    </motion.div>
  </section>
  )
}

export default Welcome