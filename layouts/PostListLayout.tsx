'use client'
import React from 'react'
import { motion } from 'framer-motion'
import PostCard from '@/components/card/PostCard'
import { staggerContainer, fadeIn } from 'utils/motion'
import type { IPost, ITag } from 'type'
import siteMetadata from '@/data/siteMetadata'

const baseSpringTime = 0.2

function PostListLayout({ posts, tags }: { posts: IPost[]; tags: ITag[] }) {
  // 将posts按照publish_data分组
  const baseGroupedPosts = React.useMemo(() => groupPostsByDate(posts), [posts])
  const [tagFilter, setTagFilter] = React.useState('all')
  const [searchValue, setSearchValue] = React.useState('')
  const [filteredPosts, setFilteredPosts] = React.useState(baseGroupedPosts)

  function groupPostsByDate(posts: IPost[]) {
    return posts.reduce(
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
  }

  const tagFilterPosts = React.useCallback(
    (newTag: string) => {
      setTagFilter(newTag)
      let _filteredPosts = baseGroupedPosts
      if (newTag !== 'all') {
        _filteredPosts = Object.entries(_filteredPosts).reduce(
          (acc, [date, posts]) => {
            acc[date] = posts.filter((post) => post.tags.some((tag) => tag.tag_name === newTag))
            return acc
          },
          {} as { [key: string]: IPost[] }
        )
      }
      if (searchValue) {
        _filteredPosts = Object.entries(_filteredPosts).reduce(
          (acc, [date, posts]) => {
            acc[date] = posts.filter(
              (post) =>
                post.title.toLowerCase().includes(searchValue.toLowerCase()) ||
                post.description.toLowerCase().includes(searchValue.toLowerCase())
            )
            return acc
          },
          {} as { [key: string]: IPost[] }
        )
      }
      setFilteredPosts(_filteredPosts)
    },
    [baseGroupedPosts, searchValue]
  )

  const searchFilterPosts = React.useCallback(
    (newSearchValue: string) => {
      setSearchValue(newSearchValue)
      if (newSearchValue === '') {
        return tagFilterPosts(tagFilter)
      }
      let _filteredPosts = baseGroupedPosts
      if (tagFilter !== 'all') {
        _filteredPosts = Object.entries(_filteredPosts).reduce(
          (acc, [date, posts]) => {
            acc[date] = posts.filter((post) => post.tags.some((tag) => tag.tag_name === tagFilter))
            return acc
          },
          {} as { [key: string]: IPost[] }
        )
      }
      if (newSearchValue) {
        _filteredPosts = Object.entries(_filteredPosts).reduce(
          (acc, [date, posts]) => {
            acc[date] = posts.filter(
              (post) =>
                post.title.toLowerCase().includes(newSearchValue.toLowerCase()) ||
                post.description.toLowerCase().includes(newSearchValue.toLowerCase())
            )
            return acc
          },
          {} as { [key: string]: IPost[] }
        )
      }
      setFilteredPosts(_filteredPosts)
    },
    [baseGroupedPosts, tagFilter]
  )
  return (
    <motion.div
      // @ts-ignore
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={` flex flex-col gap-3 pt-7`}
    >
      {/* 标题 */}
      <motion.div variants={fadeIn('up', 'spring', baseSpringTime, 1)}>
        <h1 className="ttt text-2xl font-extrabold leading-9 tracking-tight sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
          博客
        </h1>
      </motion.div>
      {/* 描述 */}
      <motion.div variants={fadeIn('up', 'spring', baseSpringTime * 2, 1)}>
        <div className="py-2">
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
            value={searchValue}
            onChange={(e) => searchFilterPosts(e.target.value)}
            placeholder="搜索文章"
            className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          />
          {searchValue && (
            <button
              onClick={() => searchFilterPosts('')}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="20"
                height="20"
                viewBox="0 0 16 16"
              >
                <path fill="#f78f8f" d="M7.5 0.5A7 7 0 1 0 7.5 14.5A7 7 0 1 0 7.5 0.5Z"></path>
                <path
                  fill="#c74343"
                  d="M7.5,1C11.084,1,14,3.916,14,7.5S11.084,14,7.5,14S1,11.084,1,7.5S3.916,1,7.5,1 M7.5,0 C3.358,0,0,3.358,0,7.5S3.358,15,7.5,15S15,11.642,15,7.5S11.642,0,7.5,0L7.5,0z"
                ></path>
                <path fill="#fff" d="M7 3.5H8V11.5H7z" transform="rotate(45.001 7.5 7.5)"></path>
                <path fill="#fff" d="M7 3.5H8V11.5H7z" transform="rotate(134.999 7.5 7.5)"></path>
              </svg>
            </button>
          )}
        </div>
      </motion.div>
      {/* 标签 */}
      <motion.div variants={fadeIn('up', 'spring', baseSpringTime * 4, 1)} className="py-2">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => tagFilterPosts('all')}
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
              onClick={() => tagFilterPosts(tag.tag_name)}
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
        {Object.entries(filteredPosts)
          .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
          .map(([date, posts]) => (
            <div key={date}>
              {posts.length > 0 && (
                <div className="flex py-4">
                  <div className="text-2xl font-bold">{date}</div>
                  <div className="flex-1 border-b-2 border-gray-300 dark:border-gray-700"></div>
                </div>
              )}
              <div className="flex flex-col">
                {posts.map((post, index) => (
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
                ))}
              </div>
            </div>
          ))}
      </motion.div>
    </motion.div>
  )
}

export default PostListLayout
