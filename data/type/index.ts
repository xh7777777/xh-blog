export interface IPost {
    id: string
    title: string
    Slug: string
    description: string
    publish_date: string
    read_time: number
    content?: string
    tags: ITag[]
    cover_url: string
}

export interface ITag {
    id: string,
    tag_name: string,
    articles_id?: string[],
    show?: boolean
}