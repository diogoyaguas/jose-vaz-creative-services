import Layout from "../../components/layout"
import React from "react"
import Seo from "../../components/seo"
import SlidingText from "../../components/slidingText"

const DatDesign = ({ data }) => {
    return (
        <Layout>
            <Seo title="DAT - Design, Art and Technology" />
            <div className="dat-page pt-5">
                <SlidingText text={"DAT - Design, Art and Technology"} />
                <div className="container">
                    <div className="col-12 logo text-center">
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default DatDesign
