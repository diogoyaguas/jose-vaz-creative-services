import * as React from "react"

import { faBehance, faInstagram, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Layout from "../components/layout"
import Seo from "../components/seo"
import SlidingText from "../components/slidingText"

const Contact = () => {


    return (
        <Layout>
            <Seo title="Contact" />
            <div className="contact-page">
                <div className="pt-5">
                    <SlidingText text={"LET'S GET IN TOUCH LET'S GET IN TOUCH"} />
                </div>

                <div className="contact text-center container mx-auto">
                    <div className="row">
                        <div className="title col-lg-8 col-12 mx-auto">
                            Reach out and let's collaborate!
                        </div>
                    </div>
                    <div className="row">
                        <div className="social-media col-lg-8 col-12 mx-auto row mt-5">
                            <a className="col-lg-2 col-4" href="tel:+351910393289">
                                <FontAwesomeIcon icon={faPhone} size="lg" />
                            </a>
                            <a className="col-lg-2 col-4" href="mailto:zeoliveriavaz@gmail.com" target="_blank" rel="noreferrer">
                                <FontAwesomeIcon icon={faEnvelope} size="lg" />
                            </a>
                            <a className="col-lg-2 col-4" href="https://wa.me/00351910393289" target="_blank" rel="noreferrer">
                                <FontAwesomeIcon icon={faWhatsapp} size="lg" />
                            </a>
                            <a className="col-lg-2 col-4" href="https://www.instagram.com/sr.josevaz/" target="_blank" rel="noreferrer">
                                <FontAwesomeIcon icon={faInstagram} size="lg" />
                            </a>
                            <a className="col-lg-2 col-4" href="https://www.behance.net/zeoliveira2936" target="_blank" rel="noreferrer">
                                <FontAwesomeIcon icon={faBehance} size="lg" />
                            </a>
                            <a className="col-lg-2 col-4" href="https://www.linkedin.com/in/jos%C3%A9-vaz-45144a1b9/" target="_blank" rel="noreferrer">
                                <FontAwesomeIcon icon={faLinkedin} size="lg" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Contact
