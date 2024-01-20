import { URL, REVALIDATE_TIME } from "@/data/constant";
import qs from 'qs';
import request from "./request";

export async function getPosts(page: number, pageSize: number, searchValue?:string, tag?:string): Promise<any> {
    let searchFilter:any = {};
    if (searchValue) {
        searchFilter.title = {
            $contains: searchValue
        }
    }
    if (typeof tag === 'string' && tag.length > 0) {
        searchFilter.tags = {
            tag_name: {
                $eq: tag
            }
        }
    }
    const query = qs.stringify({
        fields: ['id', 'title', 'description', 'publish_date', 'read_time', 'Slug'],
        populate: ['tags', 'cover_code'],
        pagination: {
            page,
            pageSize,
        },
        filters: {
            ...searchFilter
        }
    }, {
        encodeValuesOnly: true,
        encode: false,
    });
    const res = await request(URL + `/articles?${query}`);
    return res;
}

export async function getPostBySlug(slug: string): Promise<any> {
    const query = qs.stringify({
        fields: ['id', 'title', 'publish_date', 'read_time', 'content'],
        filters: {
            Slug: {
                $eq: slug
            }
        }
    })
    const res = await request(URL + `/articles?${query}`);
    return res;
}

export async function getHomeData(): Promise<any> {
    const query = qs.stringify({
        populate: {
            articles: {
                populate: '*',
            }
        }
    }, {
        encodeValuesOnly: true,
        encode: false,
    });
    const res = await request(URL + `/configs?${query}`);
    return res;
}

export async function getAllTags(): Promise<any> {
    const query = qs.stringify({
        fields: ['id', 'tag_name'],
        populate: {
            articles: {
                fields: ['id']
            }
        }
    })
    const res = await request(URL + `/tags?${query}`);
    return res;
}

export async function getAllProjects(): Promise<any> {
    const query = qs.stringify({
        fields: ['id', 'name', 'description', 'url'],
        populate: ['cover_code'],
    })
    const res = await request(URL + `/projects?${query}`);
    return res;
}