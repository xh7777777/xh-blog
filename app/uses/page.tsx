import { genPageMetadata } from 'app/seo'
import UsesLayout from '@/layouts/UsesLayout'
export const metadata = genPageMetadata({ title: 'GuestBook', description: 'Things I blog about' })

export default async function Page() {

  return (
    <>
      <UsesLayout />
    </>
  )
}
