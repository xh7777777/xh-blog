import Link from '@/components/Link'
import Tag from '@/components/Tag'
import Welcome from '@/components/Welcome'
import PostCard from '@/components/card/PostCard'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import { useQuery } from '@tanstack/react-query'
import { getPosts } from 'api/entries'
import { PREFIX } from '@/data/constant'
import { motion } from 'framer-motion'
import { fadeIn, staggerContainer } from 'utils/motion'

const MAX_DISPLAY = 5

export default function Home() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts(0, MAX_DISPLAY),
  })

  if (isError) {
    return <span>Error: {error.message}</span>
  }
  const posts = data?.data?.data ?? []

  return (
    <>
      <Welcome />
      {isPending ? (
        // todo: 骨架屏
        <div>Loading...</div>
      ) : (
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <div className="space-y-2 pb-8 pt-6 md:space-y-5">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              最新文章
            </h1>
          </div>
          {/* 博客列表 */}
          <motion.div
            // @ts-ignore
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            className={`divide-y divide-gray-200 dark:divide-gray-700`}
          >
            {posts.map((post, index) => (
              <motion.div variants={fadeIn('up', 'spring', index * 0.3, 1)}>
                <PostCard
                  key={post.attributes.Slug}
                  title={post.attributes.title}
                  description={post.attributes.description}
                  tags={post.attributes.tags}
                  publish_date={formatDate(post.attributes.publish_date)}
                  read_time={post.attributes.read_time}
                  Slug={post.attributes.Slug}
                  cover_url={PREFIX + post.attributes.cover_code.data.attributes.url}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
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
