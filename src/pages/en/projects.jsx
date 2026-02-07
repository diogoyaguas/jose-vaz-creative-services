import * as React from "react"

import Layout from "../../components/layout"
import ProjectCard from "../../components/project-card"
import Seo from "../../components/seo"
import { graphql } from "gatsby"

const ProjectsEN = ({ data }) => {
  const projects = data.allProject.nodes

  return (
    <Layout locale="en" otherPath="/projetos">
      <Seo title="Projects" />

      <div className="projects-page row">
        {projects.map((project) => (
          <div key={`${project.slug}-en`} className="col-xl-4 col-lg-6 col-md-6 mb-5">
            <ProjectCard
              media={project.cardMedia}
              title={project.title}
              description={project.smallDescription}
              link={`/en/projects/${project.slug}`}
            />
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ProjectsPageEN {
    allProject(sort: { index: ASC }, filter: { locale: { eq: "en" } }) {
      nodes {
        slug
        title
        smallDescription
        cardMedia {
          img
          video
        }
      }
    }
  }
`

export default ProjectsEN
