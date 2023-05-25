import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Img from "gatsby-image"
import { Link } from "gatsby"
import React from "react"
import ReactPlayer from 'react-player';
import Slider from 'react-slick';

const Carousel = ({ information }) => {

  const settings = {
    arrows: false,
    autoplay: false,
    dots: true,
    draggable: false,
    infinite: true,
    slidesToScroll: 1,
    slidesToShow: 5,
    speed: 300,
    swipe: true,
    focusOnChange: true,
    accessibility: true,
    lazyLoad: 'ondemand',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (

    <Slider {...settings}>
      {information.map(info => (
        <div key={info.name} className="info-card py-5">
          <div className="row">
            <div className="col-12">
              <Link className="" to={info.link}>
                {info.video != null ?
                  <span className="video-wrapper">
                    <ReactPlayer
                      className="player-wrapper"
                      url={info.video?.publicURL}
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
                  : <Img fixed={info.img?.childImageSharp?.fixed} />}
              </Link>
            </div>
            <div className="col-12 info-name">
              {info.name}
            </div>
          </div>
        </div>
      ))}
    </Slider>

  )
}

export default Carousel
