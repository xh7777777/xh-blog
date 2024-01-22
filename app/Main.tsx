import Link from '@/components/Link'
import Welcome from '@/components/Welcome'
import PostCard from '@/components/card/PostCard'
import siteMetadata from '@/data/siteMetadata'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import { motion } from 'framer-motion'
import { fadeIn, staggerContainer } from 'utils/motion'
import { getPostList } from 'api/serverApi'
import { strapiToPost } from 'type/dto'

const MAX_DISPLAY = 3

export default async function Home() {
  const { data: postData } = await getPostList(0, MAX_DISPLAY)
  const posts = strapiToPost(postData)

  return (
    <>
      <Welcome />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {/* 博客列表 */}
        <motion.div
          // @ts-ignore
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          className={`divide-y divide-gray-200 dark:divide-gray-700`}
        >
          <motion.div
            className="space-y-2 pb-8 pt-6 md:space-y-5"
            variants={fadeIn('up', 'spring', 0.2, 1)}
          >
            <h1 className="ttt text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              最新文章
            </h1>
          </motion.div>
          {posts.map((post, index) => (
            <motion.div key={post.Slug} variants={fadeIn('up', 'spring', index * 0.3, 1)}>
              <PostCard
                id={post.id}
                title={post.title}
                description={post.description}
                tags={post.tags}
                publish_date={post.publish_date}
                read_time={post.read_time}
                Slug={post.Slug}
                cover_url={post.cover_url}
                className='py-4'
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {posts.length > 0 && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            全部文章 &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
