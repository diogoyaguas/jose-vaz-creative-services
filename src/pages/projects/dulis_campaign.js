import { GatsbyImage, StaticImage, getImage } from "gatsby-plugin-image"

import Layout from "../../components/layout"
import Logo from "../../assets/images/dulis-campaign/logo/logo.svg";
import React from "react"
import ReactPlayer from 'react-player';
import Seo from "../../components/seo"
import SlidingText from "../../components/slidingText"
import { graphql } from "gatsby"

const DulisCampaign = ({ data }) => {
    return (
        <Layout>
            <Seo title="Dulis Shoes - FW22 Campaign" />
            <div className="dulis-campaign-page pt-5">
                <SlidingText text={"Dulis Shoes - FW22 Campaign"} />
                <div className="container">
                    <div className="col-12 logo text-center">
                        <Logo />
                    </div>
                    <div className="col-12 col-lg-7 mx-auto text-center">
                        <p>
                            Dulis Shoes, a renowned Portuguese brand, is dedicated to creating exquisite and
                            comfortable footwear for babies, kids, and moms.
                        </p>
                        <p className="mb-0">
                            During the launch of the Fall/Winter 2021 Collection, Dulis Shoes collaborated with the Consulting Department of The Feeting Room to ensure a successful introduction of their new line.
                            As part of this collaboration, one of the key responsibilities was to work closely with the marketing leader in developing a compelling strategy tocreate an immersive experience that would capture the essence of the brand and highlight the collection's products.
                        </p>
                    </div>
                    <div className="col-12 col-lg-9 mx-auto text-center my-5 buttons">
                        <a href="https://www.instagram.com/dulisshoes/" target="_blank" rel="noreferrer" className="w-25 btn btn-primary">
                            STALK INSTAGRAM
                        </a>
                    </div>
                    <div className="col-12 mx-auto text-center title tales-text">
                        Tales of the Unexpected
                    </div>
                    <div className="col-12 video-container text-center">
                        <span className="video-wrapper">
                            <ReactPlayer
                                className="player-wrapper"
                                url={data.video.publicURL}
                                controls={true}
                                autoPlay={false}
                                muted={false}
                                loop={true}
                                width="100%"
                                height="auto"
                            />
                        </span>
                    </div>
                    <div className="col-12 col-lg-7 mx-auto text-center tv-text">
                        <p>
                            Embark on Dulis Shoes' Fall/Winter 2021 Collection, titled "Tales of the Unexpected." This captivating journey blends reality with mysticism, inviting you to leave everything behind and venture into a world of playful stories, unexpected friendships, and delightfully quirky styles.
                        </p>
                    </div>
                    <SlidingText text={"The collection kit The collection kit"} className={"kit-sliding"} />
                    <div className="col-12 mx-auto text-center">
                        <StaticImage src={"../../assets/images/dulis-campaign/kit/pack.png"} alt="Dulis Shoes - Collection Kit" />
                    </div>
                    <div className="col-12 col-lg-7 mx-auto text-center kit-text">
                        <p>
                            The Collection Kit was a concept that presented a captivating assortment of items showcasing Dulis Shoes' latest collection. It featured a pair of shoes, scented candles, an invitation to a secret website page, and a box of Tarot cards displaying the collection's pairs and editorial photos. As part of the team, my role involved delivering these items and creating layouts.
                        </p>
                        <p>
                            Although the kit was not launched, it served as an exciting option to bring their ideas to life and captivate audiences with the enchanting world of Dulis Shoes.
                        </p>
                    </div>
                    <div className="cards row">
                        {data.allCardsJson.nodes.map((card, index) => (
                            <div className="flip-card col-12 col-xl-2 col-sm-6 col-md-4" key={index}>
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <GatsbyImage image={getImage(card.front)} alt="Dulis Shoes - front card" />
                                    </div>
                                    <div className="flip-card-back">
                                        <GatsbyImage image={getImage(card.back)} alt="Dulis Shoes - back card" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export const query = graphql`
query {
  video: file(relativePath: { eq: "dulis-campaign/video.mp4" }) {
    publicURL
  }
  allCardsJson {
    nodes {
      front {
        childImageSharp {
          gatsbyImageData(width: 285)
        }
      }
      back {
        childImageSharp {
          gatsbyImageData(width: 285)
        }
      }
    }
  }
}
`;

export default DulisCampaign
