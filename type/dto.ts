import { IPost, ITag, IProject } from '.'
import { checkArr } from '../utils'
import { PREFIX } from '@/data/constant'
import moment from 'moment'

export function strapiToPost(postData): IPost[] {
  return checkArr(postData).reduce((acc, cur) => {
    const { title, Slug, description, tags, publish_date, read_time, cover_code } = cur.attributes
    const cover_url = cover_code ? PREFIX + cover_code?.data?.attributes?.url : ''
    const tag = Array.isArray(tags.data) ? tags.data.map((item) => ({
      id: item.id,
      tag_name: item.attributes.tag_name,
    })): []
    let item = {
      id: cur.id,
      title,
      Slug,
      description,
      tags: tag,
      publish_date: moment(publish_date).format('YYYY-MM-DD'),
      read_time,
      cover_url,
    }
    acc.push(item)
    return acc
  }, [])
}

export function strapiToTag(tagData): ITag[] {
  return checkArr(tagData).reduce((acc, cur) => {
    const { tag_name, articles } = cur.attributes
    const articles_id = articles.data.map((item) => item.id)
    let item = {
      id: cur.id,
      tag_name,
      articles_id,
      show: articles_id.length > 0 ? true : false,
    }
    acc.push(item)
    return acc
  }, [])
}

export function strapiToProject(projectData): IProject[] {
  return checkArr(projectData).reduce((acc, cur) => {
    const { name, description, url, cover_code } = cur.attributes
    const cover_url = cover_code ? PREFIX + cover_code?.data?.attributes?.url : ''
    let item = {
      id: cur.id,
      name,
      description,
      url,
      cover_url,
    }
    acc.push(item)
    return acc
  }, [])
}
