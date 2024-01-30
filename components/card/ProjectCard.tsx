import Image from '../Image'
import Link from '../Link'
import { IProject } from 'type'

const ProjectCard = ({  description, name, cover_url, url, id }: IProject) => (
  <div className="md max-w-[544px] p-4 md:w-1/2">
    <div
      className={`${
        cover_url && 'h-full'
      }  overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700`}
    >
      {cover_url &&
        (url ? (
          <Link href={url} aria-label={`Link to ${name}`}>
            <Image
              alt={name}
              src={cover_url}
              className="object-cover object-center md:h-36 lg:h-48"
              width={544}
              height={306}
            />
          </Link>
        ) : (
          <Image
            alt={name}
            src={cover_url}
            className="object-cover object-center md:h-36 lg:h-48"
            width={544}
            height={306}
          />
        ))}
      <div className="p-6">
        <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
          {url ? (
            <Link href={url} aria-label={`Link to ${name}`}>
              {name}
            </Link>
          ) : (
            name
          )}
        </h2>
        <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">{description}</p>
        {url && (
          <Link
            href={url}
            className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label={`Link to ${name}`}
          >
            查看仓库 &rarr;
          </Link>
        )}
      </div>
    </div>
  </div>
)

export default ProjectCard