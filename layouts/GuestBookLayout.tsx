'use client'
import { motion } from 'framer-motion'
import { postMessage, getGuestBooks } from 'api/serverApi'
import { useEffect, useState } from 'react'
import moment from 'moment'

const DESCRIPTION = `🌟 欢迎来到我的留言本！🌟 无论您是老朋友还是新朋友，我都非常期待听到您的声音。在这里，您可以畅所欲言——分享您的故事，留下您的足迹，或者只是说个'嗨'！这是一个交流思想、分享经历和建立联系的小角落。`

// {name, content, createdAt}: {name: string, content: string, createdAt: string}
export default function GuestBookLayout() {
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [site, setSite] = useState('')
  const [dataList, setDataList] = useState<any>([])
  const [errorMessage, setErrorMessage] = useState('')
  
  useEffect(() => {
    async function fetchData() {
      const { data } = await getGuestBooks()
      let res = Array.isArray(data) ? data : []
      if (dataList === res) return
      setDataList(res)
    }
    fetchData()
  })

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (errorMessage) setErrorMessage('')
    setName(e.target.value)
  }
  function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (errorMessage) setErrorMessage('')
    setContent(e.target.value)
  }
  function handleSiteChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (errorMessage) setErrorMessage('')
    setSite(e.target.value)
  }
  function handleClear() {
    setName('')
    setContent('')
    setSite('')
  }

  async function handlePostMessage(name: string, content: string, site: string) {
    // 检查输入是否合法
    setErrorMessage('')
    if (!name || !content) {
      setErrorMessage('请输入名字和内容')
      return
    }
    if (name.length < 2 || name.length > 16) {
      console.log(name.length)
      setErrorMessage('名字长度应在2-16个字符之间')
      return
    }
    if (content.length < 2 || content.length > 500) {
      setErrorMessage('留言长度应在2-500个字符之间')
      return
    }
    if (site && site.length > 80) {
      setErrorMessage('网址长度应在80个字符之内')
      return
    }

    try {
      const res = await postMessage({name, content, site})
      if (res && res.data) {
        handleClear()
      } else {
        setErrorMessage('提交失败，请稍后再试')
      }
    } catch (error) {
      console.error(error)
    }
  }
  // console.log(data)
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
          <div className=" mt-8 w-full lg:w-4/5">
            {/* 留言框 */}
            <form
              action="submit"
              className=" flex flex-col gap-4 rounded-md bg-white p-4 shadow-lg dark:bg-gray-800 lg:p-6 relative z-20"
            >
              <div className='flex justify-between flex-col md:flex-row gap-4'>
                <input value={name} onChange={handleNameChange} type="text" className=" rounded-lg bg-slate-100 dark:bg-slate-900 basis-1/2" placeholder='*你的名字' maxLength={16} minLength={2}/>
                <input value={site} onChange={handleSiteChange} type="text" className=" rounded-lg bg-slate-100 dark:bg-slate-900 basis-1/2" placeholder='可选:个人网页地址' maxLength={80}/>
              </div>
              <textarea
                className=" rounded-lg bg-slate-100 dark:bg-slate-900"
                placeholder="输入留言..."
                value={content}
                onChange={handleContentChange}
                maxLength={500}
                minLength={2}
              ></textarea>
              <button
                onClick={() => handlePostMessage(name, content, site)}
                type='button'
                className="rounded-md bg-slate-100 py-2 hover:bg-slate-200 dark:bg-slate-900 hover:text-blue-600 transition-colors duration-200 w-full"
              >
                提交
              </button>
              <div>
                {errorMessage && <div className="text-red-500">{errorMessage}</div>}
              </div>
            </form>
            {/* 留言列表 */}
            <ul>
              {dataList?.map((item: any) => (
                <li key={item.id} className="mt-8 rounded-md bg-white p-4 shadow-lg dark:bg-gray-800">
                  <div className="flex justify-between">
                    <div className="flex gap-2">
                      <div className="font-bold">{item.attributes.name}</div>
                      <div className="text-gray-500 dark:text-gray-400">{item.attributes.site}</div>
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">{moment(item.attributes.createdAte).format('YYYY-MM-DD')}</div>
                  </div>
                  <div className="mt-2">{item.attributes.content}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
