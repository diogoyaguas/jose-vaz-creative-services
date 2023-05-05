import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"


const Homepage = () => {
  return (
    <Layout>
      <Seo title="Homepage" />
      <div className="homepage">
        <div className="main-title py-5">
          GRAPHIC DESIGNER AND CONTENT EDITOR GRAPHIC DESIGNER AND CONTENT EDITOR
        </div>

        <div className="navigation row">
          <div className="col-md-4 col-sm-12 text-center">
            <button type="button" className="btn btn-primary">
              MY WORK
            </button>
          </div>
          <div className="col-md-4 col-sm-12 text-center">
            <button type="button" className="btn btn-primary">
              ABOUT ME
            </button>
          </div>
          <div className="col-md-4 col-sm-12 text-center">
            <button type="button" className="btn btn-primary">
              CONTACT
            </button>
          </div>
        </div>

        <div className="contact text-center">
          <div className="title">
            INTERESTED IN WORKING TOGETHER?
          </div>
          <a className="email pt-5 pb-3" href="mailto:zeoliveriavaz@gmail.com" target="_blank" rel="noreferrer" >
            ZEOLIVEIRAVAZ@GMAIL.COM
          </a>
          <button type="button" className="btn btn-primary">
            DOWNLOAD CV
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default Homepage
