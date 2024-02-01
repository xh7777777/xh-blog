'use client'
import { motion } from 'framer-motion'
import { useSession, signIn, signOut } from 'next-auth/react'

const DESCRIPTION = `🌟 欢迎来到我的留言本！🌟 无论您是老朋友还是新朋友，我都非常期待听到您的声音。在这里，您可以畅所欲言——分享您的故事，留下您的足迹，或者只是说个'嗨'！这是一个交流思想、分享经历和建立联系的小角落。`

// {name, content, createdAt}: {name: string, content: string, createdAt: string}
export default function GuestBookLayout() {
  const { data, status } = useSession()

  function handleSignIn() {
    signIn()
  }

  function handleSignOut() {
    signOut()
  }

  function postMessage() {
    console.log('post message')
  }
  console.log(data)
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
            留言板
          </h1>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="ttt p-5">{DESCRIPTION}</div>
          <div className=" mt-8 w-full md:w-3/5">
            {/* 留言框 */}
            <form
              action="submit"
              className=" flex flex-col gap-4 rounded-md bg-white p-2 shadow-lg dark:bg-gray-800 md:p-4 lg:p-6"
            >
              <textarea
                className=" rounded-lg bg-slate-100 dark:bg-slate-900"
                placeholder="输入留言..."
              ></textarea>
              <button
                onClick={handleSignIn}
                className="rounded-md bg-slate-100 py-[1px] hover:bg-slate-200 dark:bg-slate-900"
              >
                提交
              </button>
            </form>
            {/* <button onClick={() => signIn('github')}>登录github
            </button> */}
            {/* 留言列表 */}
          </div>
        </div>
      </div>
    </>
  )
}
