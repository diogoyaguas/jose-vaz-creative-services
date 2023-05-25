import * as React from "react"

import Img from "gatsby-image"
import Layout from "../../components/layout"
import { Link } from "gatsby"
import Seo from "../../components/seo"
import SlidingText from "../../components/slidingText"
import { graphql } from "gatsby"

const Studio54 = ({ data }) => {
    return (
        <Layout>
            <Seo title="Studio 54" />
            <div className="studio-54-page pt-5">
                <SlidingText text={"STUDIO 54 TFRLAB_01"} />
            </div>
        </Layout>
    )
}

export default Studio54
