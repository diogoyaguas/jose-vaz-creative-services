import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import WorkCarousel from "../components/work_carousel"

const Homepage = () => {
  return (
    <Layout>
      <Seo title="Homepage" />
      <div className="homepage">
        <div className="main-title py-5">
          GRAPHIC DESIGNER AND CONTENT EDITOR GRAPHIC DESIGNER AND CONTENT EDITOR
        </div>



        <WorkCarousel />

        <div className="contact text-center row">
          <div className="title col-12">
            INTERESTED IN WORKING TOGETHER?
          </div>
          <a className="email col-12 pt-5 pb-3" href="mailto:zeoliveriavaz@gmail.com" target="_blank" rel="noreferrer" >
            ZEOLIVEIRAVAZ@GMAIL.COM
          </a>
          <a href="/cv.pdf" className="col-12 m-auto w-50 btn btn-primary download-cv" download>
            DOWNLOAD CV
          </a>
        </div>
      </div>
    </Layout>
  )
}

export default Homepage
