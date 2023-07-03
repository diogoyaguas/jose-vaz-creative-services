import { GatsbyImage, StaticImage, getImage } from "gatsby-plugin-image"

import Layout from "../../components/layout"
import Logo from "../../assets/images/mad/logo.svg";
import React from "react"
import ReactPlayer from 'react-player/lazy';
import Seo from "../../components/seo"
import SlidingText from "../../components/slidingText"
import { graphql } from "gatsby"

const Mad = ({ data }) => {
    const nodes = data.allMadJson.nodes[0];
    return (
        <Layout>
            <Seo title="M.A.D - Music Addiction Disorder" />
            <div className="mad-page pt-5">
                <SlidingText text={"M.A.D - MUSIC ADDICTION DISORDER"} />
                <div className="container">
                    <div className="col-12 logo text-center">
                        <Logo />
                    </div>
                    <div className="row">
                        <div className="col-lg-9 col-12 mx-auto text-center">
                            <p>
                                M.A.D - Music Addiction Disorder is a dynamic project I've embraced as a freelance worker. As a producer and planner for music and artistic environments, M.A.D collaborates with national and international DJs, creating a safe space for music and art enthusiasts.
                            </p>
                            <p>
                                My role involves rebranding M.A.D, encompassing the creation of a new visual identity and logo, social media activity, design merch, and visually captivating events, all aimed at providing unforgettable experiences for the community.
                            </p>
                        </div>
                    </div>
                    <div className="col-9 mx-auto text-center my-5 buttons">
                        <a href="https://www.instagram.com/mad.clubbing/" target="_blank" rel="noreferrer" className="col-lg-4 col-12 btn btn-primary">
                            STALK INSTAGRAM
                        </a>
                    </div>
                </div>
                <div className="merch-design">
                    <SlidingText text={"MERCH DESIGN MERCH DESIGN MERCH DESIGN MERCH DESIGN"} small={true} />
                    <div className="row">
                        {nodes.merch.map((merch, index) => (
                            <div key={`merch-${index}`} className="col-lg-3 col-6 merch-card">
                                <GatsbyImage image={getImage(merch.img)} alt={"M.A.D Merch"} />
                            </div>
                        ))}
                    </div>
                    <div className="container">
                        <div className="col-12 col-lg-7 mx-auto text-center tv-text">
                            <p>
                                During the creation of merch for the brand, I took on the responsibility of designing and creating prints for various types of merchandise. Working in collaboration with Ana Luís, we sourced and identified suitable factories that could bring our designs to life.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="col-12 mx-auto text-center title mad-text">
                        THE M.A.D EVENT
                    </div>
                    <div className="col-12 event text-center">
                        <StaticImage src={"../../assets/images/mad/poster/poster.png"} alt="DAT logo" />
                    </div>
                    <div className="col-12 col-lg-7 mx-auto text-center event-text">
                        <p>
                            As a key contributor to the project, my main role revolved around developing distinct visual identities for each event. In collaboration with Sâmile Souza, the talented illustrator artist of M.A.D, I curated and designed posters, flyers, and various other promotional materials for every event.
                        </p>
                    </div>
                </div>
                <div className="socia-media-design">
                    <SlidingText text={"SOCIAL MEDIA SOCIAL MEDIA SOCIAL MEDIA SOCIAL MEDIA"} small={true} />
                    <div className="row">
                        {nodes.social.map((social, index) => (
                            <div key={`social-${index}`} className="col-social social-card">
                                <GatsbyImage image={getImage(social.img)} alt={"M.A.D Social Media"} />
                            </div>
                        ))}
                    </div>
                    <div className="container">
                        <div className="col-12 col-lg-7 mx-auto text-center social-text">
                            <p>
                                In addition to my other responsibilities, I took on the role of managing the social media, creating posts and stories that showcased the artists, venues, and visual aspects of each event.
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        {nodes.lineup.map((lineup, index) => (
                            <div key={`lineup-${index}`} className="col-lg-3 col-6 lineup-card">
                                <GatsbyImage image={getImage(lineup.img)} alt={"M.A.D Lineup"} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="reels">
                    <SlidingText text={"REELS WARM UP REELS WARM UP REELS WARM UP REELS WARM UP"} small={true} />
                    <div className="row">
                        {nodes.reels.map((reel, index) => (
                            <div key={`reel-${index}`} className="col-lg-3 col-6 reel-card">
                                <span className="video-wrapper">
                                    <ReactPlayer
                                        className="player-wrapper"
                                        url={reel.video.publicURL}
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
                    </div>
                    <div className="container">
                        <div className="col-12 col-lg-7 mx-auto text-center tv-text">
                            <p>
                                By showcasing the energy, atmosphere, and highlights of each event, these videos served as powerful promotional tools to generate interest and excitement among the audience.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="party">
                    <SlidingText text={"M.A.D PARTY SHOOTS M.A.D PARTY SHOOTS M.A.D PARTY SHOOTS"} small={true} />
                    <div className="row">
                        {nodes.party.map((party, index) => (
                            <div key={`party-${index}`} className="col-lg-2 col-6 party-card">
                                <GatsbyImage image={getImage(party.img)} alt={"M.A.D Party"} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="buttons container">
                    <div className="social-media row mt-3 text-center">
                        <div className="col-lg-10 col-12 row">
                            <a className="col-lg-4 col-12 btn btn-primary" href="https://www.tiktok.com/@mad.clubbing" target="_blank" rel="noreferrer">
                                Watch TikTok
                            </a>
                            <a className="col-lg-4 col-12 btn btn-primary" href="https://www.instagram.com/mad.clubbing/" target="_blank" rel="noreferrer">
                                Stalk more events
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export const query = graphql`
query {
  allMadJson {
    nodes {
      lineup {
        img {
          childImageSharp {
                        gatsbyImageData
                    }
                }
            }
      merch {
        img {
          childImageSharp {
                        gatsbyImageData
                    }
                }
            }
      party {
        img {
          childImageSharp {
                        gatsbyImageData
                    }
                }
            }
      reels {
        video {
                    publicURL
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

export default Mad
