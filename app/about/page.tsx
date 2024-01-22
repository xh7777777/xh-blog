import AuthorLayout from '@/layouts/AuthorLayout'
import { genPageMetadata } from 'app/seo'
import { getAbout } from 'api/serverApi'
import { notFound } from 'next/navigation'

export const metadata = genPageMetadata({ title: 'About' })

export default async function Page() {

  const {data: aboutData} = await getAbout()
  if (!aboutData || !Array.isArray(aboutData) || aboutData.length === 0) {
    return notFound();
  }

  return (
    <>
      <AuthorLayout content={aboutData[0].attributes}/>
    </>
  )
}
