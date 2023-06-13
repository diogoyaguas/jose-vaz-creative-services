import * as React from "react"

import { graphql, useStaticQuery } from "gatsby"

import Carousel from "../components/carousel"
import Layout from "../components/layout"
import Seo from "../components/seo"
import SlidingText from "../components/slidingText"

const Homepage = () => {
  const projects = useStaticQuery(graphql`
    query {
      allProjectsJson {
        nodes {
          name
          link
          video {
            publicURL
          }
          img {
            childImageSharp {
              fluid(maxWidth: 2500) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <Seo title="Homepage" />
      <div className="homepage">
        <div className="pt-5">
          <SlidingText text={"GRAPHIC DESIGNER AND CONTENT EDITOR"} />
        </div>
        <div className="projects-carousel">
        <Carousel information={projects.allProjectsJson.nodes} />
        </div>
        <div className="contact text-center row">
          <div className="title col-12">
            INTERESTED IN WORKING TOGETHER?
          </div>
          <div className="contact-me col-12 pt-3">Contact me:</div>
          <a className="email col-12 pb-4" href="mailto:zeoliveriavaz@gmail.com" target="_blank" rel="noreferrer" >
            zeoliveiravaz@gmail.com
          </a>
          <a href="/cv.pdf" className="col-12 m-auto w-50 btn btn-primary download-cv" download>
            DOWNLOAD CV
          </a>
        </div>
      </div>
    </Layout>
  )
}

export default Homepage
