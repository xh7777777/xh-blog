import { URL } from '@/data/constant'
import qs from 'qs'

export async function getAllPostSlug() {
  const query = qs.stringify(
    {
      fields: ['id', 'title', 'Slug'],
    },
    {
      encodeValuesOnly: true,
      encode: false,
    }
  )
  const res = await fetch(URL + `/articles?${query}`).then((res) => res.json())
  return res
}

export async function getPostBySlug(slug: string) {
  const query = qs.stringify(
    {
      fields: ['id', 'title', 'publish_date', 'read_time', 'content'],
      populate: ['tags', 'cover_code'],
      filters: {
        Slug: {
          $eq: slug,
        },
      },
    },
    {
      encodeValuesOnly: true,
      encode: false,
    }
  )
  const res = await fetch(URL + `/articles?${query}`).then((res) => res.json())
  return res
}

export async function getPostMetaDataBySlug(slug: string) {
  const query = qs.stringify(
    {
      fields: ['id', 'title', 'publish_date', 'read_time', 'Slug', 'description', 'updatedAt'],
      populate: ['cover_code'],
      filters: {
        Slug: {
          $eq: slug,
        },
      },
    },
    {
      encodeValuesOnly: true,
      encode: false,
    }
  )
  const res = await fetch(URL + `/articles?${query}`).then((res) => res.json())
  return res
}

export async function getPostList(page: number, pageSize: number) {
  const query = qs.stringify(
    {
      fields: ['id', 'title', 'description', 'publish_date', 'read_time', 'Slug'],
      populate: ['tags', 'cover_code'],
      pagination: {
        page,
        pageSize,
      },
    },
    {
      encodeValuesOnly: true,
      encode: false,
    }
  )
  const res = await fetch(URL + `/articles?${query}`).then((res) => res.json())
  return res
}
