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

        <div className="row">
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
      </div>
    </Layout>
  )
}

export default Homepage
