import React, { useEffect } from "react"

import Arrow from "../../assets/icons/common/arrow.svg";
import Carousel from "../../components/carousel"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Img from "gatsby-image"
import Layout from "../../components/layout"
import Logo from "../../assets/icons/studio_54/tfr-logo.svg";
import ReactPlayer from 'react-player';
import Seo from "../../components/seo"
import SlidingText from "../../components/slidingText"
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { graphql } from "gatsby"

const Studio54 = ({ data }) => {
    useEffect(() => {
        const collapsibleHeaders = document.querySelectorAll(".settings-header");

        collapsibleHeaders.forEach((header) => {
            header.addEventListener("click", () => {
                header.classList.toggle("active");
                const content = header.nextElementSibling;
                if (content.style.display === "block") {
                    content.style.display = "none";
                } else {
                    content.style.display = "block";
                }
            });
        });
    }, []);

    return (
        <Layout>
            <Seo title="Studio 54" />
            <div className="studio-54-page pt-5">
                <SlidingText text={"STUDIO 54 TFRLAB_01"} />
                <div className="container video">
                    <div className="row">
                        <span className="video-wrapper">
                            <ReactPlayer
                                className="player-wrapper"
                                url={data.banner.publicURL}
                                controls={true}
                                autoPlay={false}
                                muted={false}
                                loop={true}
                                width="100%"
                                height="auto"
                            />
                        </span>
                    </div>
                </div>
                <div className="container intro">
                    <div className="row">
                        <div className="col-9 mx-auto text-center">
                            <p>
                                TFRLab_01  is an innovative project that fosters collaboration between The Feeting Room and its partner brands in the creation of capsule collections. The focus was on reviving the essence of individual freedom and self-expression that was prominently present at Studio 54, the iconic New York nightclub that thrived during the 1970s.
                            </p>
                            <p>
                                To bring this concept to life, The Feeting Room collaborated with 14 partner brands and created an exclusive capsule collection consisting of 24 distinct products that capture the essence of individuality and self-expression.
                            </p>
                        </div>
                        <div className="col-12 text-center mt-4">
                            <a
                                href="https://thefeetingroom.com/blogs/travel/tfrlab_01-launch-party"
                                target="_blank"
                                rel="noreferrer"
                                className="w-25 btn btn-primary">
                                Read blog
                            </a>
                        </div>
                    </div>
                </div>
                <div className="container products">
                    <div className=" row my-5">
                        {data.allProductsJson.nodes.map((product, index) => (
                            <div
                                key={`product-${index}`}
                                id={`product-${index}`}
                                className="col-2 product-card"
                            >
                                <div className="row">
                                    <div className="col-12 normal">
                                        <Img fluid={product.img?.childImageSharp?.fluid} />
                                    </div>
                                    <div className="col-12 hover">
                                        <Img fluid={product.hover?.childImageSharp?.fluid} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="settings-header">Setting the Stage for TFRLab's Creative Direction<Arrow /></div>
                <div className="settings-content text-center">
                    <p>
                        To commence this project, it was essential to establish a cohesive visual identity for the collection, encompassing various printed and digital materials. The initial phase involved the meticulous creation of a logo and comprehensive visual guidelines, which served as the foundation for the development of promotional materials.
                    </p>
                    <div className="row">
                        {data.allPrintedJson.nodes.map((printed, index) => (
                            <div key={`printed-${index}`} className="col-4 prined-card">
                                <Img fluid={printed.img?.childImageSharp?.fluid} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="sneak-peek">
                    <SlidingText text={"Backstage Sneak peek Backstage Sneak peek"} />
                    <div className="backstage row my-5">
                        {data.allBackstageJson.nodes.map((product, index) => (
                            <div key={`backstage-${index}`} className="col-3 backstage-card">
                                <div className="row">
                                    <div className="col-12">
                                        <Img fluid={product.img?.childImageSharp?.fluid} />
                                        <span className="video-wrapper">
                                            <ReactPlayer
                                                className="player-wrapper"
                                                url={product.video.publicURL}
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
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="container row mx-auto">
                        <div className="col-9 mx-auto text-center">
                            <p className="mb-0">
                                I had the opportunity to collaborate with the project's Creative Director and support the photographer Pedro MKK in capturing backstage content during the photoshoot. This content holds significant value as it will be utilized for various digital marketing collateral to promote the collection across different media platforms.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="studio-carousel">
                    <SlidingText text={"SOCIAL MEDIA  SOCIAL MEDIA  SOCIAL MEDIA"} />
                    <Carousel information={data.allStudioJson.nodes} />
                    <div className="container row mx-auto">
                        <div className="col-9 mx-auto text-center">
                            <p className="mb-0">
                                As part of my role,  I was responsible for delivering Social Media layouts and Advertisements to promote the collection. The result was a comprehensive digital marketing campaign that successfully communicated the unique character of TFRLab_01 and effectively conveyed the collection's essence and generated interest.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="the-event">
                    <div className="title">THE EVENT</div>
                    <div className="col-12 text-center event container">
                        <Img fluid={data.event?.childImageSharp?.fluid} />
                    </div>
                    <div className="container row mx-auto">
                        <div className="col-9 mx-auto text-center">
                            <p>
                                On the 19th of November 2021 , The Feeting Room threw a launching of the first iteration of TFRLab.
                            </p>
                            <p className="mb-0">
                                I collaborated closely with the marketing team to deliver a diverse range of printed materials for the event. This included designing and producing invites, signs for the event space, coat room tickets, tattoos, stickers, envelopes, branding cups, and more.
                            </p>
                        </div>
                    </div>
                    <div className="studio-carousel">
                        <Carousel information={data.allPartyJson.nodes} />
                    </div>
                </div>
                <div className="logo container">
                    <div className="row">
                        <div className="col-3 mx-auto">
                            <Logo />
                        </div>
                    </div>
                    <div className="social-media row mt-3 text-center">
                        <a className="col-1" href="https://www.instagram.com/thefeetingroom/" target="_blank" rel="noreferrer">
                            <FontAwesomeIcon icon={faInstagram} size="sm" />
                        </a>
                        <a className="col-1" href="https://thefeetingroom.com/" target="_blank" rel="noreferrer">
                            <FontAwesomeIcon icon={faEarthAmericas} size="sm" />
                        </a>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export const query = graphql`
  query {
    banner: file(relativePath: { eq: "studio_54/Banner.mp4" }) {
      publicURL
    },
    event: file(relativePath: { eq: "studio_54/event.png" }) {
      childImageSharp {
        fluid(maxWidth: 2500) {
          ...GatsbyImageSharpFluid
        }
      }
    },
    allProductsJson {
      nodes {
        img {
            childImageSharp {
                fluid(maxWidth: 2500) {
                ...GatsbyImageSharpFluid
                }
            }
        }
        hover {
            childImageSharp {
                fluid(maxWidth: 2500) {
                ...GatsbyImageSharpFluid
                }
            }
        }
      }
    },
    allBackstageJson {
      nodes {
        img {
            childImageSharp {
                fluid(maxWidth: 2500) {
                ...GatsbyImageSharpFluid
                }
            }
        }
        video {
            publicURL
        }
      }
    },
    allStudioJson {
      nodes {
        img {
            childImageSharp {
                fluid(maxWidth: 2500) {
                ...GatsbyImageSharpFluid
                }
            }
        }
        video {
            publicURL
        }
      }
    },
    allPartyJson {
      nodes {
        img {
            childImageSharp {
                fluid(maxWidth: 2500) {
                ...GatsbyImageSharpFluid
                }
            }
        }
      }
    },
    allPrintedJson {
      nodes {
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
`;

export default Studio54
