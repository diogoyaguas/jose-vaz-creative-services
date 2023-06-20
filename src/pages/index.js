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
        <div className="sliding-text">
          <SlidingText text={"GRAPHIC DESIGNER AND CONTENT EDITOR"} />
        </div>
        <div className="projects-carousel">
          <Carousel information={projects.allProjectsJson.nodes} />
        </div>
        <div className="contact container text-center">
          <div className="row">
            <div className="title col-lg-8 col-12 mx-auto">
              INTERESTED IN WORKING TOGETHER?
            </div>
            <div className="contact-me col-12 pt-3 mx-auto">Contact me:</div>
            <a className="email col-12 pb-4" href="mailto:zeoliveriavaz@gmail.com" target="_blank" rel="noreferrer" >
              zeoliveiravaz@gmail.com
            </a>
            <a href="/cv.pdf" className="col-lg-3 col-md-5 col-sm-8 col-10 m-auto btn btn-primary download-cv" download>
              DOWNLOAD CV
            </a>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Homepage
