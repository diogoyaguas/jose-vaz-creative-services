import * as React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "popper.js/dist/popper.min.js";
import "bootstrap/dist/js/bootstrap.min.js";


const Homepage = () => {
  return (
    <Layout>
      <SEO title="Homepage" />
      <div className="homepage">
        <div className="main-title py-5">
          GRAPHIC DESIGNER AND CONTENT EDITOR GRAPHIC DESIGNER AND CONTENT EDITOR
        </div>

        <div className="row">
          <div className="col-4 text-center">
            <button type="button" class="btn btn-primary">
              MY WORK
            </button>
          </div>
          <div className="col-4 text-center">
            <button type="button" class="btn btn-primary">
              ABOUT ME
            </button>
          </div>
          <div className="col-4 text-center">
            <button type="button" class="btn btn-primary">
              CONTACT
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Homepage
