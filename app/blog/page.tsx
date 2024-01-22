import { genPageMetadata } from 'app/seo'
import { getAllTags, getPostList } from 'api/serverApi'
import PostListLayout from '@/layouts/PostListLayout'
import { strapiToPost, strapiToTag } from 'type/dto'

export const metadata = genPageMetadata({ title: 'Blog' })

export default async function BlogPage() {
  let { data:tagData } = await getAllTags()
  let { data:postData } = await getPostList(0, 5, true)
  let tags = strapiToTag(tagData)
  let posts = strapiToPost(postData)
  return (
    <PostListLayout posts={posts} tags={tags}/>
  )
}
