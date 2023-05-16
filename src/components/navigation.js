import { Link } from "gatsby"
import React from "react"

const Navigation = () => (
    <div className="navigation row">
        <div className="col-md-4 col-sm-12 text-center">
            <button type="button" className="btn btn-primary">
                MY WORK
            </button>
        </div>
        <div className="col-md-4 col-sm-12 text-center">
            <Link to="/about">
                <button type="button" className="btn btn-primary">
                    ABOUT ME
                </button>
            </Link>
        </div>
        <div className="col-md-4 col-sm-12 text-center">
            <button type="button" className="btn btn-primary">
                CONTACT
            </button>
        </div>
    </div>
)

export default Navigation