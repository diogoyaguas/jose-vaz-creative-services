import Layout from "../../components/layout"
import ProjectHeader from "../../components/project-header"
import React from "react"
import Seo from "../../components/seo"
import { graphql } from "gatsby"

const Studio54 = ({ data }) => {
    const project = data.allDataJson.nodes[0]
    return (
        <Layout>
            <Seo title={project.seoTitle} />

            <ProjectHeader
                title={project.title}
                date={project.date}
                categories={project.categories}
                description={project.description} />

        </Layout>
    )
}

export const query = graphql`
query {
  allStudio54Json {
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


export default Studio54
