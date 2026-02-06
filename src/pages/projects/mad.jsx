import GallerySection from "../../components/gallery-section"
import Layout from "../../components/layout"
import OrganicContentSection from "../../components/organic-content-section"
import ProjectHeader from "../../components/project-header"
import React from "react"
import Seo from "../../components/seo"
import { graphql } from "gatsby"

const MAD = ({ data }) => {
  console.log(data)
  const project = data.project
  return (
    <Layout>
      <Seo title={project.seoTitle} />

      <ProjectHeader
        title={project.title}
        date={project.date}
        categories={project.categories}
        description={project.description} />

      <GallerySection
        title={project.content.merch.title}
        items={project.content.merch.items}
      />

      <OrganicContentSection
        tabs={project.content.organic}
      />

      <GallerySection
        title={project.content.events.title}
        items={project.content.events.items}
      />
    </Layout>
  )
}

export const query = graphql`
  query MADPage {
    project(slug: { eq: "mad" }) {
      slug
      seoTitle
      title
      date
      categories
      description
      content {
        merch {
          title
          items {
            img {
              childImageSharp {
                gatsbyImageData
              }
            }
            video {
              publicURL
            }
          }
        }
        organic {
          title
          items {
            img {
              childImageSharp {
                gatsbyImageData
              }
            }
            video {
              publicURL
            }
          }
        }
        events {
          title
          items {
            img {
              childImageSharp {
                gatsbyImageData
              }
            }
            video {
              publicURL
            }
          }
        }
        reels {
          title
          items {
            img {
              childImageSharp {
                gatsbyImageData
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

export default MAD
