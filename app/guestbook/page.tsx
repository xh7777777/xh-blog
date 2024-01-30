import { genPageMetadata } from 'app/seo'
import GuestBookLayout from '@/layouts/GuestBookLayout'
import SessionWrapper from '@/components/SessionWrapper'

export const metadata = genPageMetadata({ title: 'GuestBook', description: 'Things I blog about' })
export default async function Page() {


  return (
    <>
      <SessionWrapper>
        <GuestBookLayout />
      </SessionWrapper>
    </>
  )
}
