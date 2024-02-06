import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import siteMetadata from '@/data/siteMetadata'
import { IAbout } from 'type'
import MdToHtml from '@/components/Markdown/MdToHtml'
import SkillList from '@/components/SkillList'
import Experience from '@/components/Experience'
import Link from 'next/link'
interface Props {
  content: IAbout
}

export default function AuthorLayout({ content }: Props) {
  const { name, avatar, skills, experience, resume_url, about } = content

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
            关于
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">

          <div className="prose max-w-none pb-8 pt-8 dark:prose-invert xl:col-span-2">
            <MdToHtml content={about} />
          </div>
          <div className="flex flex-col items-center space-x-2 pt-8">
            {avatar && (
              <Image
                src={avatar}
                alt="avatar"
                width={192}
                height={192}
                className="h-48 w-48 rounded-full"
              />
            )}
            <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight">{name}</h3>
            <div className="text-gray-500 dark:text-gray-400">{'Frontend Engineer'}</div>
            <div className="flex space-x-3 pt-6">
              <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} />
              <SocialIcon kind="github" href={siteMetadata.github} />
              <SocialIcon kind="bilibili" href={siteMetadata.bilibili} size={6} />
            </div>
          </div>
        </div>
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
            技能
          </h1>
          <SkillList />
        </div>
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <div className="flex justify-between">
            <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
              经历
            </h1>
            <Link
              className="h-10 w-20 rounded-lg icon-bg text-center flex justify-center items-center"
              href="..."
            >
              <span className='flex justify-center'>简历</span>
            </Link>
          </div>
          <Experience />
        </div>
      </div>
    </>
  )
}
