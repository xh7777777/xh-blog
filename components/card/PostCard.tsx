import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

function PostCard({ Slug, cover_url, description, title, tags, publish_date, read_time }) {
  return (
    <div key={Slug} className="py-12">
      <article>
        <Link
          className="flex cursor-pointer flex-col justify-start gap-8 rounded-3xl p-6 hover:bg-transparent-yellow md:flex-row"
          href={`/blog/${Slug}`}
        >
          <Image
            alt={title}
            src={cover_url}
            className="h-32 w-full rounded-md object-cover object-center sm:h-36 sm:w-36 lg:h-48 lg:w-48"
            width={200}
            height={200}
          />
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold leading-8 tracking-tight">{title}</h2>
            </div>
            <div className='flex gap-3'>
              <dl className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                <dd>
                  <time dateTime={publish_date}>发布于 {publish_date}</time>
                </dd>
              </dl>
              <div>·</div>
              <div>
                <dl className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                  <dd>{read_time} 分钟阅读</dd>
                </dl>
              </div>
            </div>
            <div className="prose max-w-none text-gray-500 dark:text-gray-400">{description}</div>
            {/* <div className="flex flex-wrap">
                {tags.map((tag) => (
                  <Tag key={tag} text={tag} />
                ))}
              </div> */}
            <div className="text-base font-medium leading-6">
              <Link
                href={`/blog/${Slug}`}
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                aria-label={`Read more: "${title}"`}
              >
                Read more &rarr;
              </Link>
            </div>
          </div>
        </Link>
      </article>
    </div>
  )
}

export default PostCard
