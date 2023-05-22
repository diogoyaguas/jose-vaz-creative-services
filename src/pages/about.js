import React, { useEffect } from "react";

import Arrow from '../images/arrow.svg';
import CallMeZe from '../images/black.svg';
import Img from "gatsby-image"
import Layout from "../components/layout"
import Seo from "../components/seo"
import SlidingText from "../components/slidingText"
import { graphql } from "gatsby"

const About = ({ data }) => {
    const profile = data?.profile?.childImageSharp?.fixed

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
                <div className="py-5">
                    <SlidingText text={"ABOUT ME ABOUT ME ABOUT ME"} />
                </div>
                <div className="container row bio pb-5 mb-5">
                    <div className="col-lg-5 col-12 profile mx-auto">
                        <CallMeZe />
                        <Img fixed={profile} alt="José Vaz profile picture" />

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
                    <SlidingText text={"EDUCATION AND PROFESSIONAL EXPERIENCE EDUCATION AND PROFESSIONAL EXPERIENCE"} />
                    {data.allExperienceJson.nodes.map(info => (
                        <div key={info.title}>
                            <div className="experience-header">{info.title}<Arrow /></div>
                            <div className="experience-content">
                                <p>{info.date}</p>
                                <div className="experience-text"
                                    dangerouslySetInnerHTML={({
                                        __html: info.text
                                    })}
                                />
                            </div>
                        </div >
                    ))}
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
        fixed {
          ...GatsbyImageSharpFixed
        }
      }
    },
    allExperienceJson {
        nodes {
          title
          date
          text
        }
      }
  }
`

export default About

