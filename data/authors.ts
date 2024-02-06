import { HTML, JavaScriptIcon, TypeScriptIcon, CSS3Icon, DockerIcon, ReactIcon, TailwindIcon, NodeJSIcon } from "@/components/social-icons/icons"
import { PREFIX } from "./constant"

export interface skillProps {
    name: string
    icon?: any
    description?: string
}

export interface experienceProps {
    name: string 
    iconUrl: string
    time: string
    career: string
}

export const avatarURL = PREFIX + '/uploads/avatar_0b82cef52b.webp'
const shuURL = PREFIX + '/uploads/shu_1553bb59f5.webp'
const tripURL = PREFIX + '/uploads/ctrip_6066af58ac.jpg'

export const skills: skillProps[] = [
    {
        name: 'HTML5',
        icon: HTML,
        description: '事实上很难完掌握HTML5，还有好多好多内容要学习。'
    },
    {
        name: 'CSS3',
        icon: CSS3Icon,
        description: '正经人谁写CSS啊！'
    },
    {
        name: 'JavaScript',
        icon: JavaScriptIcon,
        description: '应该是掌握的最好的语言了，虽然语言本身有很多缺陷，但毕竟是吃饭的东西...'
    },
    {
        name: 'TypeScript',
        icon: TypeScriptIcon,
        description: '虽然是anyscript，有时候定义完类型之后很方便，你可以永远相信typescript'
    },
    {
        name: 'Docker',
        icon: DockerIcon,
        description: '容器化工具，部署装环境的神'
    },
    {
        name: 'React',
        icon: ReactIcon,
        description: '如初恋般的框架，虽然很多地方不如Vue.js，但我发现我已离不开你~'
    },
    {
        name: 'Tailwind',
        icon: TailwindIcon,
        description: '神中神！'
    },
    {
        name: 'NodeJS',
        icon: NodeJSIcon,
        description: '假装自己是个后端，后端全靠它，但是单线程永远的痛。'
    }
]

export const experience = [
    {
        name: "上海大学",
        iconUrl: shuURL,
        time: '2020.9 - 至今',
        career: '计算机工程与科学学院'
    },
    {
        name: "携程集团",
        iconUrl: tripURL,
        time: '2023.6 - 2023.9',
        career: '前端开发实习'
    },
]