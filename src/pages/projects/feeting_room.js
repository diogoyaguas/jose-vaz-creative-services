import * as React from "react"

import Img from "gatsby-image"
import Layout from "../../components/layout"
import Logo from "../../assets/icons/studio_54/tfr-logo.svg";
import ReactPlayer from 'react-player';
import Seo from "../../components/seo"
import SlidingText from "../../components/slidingText"
import { graphql } from "gatsby"

const FeetingRoom = ({ data }) => {
    return (
        <Layout>
            <Seo title="The Feeting Room" />
            <div className="feeting-room-page pt-5">
                <SlidingText text={"THE FEETING ROOM"} />
                <div className="container">
                    <div className="col-3 mx-auto logo text-center">
                        <Logo />
                    </div>
                    <div className="row">
                        <div className="col-9 intro mx-auto text-center">
                            <p>
                                I'm a Graphic Designer and Content Editor & Creator, based in Porto, Portugal and recently introduced to Marketing and Design in the fashion industry.
                            </p>
                            <p>
                                I'm a hardworking and very committed guy who is always willing to work in a team and discuss ideas in order to evolve myself both professionally and socially. I'm currently launching my professional career outside of Portugal where my goal is to work with European brands and I'm excited to improve my experience in this area.
                            </p>
                        </div>
                        <div className="col-6 text-center mt-4">
                            <a type="button" href="https://thefeetingroom.com/" target="_blank" rel="noreferrer" className="btn btn-primary">
                                Visit website
                            </a>
                        </div>
                        <div className="col-6 text-center mt-4">
                            <a type="button" href="https://www.instagram.com/thefeetingroom/" target="_blank" rel="noreferrer" className="btn btn-primary">
                                Stalk instagram
                            </a>
                        </div>
                    </div>
                </div>
                <div className="shorttakes">
                    <SlidingText text={"SHORT TAKES WITH JANIINA VAZ SHORT TAKES WITH JANIINA"} />
                    <div className="container">
                        <div className="row">
                            <div className="col-9 intro mx-auto text-center">
                                <p>
                                    I'm a Graphic Designer and Content Editor & Creator, based in Porto, Portugal and recently introduced to Marketing and Design in the fashion industry.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="reels">
                    <SlidingText text={"Reels Shoots Reels Shoots Reels Shoots Reels Shoots Re"} />
                    <div className="container">
                        <div className="row">
                            <div className="col-9 intro mx-auto text-center">
                                <p>
                                    I'm a Graphic Designer and Content Editor & Creator, based in Porto, Portugal and recently introduced to Marketing and Design in the fashion industry.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="campaigns">
                    <SlidingText text={"Campaigns Campaigns Campaigns Campaigns Campaigns Cam"} />
                    <div className="container">
                        <div className="row">
                            <div className="col-12 text-center event">
                                <Img fluid={data.website?.childImageSharp?.fluid} />
                            </div>
                            <div className="col-9 intro mx-auto text-center">
                                <p>
                                    I'm a Graphic Designer and Content Editor & Creator, based in Porto, Portugal and recently introduced to Marketing and Design in the fashion industry.
                                </p>
                            </div>
                        </div>
                        <div className="row ads">
                            {data.allAdsJson.nodes.map((ads, index) => (
                                <div key={`ads-${index}`} className="col-4 ads-card">
                                    <span className="video-wrapper">
                                        <ReactPlayer
                                            className="player-wrapper"
                                            url={ads.video.publicURL}
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
                        <div className="label">Ads for Instagram Posts</div>
                        <div className="row layouts">
                            {data.allLayoutsJson.nodes.map((layout, index) => (
                                <div key={`layout-${index}`} className="col-4 layout-card">
                                    <Img fluid={layout.img.childImageSharp?.fluid} />
                                </div>
                            ))}
                        </div>
                        <div className="label">Layouts and visuals for campaigns</div>
                    </div>
                </div>
                <div className="spotify">
                    <SlidingText text={"SPOTIFY LISTENING ALBUMS SPOTIFY LISTENING ALBUMS SPO"} />
                    <div className="container">
                        <div className="row">
                            <div className="col-3 story">
                                <span className="video-wrapper">
                                    <ReactPlayer
                                        className="player-wrapper"
                                        url={data.story.publicURL}
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
                            <div className="col-9 playlists">
                                <div className="row">
                                    {data.allSpotifyJson.nodes.map((spotify, index) => (
                                        <div key={`spotify-${index}`} className="col-3 spotify-card">
                                            <Img fluid={spotify.img.childImageSharp?.fluid} />
                                        </div>
                                    ))}
                                </div>
                                <div className="row info">
                                    <p className="col-8 mx-auto text-center">
                                        I had the opportunity to collaborate with the project's creative director and support photographer Pedro MKK in capturing backstage content during the.
                                    </p>
                                    <a
                                        type="button"
                                        href="https://open.spotify.com/user/3ohma0jws40f0058l1475mfsh?si=9d6cbe61e01440a3" target="_blank"
                                        rel="noreferrer"
                                        className="col-5 mx-auto btn btn-primary">
                                        Listen on Spotify
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export const query = graphql`
  query {
    website: file(relativePath: { eq: "feeting_room/Campaigns/website.png" }) {
      childImageSharp {
        fluid(maxWidth: 2500) {
          ...GatsbyImageSharpFluid
        }
      }
    },
    story: file(relativePath: { eq: "feeting_room/Spotify/story.mp4" }) {
      publicURL
    },
    allAdsJson {
      nodes {
        video {
            publicURL
        }
      }
    },
    allLayoutsJson {
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
    allSpotifyJson {
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
  }
`;

export default FeetingRoom
