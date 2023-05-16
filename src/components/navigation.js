import { Link } from "gatsby"
import React from "react"
import { useLocation } from '@reach/router';

const Navigation = () => {
    const location = useLocation();
    const currentPage = location.pathname;

    return (
        <div className="navigation row">
            <div className="col-md-4 col-sm-12 text-center">
                <Link to="/work">
                    <button type="button" className={`btn btn-primary ${currentPage.includes("work") ? "active" : ""}`}>
                        MY WORK
                    </button>
                </Link>
            </div>
            <div className="col-md-4 col-sm-12 text-center">
                <Link to="/about">
                    <button type="button" className={`btn btn-primary ${currentPage.includes("about") ? "active" : ""}`}>
                        ABOUT ME
                    </button>
                </Link>
            </div>
            <div className="col-md-4 col-sm-12 text-center">
                <Link to="/contact">
                    <button type="button" className={`btn btn-primary ${currentPage.includes("contact") ? "active" : ""}`}>
                        CONTACT
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Navigation