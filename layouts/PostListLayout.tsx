'use client'
import React from 'react'
import { motion } from 'framer-motion'
import PostCard from '@/components/card/PostCard'
import { staggerContainer, fadeIn } from 'utils/motion'
import type { IPost, ITag } from '@/data/type'
import siteMetadata from '@/data/siteMetadata'

const baseSpringTime = 0.2

function PostListLayout({ posts, tags }: { posts: IPost[]; tags: ITag[] }) {
  // 将posts按照publish_data分组
  const [tagFilter, setTagFilter] = React.useState('all')
  const [searchValue, setSearchValue] = React.useState('')
  const [filteredPosts, setFilteredPosts] = React.useState(
    posts.reduce(
      (acc, cur) => {
        let date = cur.publish_date.split('-')[0]
        if (acc[date]) {
          acc[date].push(cur)
        } else {
          acc[date] = [cur]
        }
        return acc
      },
      {} as { [key: string]: IPost[] }
    )
  )
  return (
    <motion.div
      // @ts-ignore
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={` flex flex-col gap-3`}
    >
      {/* 标题 */}
      <motion.div variants={fadeIn('up', 'spring', baseSpringTime, 1)}>
        <h1 className="ttt text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          博客
        </h1>
      </motion.div>
      {/* 描述 */}
      <motion.div variants={fadeIn('up', 'spring', baseSpringTime * 2, 1)}>
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>
      </motion.div>
      {/* 搜索框 */}
      <motion.div variants={fadeIn('up', 'spring', baseSpringTime * 3, 1)}>
        <div className="relative">
          <input
            aria-label="Search articles"
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="搜索文章"
            className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          />
        </div>
      </motion.div>
      {/* 标签 */}
      <motion.div variants={fadeIn('up', 'spring', baseSpringTime * 4, 1)}>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setTagFilter('all')}
            className={`rounded-md px-4 py-2 text-sm font-medium focus:outline-none ${
              tagFilter === 'all'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100'
            }`}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => setTagFilter(tag.tag_name)}
              className={`rounded-md px-4 py-2 text-sm font-medium focus:outline-none ${
                tagFilter === tag.tag_name
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100'
              }`}
            >
              {tag.tag_name}
            </button>
          ))}
        </div>
      </motion.div>

      {/* 博客列表 */}
      <motion.div variants={fadeIn('up', 'spring', baseSpringTime * 5, 1)}>
        {Object.entries(filteredPosts).sort((a, b) => parseInt(b[0]) - parseInt(a[0])).map(([date, posts]) => (
            <div key={date}>{date}</div>
        ))}
        {/* {posts.map((post, index) => (
          <div key={post.Slug}>
            <PostCard
              id={post.id}
              title={post.title}
              description={post.description}
              tags={post.tags}
              publish_date={post.publish_date}
              read_time={post.read_time}
              Slug={post.Slug}
              cover_url={post.cover_url}
            />
          </div>
        ))} */}
      </motion.div>
    </motion.div>
  )
}

export default PostListLayout
