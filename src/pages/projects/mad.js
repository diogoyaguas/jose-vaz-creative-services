import Layout from "../../components/layout"
import React from "react"
import Seo from "../../components/seo"
import SlidingText from "../../components/slidingText"

const Mad = ({ data }) => {
    return (
        <Layout>
            <Seo title="M.A.D - Music Addiction Disorder" />
            <div className="mad-page pt-5">
                <SlidingText text={"M.A.D - Music Addiction Disorder"} />
                <div className="container">
                    <div className="col-12 logo text-center">
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Mad
