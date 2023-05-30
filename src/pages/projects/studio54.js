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
                        <div className="col-9 mx-auto text-center">
                            <p>
                                TFRLab_01  is an innovative project that fosters collaboration between The Feeting Room and its partner brands in the creation of capsule collections. The focus was on reviving the essence of individual freedom and self-expression that was prominently present at Studio 54, the iconic New York nightclub that thrived during the 1970s.
                            </p>
                            <p>
                                To bring this concept to life, The Feeting Room collaborated with 14 partner brands and created an exclusive capsule collection consisting of 24 distinct products that capture the essence of individuality and self-expression.
                            </p>
                        </div>
                        <div className="col-12 text-center mt-4">
                            <Link to="/projects">
                                <button type="button" className="btn btn-primary">
                                    Read blog
                                </button>
                            </Link>
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
                <div className="settings-header">Setting the Stage for TFRLab's Creative Direction<Arrow /></div>
                <div className="settings-content">
                    <p>
                        To commence this project, it was essential to establish a cohesive visual identity for the collection, encompassing various printed and digital materials. The initial phase involved the meticulous creation of a logo and comprehensive visual guidelines, which served as the foundation for the development of promotional materials.
                    </p>
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
