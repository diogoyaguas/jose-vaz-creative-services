import "../styles/slick.css";
import "../styles/slick-theme.css";

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
    slidesToScroll: 5,
    slidesToShow: 5,
    speed: 300,
    swipe: true,
    focusOnChange: true,
    accessibility: true,
    lazyLoad: 'ondemand',
    responsive: [
      {
        breakpoint: 1505,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (

    <Slider {...settings}>
      {information.map((info, index) => (
        <div key={`info-card-${index}`} className="info-card py-5">
          <div className="row">
            <div className="col-12 thumb">
              <Link className="" to={info.link ? info.link : ""}>
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
                  : <Img fluid={info.img?.childImageSharp?.fluid} />}
              </Link>
            </div>
            {info.name != null &&
              <div className="col-12 info-name">
                {info.name}
              </div>
            }
          </div>
        </div>
      ))}
    </Slider>

  )
}

export default Carousel
