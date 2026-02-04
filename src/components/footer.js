import React from "react"
import { StaticImage } from "gatsby-plugin-image"

const Footer = () => {
    const date = new Date();
    let year = date.getFullYear();

    return (<footer>
        <div className='container m-5'>
            <div className="row">
                <div className='col-6 p-0'>
                    <StaticImage src={"../assets/images/common/logo.png"} alt="Creative Vaz" />
                </div>
                <div className='col-1 p-0'></div>
                <div className='col-5 p-0'>
                    <div className="row h-100">
                        <div className='col-5 d-flex flex-column h-100 p-0'>
                            <div>
                                <a className='d-block p-0' href="mailto:zeoliveriavaz@gmail.com" target="_blank" rel="noreferrer">
                                    zeoliveiravaz@gmail.com
                                </a>
                                <a className='d-block p-0' href="tel:+351910393289">
                                    +351 910 393 289
                                </a>
                            </div>

                            <div className='mt-auto'>
                                @{year} - José Vaz
                            </div>
                        </div>
                        <div className='col-3 text-center p-0'>
                            <div className='col-12'>
                                <a href="https://www.linkedin.com/in/jos%C3%A9-vaz-45144a1b9/" target="_blank" rel="noreferrer" title="Linkedin">
                                    LinkedIn
                                </a>
                            </div>
                            <div className='col-12'>
                                <a href="https://www.behance.net/zeoliveira2936" target="_blank" rel="noreferrer" title="Behance">
                                    Behance
                                </a>
                            </div>
                        </div>
                        <div className='col-4 text-center p-0'>
                            <a href="/José-Vaz-CV.pdf" download>
                                download CV
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer >)
}

export default Footer