import * as React from "react"

import Layout from "../components/layout"
import ProjectCard from "../components/project-card"
import Seo from "../components/seo"
import { graphql } from "gatsby"

const Projects = ({ data }) => {
    const projects = data.allProjectsJson.nodes
    return (
        <Layout>
            <Seo title="Projects" />
            <div className="projects-page row">
                {projects.map((project, index) => (
                    <div key={index} className="col-lg-4 col-md-6 mb-4">
                        <ProjectCard
                            media={project.media}
                            title={project.title}
                            description={project.description}
                            link={project.link}
                        />
                    </div>
                ))}
            </div>

        </Layout>
    )
}

export const query = graphql`
  query {
    allProjectsJson {
        nodes {
            title
            description
            media {
                img {
                    childImageSharp {
                        gatsbyImageData(width: 330)
                    }
                }
                video {
                    publicURL
                }
            }
            link
            }
        }
    }
`

export default Projects
