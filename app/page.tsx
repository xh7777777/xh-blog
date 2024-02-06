import React from 'react'
import Main from './Main'
import { getPostList } from 'api/serverApi'
import { strapiToPost } from 'type/dto'

const MAX_DISPLAY = 3

export default async function Page() {
  const { data: postData } = await getPostList(0, MAX_DISPLAY)
  const posts = strapiToPost(postData)
  return <>
      <Main posts={posts}/>
  </>

}

