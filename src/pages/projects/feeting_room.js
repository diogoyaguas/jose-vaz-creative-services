import * as React from "react"

import Img from "gatsby-image"
import Layout from "../../components/layout"
import { Link } from "gatsby"
import Seo from "../../components/seo"
import SlidingText from "../../components/slidingText"
import { graphql } from "gatsby"

const FeetingRoom = ({ data }) => {
    return (
        <Layout>
            <Seo title="The Feeting Room" />
            <div className="feeting-room-page pt-5">
                <SlidingText text={"THE FEETING ROOM"} />
            </div>
        </Layout>
    )
}

export default FeetingRoom
