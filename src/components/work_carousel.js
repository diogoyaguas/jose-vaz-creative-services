import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"

import Carousel from "react-simply-carousel";
import Img from "gatsby-image"
import ReactPlayer from 'react-player';

const WorkCarousel = () => {
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    const data = useStaticQuery(graphql`
    query {
      allWorkJson {
        nodes {
          name
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
  `)



    return (
        <div className="work-carousel">
            <Carousel
                activeSlideIndex={activeSlideIndex}
                onRequestChange={setActiveSlideIndex}
                itemsToShow={0}
                itemsToScroll={1}
            >
                {data.allWorkJson.nodes.map(work => (
                    <div key={work.name} className="work-card">
                        <div className="row">
                            <div className="col-12">
                                {work.video != null ?
                                    <ReactPlayer
                                        url={work.video?.publicURL}
                                        controls={false}
                                        autoPlay={true}
                                        playing={true}
                                        playsInline={true}
                                        muted={true}
                                        loop={true}
                                        width="100%"
                                        height="auto"
                                    />
                                    : <Img fixed={work.img?.childImageSharp?.fixed} />}
                            </div>
                            <div className="col-12 work-name">
                                {work.name}
                            </div>
                        </div>
                    </div>
                ))}

            </Carousel>
        </div>
    )
}

export default WorkCarousel
