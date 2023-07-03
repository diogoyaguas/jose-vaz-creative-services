import Layout from "../../components/layout"
import React from "react"
import Seo from "../../components/seo"
import SlidingText from "../../components/slidingText"

const Dezenhos = ({ data }) => {
    return (
        <Layout>
            <Seo title="Dezénhos" />
            <div className="dezenhos-page pt-5">
                <SlidingText text={"DEZÉNHOS DEZÉNHOS DEZÉNHOS"} />
                <div className="container">
                    <div className="col-12 logo text-center">
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Dezenhos
