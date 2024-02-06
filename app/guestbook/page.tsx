import { genPageMetadata } from 'app/seo'
import GuestBookLayout from '@/layouts/GuestBookLayout'

export const metadata = genPageMetadata({ title: 'GuestBook', description: 'Things I blog about' })
export default async function Page() {
  return (
    <>
        <GuestBookLayout />
    </>
  )
}
