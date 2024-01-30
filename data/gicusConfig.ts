import { type GiscusProps } from '@giscus/react'

const GISCUS_CONFIG: GiscusProps = {
    
  repo: "xh7777777/xh-blog", 
  repoId: "R_kgDOKx3ffQ",
  category: 'Announcements',
  categoryId: 'DIC_kwDOFEv7Q',
  mapping: 'pathname',
  reactionsEnabled: '1',
  theme: 'preferred_color_scheme',
  emitMetadata: '1',
  inputPosition: 'bottom',
  lang: 'zh-CN',
  loading: 'eager'
} as const

export default GISCUS_CONFIG
