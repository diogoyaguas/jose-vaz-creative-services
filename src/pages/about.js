import React, { useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Img from "gatsby-image"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { graphql } from "gatsby"

const About = ({ data }) => {
    const profile = data?.profile?.childImageSharp?.fluid
    const callMeZe = data?.callMeZe?.childImageSharp?.fixed

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
                    <div className="col-lg-5 col-12 profile mx-auto">
                        <Img fixed={callMeZe} />
                        <Img fluid={profile} alt="José Vaz profile picture" />

                    </div>
                    <div className="col-lg-7 col-12 description mt-5 mt-lg-0">
                        <p>
                            I'm a highly skilled Graphic Designer, Content Editor & Creator, with a strong background in the fashion industry. Based in Porto, Portugal, I possess a passion for creating visually compelling content and delivering impactful marketing materials.
                        </p>
                        <p>
                            With a keen eye for design aesthetics and a deep understanding of market trends, I excel in crafting engaging and persuasive content across various platforms. I am experienced in leveraging social media channels and digital tools to amplify brand presence and drive audience engagement.
                        </p>
                        <p>
                            Collaborative by nature, I thrive in team environments and value open communication to ensure seamless coordination and successful project outcomes. My goal is to work with European brands and further enhance my expertise in content creation, design, and marketing.
                        </p>
                        <p>
                            Seeking opportunities to contribute my creativity, strategic thinking, and dedication to achieving exceptional results in the field.
                        </p>
                    </div>
                </div>
                <div className="experience-group">
                    <div className="experience-header">Degree - design and multimedia<FontAwesomeIcon icon={faPlay} /></div>
                    <div className="experience-content">
                        <p>Content for Collapsible Item 1 goes here.</p>
                    </div>

                    <div className="experience-header">Professional Internship<FontAwesomeIcon icon={faPlay} /></div>
                    <div className="experience-content">
                        <p>Content for Collapsible Item 2 goes here.</p>
                    </div>

                    <div className="experience-header">Graphic Designer<FontAwesomeIcon icon={faPlay} /></div>
                    <div className="experience-content">
                        <p>Content for Collapsible Item 3 goes here.</p>
                    </div>
                </div>

                <div className="contact text-center">
                    <a href="/cv.pdf" className="btn btn-primary download-cv" download>
                        DOWNLOAD CV
                    </a>
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
    },
    callMeZe: file(relativePath: { eq: "Ativo 4 1.png" }) {
      childImageSharp {
        fixed {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`

export default About

