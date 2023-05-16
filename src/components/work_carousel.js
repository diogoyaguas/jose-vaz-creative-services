import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { graphql, useStaticQuery } from "gatsby"

import Img from "gatsby-image"
import React from "react"
import ReactPlayer from 'react-player';
import Slider from 'react-slick';

const WorkCarousel = () => {
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

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 5000,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 0,
        swipeToSlide: true,
        focusOnSelect: true,
    };

    return (
        <div className="work-carousel">
            <Slider {...settings}>
                {data.allWorkJson.nodes.map(work => (
                    <div key={work.name} className="work-card py-5">
                        <div className="row">
                            <div className="col-12">
                                {work.video != null ?
                                    <>
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
                                        <div className="overlay" />
                                    </>
                                    : <Img fixed={work.img?.childImageSharp?.fixed} />}
                            </div>
                            <div className="col-12 work-name">
                                {work.name}
                            </div>
                        </div>
                    </div>
                ))}

            </Slider>
        </div>
    )
}

export default WorkCarousel
