import Layout from "../../components/layout"
import React from "react"
import Seo from "../../components/seo"
import SlidingText from "../../components/slidingText"

const DulisLookbook = ({ data }) => {
    return (
        <Layout>
            <Seo title="Dulis Shoes - SS23 Lookbook" />
            <div className="dulis-page pt-5">
                <SlidingText text={"Dulis Shoes - SS23 Lookbook"} />
                <div className="container">
                    <div className="col-12 logo text-center">
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default DulisLookbook
