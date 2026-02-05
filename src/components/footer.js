import React from "react"
import { StaticImage } from "gatsby-plugin-image"

const Footer = () => {
    const date = new Date();
    let year = date.getFullYear();

    return (<footer>
        <div className='container'>
            <div className="row">
                <div className="col-12">
                    @{year} - José Vaz All Rights Reserved
                </div>
            </div>
            <div className="row mt-3 align-items-end">
                <div className="col-6">
                    <a className='d-block p-0' href="mailto:zeoliveriavaz@gmail.com" target="_blank" rel="noreferrer">
                        zeoliveiravaz@gmail.com
                    </a>
                    <a className='d-block p-0' href="tel:+351910393289">
                        +351 910 393 289
                    </a>
                </div>
                <div className="col-6 d-flex gap-5 justify-content-end">
                    <a href="https://www.linkedin.com/in/jos%C3%A9-vaz-45144a1b9/" target="_blank" rel="noreferrer" title="Linkedin">
                        LinkedIn
                    </a>
                    <a href="/José-Vaz-CV.pdf" download>
                        Download CV
                    </a>
                </div>
            </div>
        </div>
    </footer >)
}

export default Footer