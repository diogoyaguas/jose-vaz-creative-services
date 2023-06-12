import * as React from "react"

import Img from "gatsby-image"
import Layout from "../../components/layout"
import { Link } from "gatsby"
import Logo from "../../assets/icons/studio_54/tfr-logo.svg";
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
                            <a type="button" href="https://thefeetingroom.com/" className="btn btn-primary">
                                Visit website
                            </a>
                        </div>
                        <div className="col-6 text-center mt-4">
                            <a type="button" href="https://www.instagram.com/thefeetingroom/" className="btn btn-primary">
                                Stalk instagram
                            </a>
                        </div>
                    </div>
                </div>
                <div className="shorttakes">
                    <SlidingText text={"SHORT TAKES WITH JANIINA VAZ SHORT TAKES WITH JANIINA "} />
                </div>
            </div>
        </Layout>
    )
}

export default FeetingRoom
