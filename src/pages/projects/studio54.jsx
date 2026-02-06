import GallerySection from "../../components/gallery-section"
import Layout from "../../components/layout"
import ProjectHeader from "../../components/project-header"
import React from "react"
import Seo from "../../components/seo"
import { graphql } from "gatsby"

const Studio54 = ({ data }) => {
    const project = data.project
    console.log(project)
    return (
        <Layout>
            <Seo title={project.seoTitle} />

            <ProjectHeader
                title={project.title}
                date={project.date}
                categories={project.categories}
                description={project.description} />

            <GallerySection
                title={project.content.socialMedia.title}
                items={project.content.socialMedia.items}
              />

        </Layout>
    )
}

export const query = graphql`
  query Studio54Page {
    project(slug: { eq: "studio54" }) {
      slug
      seoTitle
      title
      description
      content {
        socialMedia {
          title
          items {
            img {
              childImageSharp {
                gatsbyImageData(width: 900)
              }
            }
            video {
              publicURL
            }
          }
        }
      }
    }
  }
`

export default Studio54
