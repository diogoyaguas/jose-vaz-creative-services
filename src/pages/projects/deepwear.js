import Layout from "../../components/layout"
import React from "react"
import Seo from "../../components/seo"
import SlidingText from "../../components/slidingText"

const Deepwear = ({ data }) => {
    return (
        <Layout>
            <Seo title="Deepwear - Global Progressive Fashion Agency" />
            <div className="deeepwear-page pt-5">
                <SlidingText text={"Deepwear - Global Progressive Fashion Agency"} />
                <div className="container">
                    <div className="col-12 logo text-center">
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Deepwear
