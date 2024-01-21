import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Tag from '@/components/Tag';

function PostCard({ Slug, cover_url, description, title, tags, publish_date, read_time }) {
  return (
    <div key={Slug} className="py-12">
      <article>
        <div
          className="flex flex-col justify-start gap-8 rounded-3xl p-6 hover:bg-transparent-yellow md:flex-row duration-150 transition-colors"
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
              <Link className="text-2xl font-bold leading-8 tracking-tight" href={`/blog/${Slug}`}>{title}</Link>
            </div>
            <div className='flex gap-3'>
              <dl className="text-base font-medium leading-6 ttt">
                <dd>
                  <time dateTime={publish_date}>发布于 {publish_date}</time>
                </dd>
              </dl>
              <div>·</div>
              <div>
                <dl className="text-base font-medium leading-6 ttt">
                  <dd>{read_time} 分钟阅读</dd>
                </dl>
              </div>
            </div>
            <div className="prose max-w-none ttt">{description}</div>
            <div className="flex flex-wrap">
                {tags.data.map((tag:any) => (
                  <Tag key={tag.id} text={tag.attributes.tag_name} />
                ))}
              </div>
          </div>
        </div>
      </article>
    </div>
  )
}

export default PostCard
