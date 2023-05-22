import * as React from "react"

import { faBehance, faInstagram, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Layout from "../components/layout"
import Seo from "../components/seo"
import SlidingText from "../components/slidingText"

const Projects = () => {
    return (
        <Layout>
            <Seo title="Projects" />
            <div className="projects-page">
                <div className="social-media text-center row">
                    <div >
                        <SlidingText text={"SOCIAL MEDIA SOCIAL MEDIA"} />
                    </div>
                    <div className="projects row mt-5">
                        <div className="col-3">
                        </div>
                    </div>
                </div>

                <div className="graphic-design text-center row">
                    <div >
                        <SlidingText text={"GRAPHIC DESIGN GRAPHIC DESIGN"} />
                    </div>
                    <div className="projects row mt-5">
                        <div className="col-3">
                        </div>
                    </div>
                </div>

                <div className="editorial-design text-center row">
                    <div >
                        <SlidingText text={"EDITORIAL DESIGN EDITORIAL DESIGN"} />
                    </div>
                    <div className="projects row mt-5">
                        <div className="col-3">
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Projects
