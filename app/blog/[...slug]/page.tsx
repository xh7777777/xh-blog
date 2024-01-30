import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'
import { getAllPostSlug, getPostBySlug, getPostMetaDataBySlug } from 'api/serverApi'
import MdToHtml from '@/components/Markdown/MdToHtml'
import { PREFIX } from '@/data/constant'
import Image from 'next/image'
import moment from 'moment'
import Comment from '@/components/GiscusComment'

const defaultAuthor = siteMetadata.author

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] }
}): Promise<Metadata | undefined> {
  const slug = decodeURI(params.slug.join('/'))
  const { data } = await getPostMetaDataBySlug(slug)
  if (!data || !Array.isArray(data) || data.length === 0) {
    return;
  }
  const post = data[0]
  const { title, description, publish_date, updatedAt, cover_code } = post.attributes
  const imageUrl = cover_code ? PREFIX + cover_code?.data?.attributes?.url : siteMetadata.socialBanner
  const author = defaultAuthor
  if (!post) {
    return
  }

  const publishedAt = new Date(publish_date).toISOString()
  const modifiedAt = new Date(updatedAt).toISOString()
  let imageList = [imageUrl]
  const ogImages = imageList.map((img) => {
    return {
      url: img.includes('http') ? img : siteMetadata.siteUrl + img,
    }
  })

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: siteMetadata.title,
      locale: 'ZH_CN',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: './',
      images: ogImages,
      authors: author
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageList,
    },
  }
}

export async function generateStaticParams() {
  const posts = await getAllPostSlug()
  return posts.data.map((post: any) => ({
    slug: post.attributes.slug,
  }))
}


export default async function Page({ params }: { params: { slug: string[] } }) {
  const slug = decodeURI(params.slug.join('/'))
  const { data } = await getPostBySlug(slug)

  if (!data || !Array.isArray(data) || data.length === 0) {
    return notFound()
  }
  const post = data[0]
  const { title, publish_date, cover_code, read_time } = post.attributes
  const imageUrl = cover_code ? PREFIX + cover_code?.data?.attributes?.url : siteMetadata.socialBanner
  return <div className='px-6 md:px-2'>
    <Image src={imageUrl} alt='好似没有封面' width={1200} height={680} className='rounded-lg overflow-hidden object-contain w-4/5 my-4' />
    {/* 标题 */}
    <h1 className='text-3xl font-bold py-4'>{title}</h1>
    {/* 发布&阅读时间 */}
    <div className='flex gap-3'>
      <dl className="text-base font-medium leading-6 ttt">
        <dd>
          <time dateTime={publish_date}>发布于 { moment(publish_date).format('YYYY-MM-DD')}</time>
        </dd>
      </dl>
      <div>·</div>
      <div>
        <dl className="text-base font-medium leading-6 ttt">
          <dd>{read_time} 分钟阅读</dd>
        </dl>
      </div>
    </div>
    {/* 分割线 */}
    <hr className='my-4' />
    {/* 内容 */}
    <MdToHtml content={post.attributes.content} />
    {/* 评论 */}
    <Comment />
  </div>
}
