import * as React from "react"

import Img from "gatsby-image"
import Layout from "../components/layout"
import { Link } from "gatsby"
import ReactPlayer from 'react-player';
import Seo from "../components/seo"
import SlidingText from "../components/slidingText"
import { graphql } from "gatsby"

const Projects = ({ data }) => {
    return (
        <Layout>
            <Seo title="Projects" />
            <div className="projects-page pt-5">
                <div className="social-media text-center pt-5">
                    <div >
                        <SlidingText text={"SOCIAL MEDIA SOCIAL MEDIA"} />
                    </div>
                    <div className="container">
                        <div className="projects row my-5">
                            {data.allSocialJson.nodes.map((social, index) => (
                                <div key={`${social.name}-${index}`} className="col-12 col-lg-3 project-card my-3">
                                    <div className="row">
                                        <div className="col-12">
                                            <Link className="" to={social.link}>
                                                {social.video != null ?
                                                    <span className="video-wrapper">
                                                        <ReactPlayer
                                                            className="player-wrapper"
                                                            url={social.video?.publicURL}
                                                            controls={false}
                                                            autoPlay={true}
                                                            playing={true}
                                                            playsInline={true}
                                                            muted={true}
                                                            loop={true}
                                                            width="100%"
                                                            height="auto"
                                                        />
                                                    </span>
                                                    : <Img fixed={social.img?.childImageSharp?.fixed} />}
                                            </Link>
                                        </div>
                                        <div className="col-12 info-name">
                                            {social.name}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="graphic-design text-center">
                    <div >
                        <SlidingText text={"GRAPHIC DESIGN GRAPHIC DESIGN"} />
                    </div>
                    <div className="container">
                        <div className="projects row my-5">
                            {data.allGraphicJson.nodes.map((graphic, index) => (
                                <div key={`${graphic.name}-${index}`} className="col-12 col-lg-3 project-card my-3">
                                    <div className="row">
                                        <div className="col-12">
                                            <Link className="" to={graphic.link}>
                                                {graphic.video != null ?
                                                    <span className="video-wrapper">
                                                        <ReactPlayer
                                                            className="player-wrapper"
                                                            url={graphic.video?.publicURL}
                                                            controls={false}
                                                            autoPlay={true}
                                                            playing={true}
                                                            playsInline={true}
                                                            muted={true}
                                                            loop={true}
                                                            width="100%"
                                                            height="auto"
                                                        />
                                                    </span>
                                                    : <Img fixed={graphic.img?.childImageSharp?.fixed} />}
                                            </Link>
                                        </div>
                                        <div className="col-12 info-name">
                                            {graphic.name}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="editorial-design text-center">
                    <div >
                        <SlidingText text={"EDITORIAL DESIGN EDITORIAL DESIGN"} />
                    </div>
                    <div className="container">
                        <div className="projects row my-5">
                            {data.allEditorialJson.nodes.map((editorial, index) => (
                                <div key={`${editorial.name}-${index}`} className="col-12 col-lg-3 project-card my-3">
                                    <div className="row">
                                        <div className="col-12">
                                            <Link className="" to={editorial.link}>
                                                {editorial.video != null ?
                                                    <span className="video-wrapper">
                                                        <ReactPlayer
                                                            className="player-wrapper"
                                                            url={editorial.video?.publicURL}
                                                            controls={false}
                                                            autoPlay={true}
                                                            playing={true}
                                                            playsInline={true}
                                                            muted={true}
                                                            loop={true}
                                                            width="100%"
                                                            height="auto"
                                                        />
                                                    </span>
                                                    : <Img fixed={editorial.img?.childImageSharp?.fixed} />}
                                            </Link>
                                        </div>
                                        <div className="col-12 info-name">
                                            {editorial.name}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export const query = graphql`
  query {
    allSocialJson {
        nodes {
          name
          link
          video {
            publicURL
          }
          img {
            childImageSharp {
              fixed {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
    },
    allGraphicJson {
        nodes {
          name
          link
          video {
            publicURL
          }
          img {
            childImageSharp {
              fixed {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
    },
    allEditorialJson {
        nodes {
          name
          link
          video {
            publicURL
          }
          img {
            childImageSharp {
              fixed {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
    }
  }
`

export default Projects
