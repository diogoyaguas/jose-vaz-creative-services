import React, { useEffect, useState } from "react";

import Arrow from "../assets/icons/common/arrow.svg";
import CallMeZe from "../assets/icons/about/name.svg";
import Img from "gatsby-image"
import Layout from "../components/layout"
import Seo from "../components/seo"
import SlidingText from "../components/slidingText"
import StarEmpty from "../assets/icons/about/star_empty.svg"
import StarFull from "../assets/icons/about/star_full.svg";
import { graphql } from "gatsby"

const About = ({ data }) => {
    const profile = data?.profile?.childImageSharp?.fixed
    const [tooltipText, setTooltipText] = useState("")
    const [stars, setStars] = useState("")

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

    const setSoftwareExperience = (software) => {
        setTooltipText(software.name);
        setStars(getExperienceStars(software.stars));
        document.querySelector(".software-experience-container .software-name").style.opacity = 1;
        document.querySelector(".software-experience-container .software-stars").style.opacity = 1;
        document.querySelector(".software-experience-container .software-name").style.transform = 'translateX(0)';
        document.querySelector(".software-experience-container .software-stars").style.transform = 'translateX(0)';
    }

    const hideSoftwareExperience = () => {
        document.querySelector(".software-experience-container .software-name").style.opacity = 0;
        document.querySelector(".software-experience-container .software-stars").style.opacity = 0;
        document.querySelector(".software-experience-container .software-name").style.transform = 'translateX(-50%)';
        document.querySelector(".software-experience-container .software-stars").style.transform = 'translateX(-50%)';
    }

    const getExperienceStars = (experience) => {

        const emptyStars = 5 - experience;
        const itemElements = [];

        for (let i = 0; i < experience; i++) {
            itemElements.push(<StarFull key={`full-${i}`} className="full" />);
        }

        for (let i = 0; i < emptyStars; i++) {
            itemElements.push(<StarEmpty key={`empty-${i}`} className="empty" />);
        }

        return itemElements;
    }


    return (
        <Layout>
            <Seo title="About Me" />
            <div className="about-page">
                <div className="py-5">
                    <SlidingText text={"ABOUT ME ABOUT ME ABOUT ME"} />
                </div>
                <div className="container row bio">
                    <div className="col-lg-5 col-12 profile mx-auto">
                        <CallMeZe />
                        <Img fixed={profile} alt="José Vaz profile picture" />

                    </div>
                    <div className="col-lg-7 col-12 description mt-5 mt-lg-0">
                        <p>
                            I'm a Graphic Designer, Content Editor & Creator, with a strong background in the fashion industry. Based in Porto, Portugal, I possess a passion for creating visually compelling content and delivering impactful marketing materials.
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
                <div className="container row software-experience-container">
                    <div className="row col-8">
                        <div className="col-4 software-experience">
                            Software Experience
                        </div>
                        <div className="col-5 software-name">
                            {tooltipText}
                        </div>
                        <div className="col-3 software-stars">
                            {stars}
                        </div>
                    </div>
                </div>
                <div className="experience-group">
                    <div className="container software-experience-list">
                        {data.allSoftwareJson.nodes.map(software => (
                            <div 
                                role="presentation"
                                className="software-experience"
                                key={software.name}
                                onMouseOver={() => setSoftwareExperience(software)}
                                onFocus={() => setSoftwareExperience(software)}
                                onMouseOut={() => hideSoftwareExperience()}
                                onBlur={() => hideSoftwareExperience()}
                            >
                                <img src={software.icon} alt={software.name} />
                            </div>
                        ))}
                    </div>
                    <div className="sliding-text">
                        <SlidingText text={"EDUCATION AND PROFESSIONAL EXPERIENCE EDUCATION AND PROFESSIONAL EXPERIENCE"} />
                    </div>
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
    profile: file(relativePath: { eq: "about/profile.png" }) {
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
    },
    allSoftwareJson {
        nodes {
            name
            stars
            icon
        }
    }
  }
`

export default About

