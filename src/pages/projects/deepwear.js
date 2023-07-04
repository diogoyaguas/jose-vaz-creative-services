import { GatsbyImage, StaticImage, getImage } from "gatsby-plugin-image"
import React, { useRef, useState } from "react"

import HTMLFlipBook from 'react-pageflip';
import Layout from "../../components/layout"
import Logo from "../../assets/images/deepwear/logo.svg";
import ReactPlayer from 'react-player/lazy';
import Seo from "../../components/seo"
import SlidingText from "../../components/slidingText"
import { graphql } from "gatsby"

const PageCover = React.forwardRef((props, ref) => {
    return (
        <div className="pages" ref={ref}>
            {props.children}
        </div>
    );
});

const Page = React.forwardRef((props, ref) => {
    return (
        <div className="pages" ref={ref}>
            {props.children}
        </div>
    );
});

const Deepwear = ({ data }) => {
    const nodes = data.allDeepwearJson.nodes[0];

    const [page, setPage] = useState(0);

    let flipBook = useRef(null)

    const pages = nodes.book;

    const totalPages = 14;
    const [lastData, setLastData] = useState(0)

    const nextButtonClick = (e) => {
        if (flipBook.current) {
            flipBook.current.pageFlip().flipNext();
        }
    };

    const prevButtonClick = () => {
        if (flipBook.current) {
            flipBook.current.pageFlip().flipPrev();
        }
    };

    const changePage = (data) => {
        if (lastData < data) {
            setPage(page + 1)
        } else setPage(page - 1)
        setLastData(data)
    };
    return (
        <Layout>
            <Seo title="Deepwear - Global Progressive Fashion Agency" />
            <div className="deeepwear-page pt-5">
                <SlidingText text={"DEEPWEAR - GLOBAL PROGRESSIVE FASHION AGENCY"} />
                <div className="container">
                    <div className="col-lg-3 col-12 mx-auto logo text-center">
                        <Logo />
                    </div>
                    <div className="col-12 col-lg-10 mx-auto text-center">
                        <p>
                            DEEPWEAR is a fashion agency that offers a progressive way to manage your brand and increase your company's productivity while reducing costs, and increasing security. Their fashion outsourcing service brings a relentless approach to style, quality, timing, communication, professionalism, and efficiency.
                        </p>
                        <p className="mb-0">
                            As a Graphic Designer at Deepwear, I collaborate with a global team of project managers and fashion brands, crafting logos and brand identities for diverse fashion labels. Additionally, I manage social media, curating visually content, and support the company's digital presence through various design services.
                        </p>
                    </div>
                    <div className="col-lg-6 col-12 row mx-auto">
                        <div className="col-lg-6 col-12 text-center mt-4">
                            <a type="button" href="https://deepwear.info/" target="_blank" rel="noreferrer" className="btn btn-primary">
                                Visit website
                            </a>
                        </div>
                        <div className="col-lg-6 col-12 text-center mt-4">
                            <a type="button" href="https://www.instagram.com/deepwear/" target="_blank" rel="noreferrer" className="btn btn-primary">
                                Stalk instagram
                            </a>
                        </div>
                    </div>
                </div>
                <div className="tiktok">
                    <SlidingText text={"FACTORY VISIT VIDEOS FOR TIKTOK AND INSTAGRAM REELS"} small={true} />
                    <div className="container">
                        <div className="row tiktoks">
                            {nodes.tiktoks.map((tiktok, index) => (
                                <div key={`tiktok-${index}`} className="col-lg-4 col-12 tiktok-card text-center" >
                                    <span className="video-wrapper">
                                        <ReactPlayer
                                            className="player-wrapper"
                                            url={tiktok.video.publicURL}
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
                            ))}
                            <div className="col-lg-10 col-12 intro mx-auto text-center">
                                <p>
                                    In my role at Deepwear, I had the exciting opportunity to create compelling content for our factory partners. Through video production and facility tours, I showcased the exceptional quality of the people and teams we collaborate with, providing Deepwear clients with a firsthand glimpse into the expertise and craftsmanship behind their products.
                                </p>
                            </div>
                            <div className="col-lg-6 col-12 row mx-auto">
                                <div className="col-lg-6 col-12 text-center mt-4 mx-auto">
                                    <a type="button" href="https://www.tiktok.com/@deepwear_" target="_blank" rel="noreferrer" className="btn btn-primary">
                                        Watch more videos
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="social-media">
                    <SlidingText text={"SOCIAL MEDIA SOCIAL MEDIA SOCIAL MEDIA SOCIAL MEDIA"} small={true} />
                    <div className="container">
                        <div className="row medias">
                            {nodes.social.map((social, index) => (
                                <div key={`social-${index}`} className="col-lg-3 col-12 social-card text-center">
                                    <GatsbyImage image={getImage(social.img)} alt={"Deepwear - Social Media"} />
                                </div>
                            ))}
                            <div className="col-lg-10 col-12 intro mx-auto text-center">
                                <p>
                                    In my role, I created social media posts by designing layouts, sourcing photos from suppliers, and coordinating with the global team for daily work photos. Additionally, I crafted copy's for each post, ensuring a cohesive and compelling brand message across our social media channels.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="brochures">
                    <SlidingText text={"CATALOGUES AND FACTORY BROCHURES"} small={true} />
                    <HTMLFlipBook
                        className="flipbook mx-auto mb-5"
                        ref={flipBook}
                        width={500}
                        height={710}
                        minWidth={400}
                        minHeight={568}
                        showCover={true}
                        onFlip={(e) => changePage(e.data)}
                    >
                        <PageCover><StaticImage src={"../../assets/images/deepwear/brochures/book/1.png"} alt="Dulis Lookbook Cover" /></PageCover>
                        {pages.map((page, index) => (
                            <Page key={`page-${index}`}>
                                <GatsbyImage image={getImage(page.img)} alt="Dulis Lookbook Page" />
                            </Page>
                        ))}
                        <PageCover><StaticImage src={"../../assets/images/deepwear/brochures/book/30.png"} alt="Dulis Lookbook Back Cover" /></PageCover>
                    </HTMLFlipBook>

                    <div className="col-lg-7 col-12 row mx-auto text-center my-5 buttons buttons-pages">
                        <div className="col-lg-4 col-12 prev">
                            <button type="button" className="btn btn-primary" onClick={() => prevButtonClick()}>
                                Previous page
                            </button>
                        </div>
                        <div className="col-lg-4 col-12 text-center">
                            {page > 0 && page <= totalPages && <span>{page} of </span>}{totalPages} pages
                        </div>
                        <div className="col-lg-4 col-12 next">
                            <button type="button" className="btn btn-primary" onClick={(e) => nextButtonClick(e)}>
                                Next page
                            </button>
                        </div>
                    </div>
                    <div className="col-lg-7 col-12 intro mx-auto text-center">
                        <p>
                            A significant aspect of my job involved creating over then 50 brochures and catalogs for Deepwear's partner factories. These materials served as showcases, highlighting the unique specialties, team and work, as well as featuring wholesale collections and white label options.
                        </p>
                        <p>
                            By crafting these brochures, Deepwear could effectively communicated the expertise and capabilities of their partner factories, helping to forge strong connections with potential clients and demonstrating Deepwear's commitment to quality and diversity in our offerings.
                        </p>
                    </div>
                    <div className="col-12 text-center brochures-image">
                        <StaticImage src={"../../assets/images/deepwear/brochures/1.png"} alt={"Deepwear Brochures"} />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export const query = graphql`
query {
  allDeepwearJson {
    nodes {
      tiktoks {
        video {
          publicURL
        }
      }
      book {
        img {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      social {
        img {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
}
`;

export default Deepwear
