import { URL } from '@/data/constant'
import qs from 'qs'
import { REVALIDATE_TIME } from '@/data/constant'

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
  const res = await fetch(URL + `/articles?${query}`, { next: { revalidate: REVALIDATE_TIME } }).then((res) =>
    res.json()
  )
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
  const res = await fetch(URL + `/articles?${query}`, { next: { revalidate: REVALIDATE_TIME } }).then((res) =>
    res.json()
  )
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
  const res = await fetch(URL + `/articles?${query}`, { next: { revalidate: REVALIDATE_TIME } }).then((res) =>
    res.json()
  )
  return res
}

export async function getPostList(
  page: number,
  pageSize: number,
  isGetAll: boolean = false,
  sorted_by: string = 'publish_date:desc'
) {
  let searchFilter: any = {
    fields: ['id', 'title', 'description', 'publish_date', 'read_time', 'Slug'],
    populate: ['tags', 'cover_code'],
    sort: sorted_by,
  }
  if (!isGetAll) {
    searchFilter.filters = {
      publish_date: {
        $lt: new Date(),
      },
    }
  } else {
    searchFilter.pagination = {
      page,
      pageSize,
    }
  }
  const query = qs.stringify(searchFilter, {
    encodeValuesOnly: true,
    encode: false,
  })
  const res = await fetch(URL + `/articles?${query}`, { next: { revalidate: REVALIDATE_TIME } }).then((res) =>
    res.json()
  )
  return res
}

export async function getAllTags() {
  const query = qs.stringify({
    fields: ['id', 'tag_name'],
    populate: {
      articles: {
        fields: ['id'],
      },
    },
  })
  const res = await fetch(URL + `/tags?${query}`, { next: { revalidate: REVALIDATE_TIME } }).then((res) =>
    res.json()
  )
  return res
}

export async function getProjects() {
  const query = qs.stringify({
    fields: ['id', 'name', 'description', 'url'],
    populate: ['cover_code'],
})
  const res = await fetch(URL + `/projects?${query}`, { next: { revalidate: REVALIDATE_TIME } }).then((res) =>
    res.json()
  )
  return res
}

export async function getAbout() {
  const query = qs.stringify({
    fields: ['name', 'about', 'skills', 'avatar', 'experience', 'resume_url'],
  })
  const res = await fetch(URL + `/configs?${query}`, { next: { revalidate: REVALIDATE_TIME } }).then((res) =>
    res.json()
  )
  return res
}

export async function getGuestBooks() {
  const query = qs.stringify({
    fields: ['id', 'name', 'content', 'site', 'createdAt'],
  })
  const res = await fetch(URL + `/guestBooks?${query}`, { next: { revalidate: REVALIDATE_TIME } }).then((res) =>
    res.json()
  )
  return res
}

export async function postMessage({name, content, site}: {name: string, content: string, site: string}) {
  const data = {
    data: {
      name,
      content,
      site,
    }
  }
  const res = await fetch(URL + `/guestBooks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => res.json())
  return res
}