import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "gatsby"
import React from "react"
import { faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from '@reach/router';

const Navigation = ({mode, setMode}) => {
    const location = useLocation();
    const currentPage = location.pathname;

    return (
        <>
            <div className="navigation row w-100">
                <div className="col-md-4 col-12 text-center">
                    <Link to="/projects">
                        <button type="button" className={`btn btn-primary ${currentPage.includes("projects") ? "active" : ""}`}>
                            PROJECTS
                        </button>
                    </Link>
                </div>
                <div className="col-md-4 col-12 text-center">
                    <Link to="/about">
                        <button type="button" className={`btn btn-primary ${currentPage.includes("about") ? "active" : ""}`}>
                            ABOUT ME
                        </button>
                    </Link>
                </div>
                <div className="col-md-4 col-12 text-center">
                    <Link to="/contact">
                        <button type="button" className={`btn btn-primary ${currentPage.includes("contact") ? "active" : ""}`}>
                            CONTACT
                        </button>
                    </Link>
                </div>

            </div>
            <div className="theme-mode m-auto d-none d-lg-block">
                <span
                    role="button"
                    tabIndex="0"
                    onClick={() => setMode()}
                    onKeyDown={() => setMode()}
                    title={`Toggle ${mode === "light" ? "Dark" : "Light"} Mode`}
                >
                    <FontAwesomeIcon icon={faCircleHalfStroke} />
                </span>
            </div>
        </>
    )
}

export default Navigation