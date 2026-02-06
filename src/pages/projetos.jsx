import * as React from "react"

import Layout from "../components/layout"
import ProjectCard from "../components/project-card"
import Seo from "../components/seo"
import { graphql } from "gatsby"

const Projects = ({ data }) => {
    const projects = data.allProject.nodes
    console.log(projects)
    return (
        <Layout>
            <Seo title="Projetos" />
            <div className="projects-page row">
                {projects.map((project) => (
                    <div key={project.slug} className="col-xl-4 col-lg-6 col-md-6 mb-5">
                        <ProjectCard
                            media={project.cardMedia}
                            title={project.title}
                            description={project.smallDescription}
                            link={`/projetos/${project.slug}`}
                        />
                    </div>
                ))}
            </div>

        </Layout>
    )
}

export const query = graphql`
  query ProjectsPage {
    allProject(sort: { index: ASC }) {
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

export default Projects
