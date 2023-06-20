import { faBehance, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from "react"

const Footer = () => {
    const date = new Date();
    let year = date.getFullYear();

    return (<footer>
        <div className='container'>
            <div className="row">
                <div className="col-12 rights">
                    @{year} - José Vaz All Rights Reserved
                </div>
                <a className="col-12 pt-2" href="mailto:zeoliveriavaz@gmail.com" target="_blank" rel="noreferrer">
                    zeoliveiravaz@gmail.com
                </a>
                <a className="col-6" href="tel:+351910393289">
                    +351 910 393 289
                </a>
                <div className="col-6 social-media" >
                    <div>
                        <a href="https://www.linkedin.com/in/jos%C3%A9-vaz-45144a1b9/" target="_blank" rel="noreferrer">
                            <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                    </div>
                    <div>
                        <a href="https://www.behance.net/zeoliveira2936" target="_blank" rel="noreferrer">
                            <FontAwesomeIcon icon={faBehance} />
                        </a>
                    </div>
                    <div>
                        <a href="https://www.instagram.com/sr.josevaz/" target="_blank" rel="noreferrer">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </footer>)
}

export default Footer