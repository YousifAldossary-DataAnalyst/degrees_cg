import React from 'react'
import { Banner } from './_components/banner'
import { TemplatesSection } from './_components/templates-section'
import { ProjectsSection } from './_components/projects-section'
import { Sidebar } from './_components/sidebar'

type Props = {}

const SkitchPage = (props: Props) => {
  return (
    <div className="flex flex-col space-y-6 max-w-screen-xl mx-auto px-3 pb-10">
      <Banner />
      <TemplatesSection />
      <ProjectsSection />
    </div>
  )
}

export default SkitchPage