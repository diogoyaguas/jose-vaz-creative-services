import Layout from "../../components/layout"
import React from "react"
import Seo from "../../components/seo"
import SlidingText from "../../components/slidingText"
import { StaticImage } from "gatsby-plugin-image"

const DatDesign = () => {
  return (
    <Layout>
      <Seo title="DAT - Design, Art and Technology" />
      <div className="dat-page pt-5">
        <SlidingText text={"DAT - DESIGN, ART AND TECHNOLOGY"} />
        <div className="container">
          <div className="col-12 logo text-center">
            <StaticImage src={"../../assets/images/dat/poster.png"} alt="DAT logo" />
          </div>
          <div className="row">
            <div className="col-9 mx-auto text-center">
              <p>
                DAT: Design, Art, and Technology is a prestigious conference series organized by professors from the Design and Multimedia degree program at the University of Coimbra.
              </p>
              <p>
                With a diverse audience comprising both university members and the general public, as well as renowned national and international guests, the conference serves as a hub for groundbreaking ideas and innovation in design and multimedia.
              </p>
            </div>
          </div>
          <div className="col-12 posters text-center">
            <StaticImage src={"../../assets/images/dat/posters.png"} alt="DAT posters" />
          </div>
          <div className="row">
            <div className="col-9 mx-auto text-center">
              <p>
                A university professor initiated a project to develop the visual identity, merchandising, and various printed and digital materials for the event, including the creation of a comprehensive visual identity and branding strategy.
              </p>
            </div>
          </div>
          <div className="col-12 merch text-center">
            <StaticImage src={"../../assets/images/dat/merch.png"} alt="DAT merch" />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default DatDesign
