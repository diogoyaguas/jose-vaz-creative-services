import GallerySection from "../../components/gallery-section"
import Layout from "../../components/layout"
import ProjectHeader from "../../components/project-header"
import React from "react"
import Seo from "../../components/seo"
import { graphql } from "gatsby"

const MAD = ({ data }) => {
  const project = data.allDataJson.nodes[0]
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

      <GallerySection
        title={project.content.organic.title}
        items={project.content.organic.items}
      />

      <GallerySection
        title={project.content.events.title}
        items={project.content.events.items}
      />
    </Layout>
  )
}

export const query = graphql`
query {
  allDataJson {
    nodes {
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
          }
        }
        reels {
          title
          items {
            video {
              publicURL
            }
          }
        }
      }
    }
  }
}
`

export default MAD
