import React, { useEffect } from "react"

import Arrow from "../../assets/icons/arrow.svg";
import Carousel from "../../components/carousel"
import Img from "gatsby-image"
import Layout from "../../components/layout"
import { Link } from "gatsby"
import ReactPlayer from 'react-player';
import Seo from "../../components/seo"
import SlidingText from "../../components/slidingText"
import { graphql } from "gatsby"

const Studio54 = ({ data }) => {
    useEffect(() => {
        const collapsibleHeaders = document.querySelectorAll(".experience-header");

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

    const showHover = (index) => {
        const card = document.getElementById(`product-${index}`);
        card.querySelector('.hover').style.display = 'block';
        card.querySelector('.hover').style.opacity = 1;
        card.querySelector('.normal').style.display = 'none';
        card.querySelector('.normal').style.opacity = 0;
    }

    const hideHover = (index) => {
        const card = document.getElementById(`product-${index}`);
        card.querySelector('.hover').style.display = 'none';
        card.querySelector('.hover').style.opacity = 0;
        card.querySelector('.normal').style.display = 'block';
        card.querySelector('.normal').style.opacity = 1;
    }

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
                        <div className="col-12">
                            I’m a Graphic Designer and Content Editor & Creator, based in Porto, Portugal and recently introduced to Marketing and Design in the fashion industry.

                            I’m a hardworking and very committed guy who is always willing to work in a team and discuss ideas in order to evolve myself both professionally and socially. I’m currently launching my professional career outside of Portugal where my goal is to work with European brands and i’m excited to improve my experience in this area.

                        </div>
                        <div className="col-12">
                            <Link to="/projects">
                                <button type="button" className={"btn btn-primary"}>
                                    Read blog
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="products row my-5">
                        {data.allProductsJson.nodes.map((product, index) => (
                            <div
                                key={`product-${index}`}
                                id={`product-${index}`}
                                className="col-2 product-card"
                                onMouseOver={() => showHover(index)}
                                onMouseOut={() => hideHover(index)}
                            >
                                <div className="row">
                                    <div className="col-12 normal">
                                        <Img fixed={product.img?.childImageSharp?.fixed} />
                                    </div>
                                    <div className="col-12 hover">
                                        <Img fixed={product.hover?.childImageSharp?.fixed} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="experience-header">PRINTED MATERIALS FOR THE COLLECTION<Arrow /></div>
                <div className="experience-content">

                </div>
                <div className="sneak-peek">
                    <SlidingText text={"Backstage Sneak peek Backstage Sneak peek"} />
                    <div className="backstage row my-5">
                        {data.allBackstageJson.nodes.map((product, index) => (
                            <div key={`backstage-${index}`} className="col-3 backstage-card">
                                <div className="row">
                                    <div className="col-12">
                                        <Img fixed={product.img?.childImageSharp?.fixed} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="studio-carousel">
                    <SlidingText text={"SOCIAL MEDIA  SOCIAL MEDIA  SOCIAL MEDIA"} />
                    <Carousel information={data.allStudioJson.nodes} />
                </div>
            </div>
        </Layout>
    )
}

export const query = graphql`
  query {
    banner: file(relativePath: { eq: "Banner.mp4" }) {
      publicURL
    }
    allProductsJson {
      nodes {
        img {
            childImageSharp {
                fixed {
                ...GatsbyImageSharpFixed
                }
            }
        }
        hover {
            childImageSharp {
                fixed {
                ...GatsbyImageSharpFixed
                }
            }
        }
      }
    }
    allBackstageJson {
      nodes {
        img {
            childImageSharp {
                fixed {
                ...GatsbyImageSharpFixed
                }
            }
        }
      }
    }
     allStudioJson {
      nodes {
        img {
            childImageSharp {
                fixed {
                ...GatsbyImageSharpFixed
                }
            }
        }
        video {
            publicURL
        }
      }
    }
  }
`;

export default Studio54
