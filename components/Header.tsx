import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

const title = `XH777's blog`

const Header = () => {
  return (
    <header className="sticky top-0 z-50 my-6 transition-all duration-300">
      <div className="mx-auto flex max-w-3xl items-center justify-between rounded-2xl p-4 xl:max-w-4xl bg-white/30 dark:bg-black/30 backdrop-blur-md">
        <div>
          <Link href="/" aria-label={siteMetadata.headerTitle}>
            <div className="flex items-center justify-between">
              <div className="mr-3">
                <Logo />
              </div>
              {typeof siteMetadata.headerTitle === 'string' ? (
                <div className="hidden h-6 text-2xl font-semibold sm:block">
                  {title}
                </div>
              ) : (
                title
              )}
            </div>
          </Link>
        </div>
        <div className="flex items-center">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="mx-2 hidden justify-center rounded-md px-2 py-2 align-middle text-lg font-medium transition-colors duration-200  hover:bg-transparent-blue hover:text-blue-600 sm:flex"
              >
                {link.title}
              </Link>
            ))}
          {/* <SearchButton /> */}
          <ThemeSwitch />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

export default Header
