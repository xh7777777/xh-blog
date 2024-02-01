import { genPageMetadata } from 'app/seo'
import { getProjects } from 'api/serverApi'
import { strapiToProject } from 'type/dto'
import ProjectCard from '@/components/card/ProjectCard'

export const metadata = genPageMetadata({ title: 'Projects' })

export default async function Projects() {
  const { data: projectData } = await getProjects()
  const projects = strapiToProject(projectData)

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
            项目
          </h1>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                name={project.name}
                description={project.description}
                cover_url={project.cover_url}
                url={project.url}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
