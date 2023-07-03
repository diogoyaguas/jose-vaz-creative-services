import * as React from "react"

import { GatsbyImage, StaticImage, getImage } from "gatsby-plugin-image"

import Layout from "../../components/layout"
import Logo from "../../assets/icons/studio_54/tfr-logo.svg";
import ReactPlayer from 'react-player';
import Seo from "../../components/seo"
import SlidingText from "../../components/slidingText"
import { graphql } from "gatsby"

const FeetingRoom = ({ data }) => {
    const nodes = data.allFeetingRoomJson.nodes[0];
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
                        <div className="col-8 intro mx-auto text-center">
                            <p>
                                The Feeting Room curates new talent and emerging brands, offering the discovery of differentiating concepts and products from independent brands.
                            </p>
                            <p>
                                During my Professional internship at The Feeting Room, I worked as a Graphic Designer closely collaborating with the Marketing and Consulting departments. I had the privilege of crafting captivating visuals for The Feeting Room and its partner brands, including designing campaigns, creating engaging social media content, and providing
                                physical and digital design solutions .
                            </p>
                        </div>
                        <div className="col-6 row mx-auto">
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
                </div>
                <div className="shorttakes">
                    <SlidingText text={"SHORT TAKES WITH JANIINA VAZ SHORT TAKES WITH JANIINA VAZ"} />
                    <div className="container">
                        <div className="row">
                            {nodes.shorttakes.map((short, index) => (
                                <a key={`shorttakes-${index}`} className="col-4 shorttakes-card text-center" href={short.url} target="_blank" rel="noreferrer">
                                    <span className="video-wrapper">
                                        <ReactPlayer
                                            className="player-wrapper"
                                            url={short.video.publicURL}
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
                                </a>
                            ))}
                            <div className="col-10 intro mx-auto text-center">
                                <p>
                                    As the creative force behind the Short Takes Series for The Feeting Room's Instagram, I took on the responsibility of producing captivating videos, in collaboration with Janiina Vaz that introduced the stores, brands, and campaigns of the company.
                                </p>
                                <p>
                                    From conceptualization to post-production, I meticulously prepared each aspect
                                    of the videos, ensuring they were engaging, informative, and reflective of
                                    The Feeting Room's unique identity.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="reels">
                    <SlidingText text={"Reels Shoots Reels Shoots Reels Shoots Reels Shoots"} />
                    <div className="videos row mx-3">
                        {nodes.reels.map((reel, index) => (
                            <a key={`reels-${index}`} className="col-2 reels-card text-center" href={reel.url} target="_blank" rel="noreferrer">
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
                            </a>
                        ))}
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-9 intro mx-auto text-center">
                                <p>
                                    Leading The Feeting Room's Instagram Reels action, I curated stylish looks from partner brands and captured captivating videos showcasing new collections and standout products.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="campaigns">
                    <SlidingText text={"Campaigns Campaigns Campaigns Campaigns Campaigns"} />
                    <div className="container">
                        <div className="row">
                            <div className="col-10 intro mx-auto text-center">
                                <p className="mb-0">
                                    As the creative designer behind campaigns, advertisements, and engagement initiatives on social media, I had the privilege of spearheading impactful strategies for The Feeting Room in collaboration with the Head of Marketing, Benedita Girão.
                                </p>
                            </div>
                            <div className="col-12 text-center event">
                                <StaticImage src={"../../assets/images/feeting_room/Campaigns/website.png"} alt={"Feeting Room Website"} />
                            </div>
                            <div className="col-9 intro mx-auto text-center">
                                <p>
                                    From providing store support with visually captivating elements like acrylics and vinyls for shop windows to conceptualizing and executing website campaigns, holiday ads, and various types of advertisements, our goal was to create a cohesive and compelling brand presence.
                                </p>
                            </div>
                        </div>
                        <div className="row ads">
                            {nodes.ads.map((ads, index) => (
                                <div key={`ads-${index}`} className="col-4 feeting-room-ads-card">
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
                            {nodes.layouts.map((layout, index) => (
                                <div key={`layout-${index}`} className="col-4 layout-card">
                                    <GatsbyImage image={getImage(layout.img)} alt={"Feeting Room Layout for Campaign"} />
                                </div>
                            ))}
                        </div>
                        <div className="label">Layouts and visuals for campaigns</div>
                        <div className="col-9 intro mx-auto text-center">
                            <p>
                                By leveraging our combined expertise and creativity, we aimed to drive brand awareness, foster meaningful engagement, and deliver captivating content that resonated with our target audience across different platforms.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="spotify">
                    <SlidingText text={"SPOTIFY LISTENING ALBUMS SPOTIFY LISTENING ALBUMS"} />
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
                                    {nodes.spotify.map((spotify, index) => (
                                        <div key={`spotify-${index}`} className="col-3 spotify-card">
                                            <GatsbyImage image={getImage(spotify.img)} alt={"Feeting Room Spotify Playlist"} />
                                        </div>
                                    ))}
                                </div>
                                <div className="row info">
                                    <p className="col-8 mx-auto text-center">
                                        At The Feeting Room, we also created design visuals for our monthly curated playlists on Spotify, creating an immersive experience that complements the music and reflects our brand ethos.
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
  story: file(relativePath: { eq: "feeting_room/Spotify/story.mp4" }) {
    publicURL
  }
  allFeetingRoomJson {
    nodes {
      ads {
        video {
          publicURL
        }
      }
      layouts {
        img {
          childImageSharp {
            gatsbyImageData(
                width: 500
            )
          }
        }
      }
      reels {
        url
        video {
          publicURL
        }
      }
      shorttakes {
        video {
          publicURL
        }
        url
      }

      spotify {
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

export default FeetingRoom
