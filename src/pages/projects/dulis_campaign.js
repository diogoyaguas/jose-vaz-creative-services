import Layout from "../../components/layout"
import React from "react"
import Seo from "../../components/seo"
import SlidingText from "../../components/slidingText"

const DulisCampaign = ({ data }) => {
    return (
        <Layout>
            <Seo title="Dulis Shoes - FW22 Campaign" />
            <div className="dulis-page pt-5">
                <SlidingText text={"Dulis Shoes - FW22 Campaign"} />
                <div className="container">
                    <div className="col-12 logo text-center">
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default DulisCampaign
