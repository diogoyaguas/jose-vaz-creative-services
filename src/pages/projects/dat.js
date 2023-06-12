import Img from "gatsby-image"
import Layout from "../../components/layout"
import React from "react"
import Seo from "../../components/seo"
import SlidingText from "../../components/slidingText"
import { graphql } from "gatsby"

const DatDesign = ({ data }) => {
    return (
        <Layout>
            <Seo title="DAT - Design, Art and Technology" />
            <div className="dat-page pt-5">
                <SlidingText text={"DAT - Design, Art and Technology"} />
                <div className="container">
                    <div className="col-12 logo text-center">
                        <Img fluid={data.logo?.childImageSharp?.fluid} />
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
                        <Img fluid={data.posters?.childImageSharp?.fluid} />
                    </div>
                    <div className="row">
                        <div className="col-9 mx-auto text-center">
                            <p>
                                A university professor initiated a project to develop the visual identity, merchandising, and various printed and digital materials for the event, including the creation of a comprehensive visual identity and branding strategy.
                            </p>
                        </div>
                    </div>
                    <div className="col-12 merch text-center">
                        <Img fluid={data.merch?.childImageSharp?.fluid} />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export const query = graphql`
  query {
    logo: file(relativePath: { eq: "dat/poster.png" }) {
      childImageSharp {
        fluid(maxWidth: 200) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    posters: file(relativePath: { eq: "dat/posters.png" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    merch: file(relativePath: { eq: "dat/merch.png" }) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

export default DatDesign
