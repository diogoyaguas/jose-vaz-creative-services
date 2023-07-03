import * as React from "react"

import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import { Link } from "gatsby"
import ReactPlayer from 'react-player/lazy';
import Seo from "../components/seo"
import SlidingText from "../components/slidingText"
import { graphql } from "gatsby"

const Projects = ({ data }) => {
    const nodes = data.allProjectsDetailsJson.nodes[0]
    return (
        <Layout>
            <Seo title="Projects" />
            <div className="projects-page pt-5">
                <div className="social-media text-center pt-5">
                    <div >
                        <SlidingText text={"SOCIAL MEDIA SOCIAL MEDIA"} small={true} />
                    </div>
                    <div className="container">
                        <div className="projects row my-5">
                            {nodes.social.map((social, index) => (
                                <div key={`${social.name}-${index}`} className="col-12 col-md-6 col-xxl-3 project-card my-3">
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
                                                    : <GatsbyImage image={getImage(social.img)} alt="Social Media Project" />}
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
                        <SlidingText text={"GRAPHIC DESIGN GRAPHIC DESIGN"} small={true} />
                    </div>
                    <div className="container">
                        <div className="projects row my-5">
                            {nodes.graphic.map((graphic, index) => (
                                <div key={`${graphic.name}-${index}`} className="col-12 col-md-6 col-xxl-3 project-card my-3">
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
                                                    : <GatsbyImage image={getImage(graphic.img)} alt="Graphic Project" />}
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
                        <SlidingText text={"EDITORIAL DESIGN EDITORIAL DESIGN"} small={true} />
                    </div>
                    <div className="container">
                        <div className="projects row my-5">
                            {nodes.editorial.map((editorial, index) => (
                                <div key={`${editorial.name}-${index}`} className="col-12 col-md-6 col-xxl-3 project-card my-3">
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
                                                    : <GatsbyImage image={getImage(editorial.img)} alt="Editorial Project" />}
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
    allProjectsDetailsJson {
    nodes {
      editorial {
        img {
          childImageSharp {
            gatsbyImageData(
                width: 330
            )
          }
        }
        link
        name
        video {
          publicURL
        }
      }
      graphic {
        link
        name
        img {
          childImageSharp {
            gatsbyImageData(
                width: 330
            )
          }
        }
        video {
          publicURL
        }
      }
      social {
        img {
          childImageSharp {
            gatsbyImageData(
                width: 330
            )
          }
        }
        link
        name
        video {
          publicURL
        }
      }
    }
  }
}
`

export default Projects
