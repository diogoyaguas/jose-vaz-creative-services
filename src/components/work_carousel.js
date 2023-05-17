import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { useRef, useState } from "react"
import { graphql, useStaticQuery } from "gatsby"

import Img from "gatsby-image"
import { Link } from "gatsby"
import ReactPlayer from 'react-player';
import Slider from 'react-slick';

const WorkCarousel = () => {
    const data = useStaticQuery(graphql`
    query {
      allWorkJson {
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
  `)

    const [dragging, setDragging] = useState(false);
    const sliderRef = useRef(null);

    const handleDragStart = () => {
        setDragging(true);
    };

    const handleDragEnd = () => {
        setDragging(false);
    };

    const settings = {
        arrows: false,
        autoplay: true,
        autoplaySpeed: 0,
        dots: false,
        draggable: !dragging,
        infinite: true,
        onMouseDown: handleDragStart,
        onMouseLeave: handleDragEnd,
        onMouseUp: handleDragEnd,
        onSwipe: handleDragEnd,
        onTouchEnd: handleDragEnd,
        onTouchStart: handleDragStart,
        ref: sliderRef,
        slidesToScroll: 1,
        slidesToShow: 5,
        speed: 5000,
        swipe: !dragging,
    };

    return (
        <div className="work-carousel">
            <Slider {...settings}>
                {data.allWorkJson.nodes.map(work => (
                    <div key={work.name} className="work-card py-5">
                        <div className="row">
                            <div className="col-12">
                                <Link className="" to={work.link}>
                                    {work.video != null ?
                                        <span className="video-wrapper">
                                            <ReactPlayer
                                                className="player-wrapper"
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
                                            <div className="overlay"></div>
                                        </span>
                                        : <Img fixed={work.img?.childImageSharp?.fixed} />}
                                </Link>
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
