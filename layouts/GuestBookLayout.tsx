'use client'
import { motion } from "framer-motion"
import { useSession, signIn, signOut } from "next-auth/react"

const DESCRIPTION = `🌟 欢迎来到我的留言本！🌟 无论您是老朋友还是新朋友，我都非常期待听到您的声音。在这里，您可以畅所欲言——分享您的故事，留下您的足迹，或者只是说个'嗨'！这是一个交流思想、分享经历和建立联系的小角落。`

// {name, content, createdAt}: {name: string, content: string, createdAt: string}
export default function GuestBookLayout() {

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
            留言板
          </h1>
        </div>
        <div className="ttt">
          {DESCRIPTION}
        </div>
        <div>
            <button onClick={() => signIn('github')}>登录github
            </button>
        </div>
        {/* 留言框 */}

        {/* 留言列表 */}
      </div>
    </>
  )
}
