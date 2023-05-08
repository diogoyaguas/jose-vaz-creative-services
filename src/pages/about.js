import React, { useEffect } from "react";

import Layout from "../components/layout"
import Seo from "../components/seo"

import { graphql } from "gatsby"
import Img from "gatsby-image"

const About = ({ data }) => {
    const profile = data?.profile?.childImageSharp?.fluid

    useEffect(() => {
        const collapsibleHeaders = document.querySelectorAll(".experience-header");

        collapsibleHeaders.forEach((header) => {
            header.addEventListener("click", () => {
                header.classList.toggle("active");
                const content = header.nextElementSibling;
                if (content.style.display === "block") {
                    content.style.display = "none";
                } else {
                    content.style.display = "block";
                }
            });
        });
    }, []);

    return (
        <Layout>
            <Seo title="About Me" />
            <div className="about">
                <div className="main-title py-5">
                    ABOUT ME ABOUT ME ABOUT ME ABOUT ME ABOUT ME ABOUT ME ABOUT ME ABOUT ME
                </div>

                <div className="container row bio pb-5 mb-5">
                    <div className="col-7 profile mx-auto">
                        <svg width="122" height="116" viewBox="0 0 122 116" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M62.4954 3.40358L66.2136 50.9997C66.4291 53.7594 69.0616 55.6721 71.7529 55.0243L118.168 43.8524C119.967 43.4195 120.802 45.99 119.093 46.6969L74.9751 64.9411C72.4171 65.9989 71.4115 69.0936 72.8592 71.453L97.8275 112.145C98.795 113.721 96.6084 115.31 95.4079 113.903L64.4235 77.5819C62.627 75.476 59.373 75.476 57.5765 77.5819L26.5922 113.903C25.3915 115.31 23.205 113.721 24.1725 112.145L49.1408 71.453C50.5885 69.0936 49.583 65.9989 47.0249 64.9411L2.90727 46.6969C1.19777 45.99 2.03305 43.4195 3.83149 43.8524L50.2471 55.0243C52.9383 55.6721 55.5709 53.7594 55.7864 50.9997L59.5046 3.4036C59.6486 1.55929 62.3514 1.55941 62.4954 3.40358Z" stroke="black" strokeWidth="3" />
                        </svg>
                        <Img fluid={profile} alt="José Vaz profile picture" />

                    </div>
                    <div className="col-5 description">
                        <p>
                            As a Graphic Designer and Content Editor & Creator based in Porto, Portugal, I have recently broadened my skills to include Marketing and Design in the fashion industry. I approach my work with a strong work ethic and a deep commitment to collaboration and the exchange of ideas, which allows me to grow both professionally and personally.
                        </p>
                        <p>
                            With a desire to expand my horizons, I am currently embarking on a new chapter in my career outside of Portugal. My aim is to work with European brands and gain valuable experience in this field. I am enthusiastic about the opportunities that lie ahead and look forward to enhancing my skills and expertise in this exciting industry.
                        </p>
                    </div>
                </div>
                <div className="experience-group">
                    <div className="experience-header">Degree - design and multimedia<span></span></div>
                    <div className="experience-content">
                        <p>Content for Collapsible Item 1 goes here.</p>
                    </div>

                    <div className="experience-header">Professional Internship</div>
                    <div className="experience-content">
                        <p>Content for Collapsible Item 2 goes here.</p>
                    </div>

                    <div className="experience-header">Graphic Designer</div>
                    <div className="experience-content">
                        <p>Content for Collapsible Item 3 goes here.</p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export const query = graphql`
  query {
    profile: file(relativePath: { eq: "profile.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default About

