import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "gatsby"
import Navigation from "./navigation"
import PropTypes from "prop-types"
import React from "react"
import { faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons';

const Header = ({ mode, setMode }) => {

	return (
		<nav className="navbar pt-4">
			<div className="row w-100 align-items-center">
				<div className="col-2 logo">
					<Link to="/">
						<svg width="50" height="48" viewBox="0 0 122 116" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M62.4954 3.40358L66.2136 50.9997C66.4291 53.7594 69.0616 55.6721 71.7529 55.0243L118.168 43.8524C119.967 43.4195 120.802 45.99 119.093 46.6969L74.9751 64.9411C72.4171 65.9989 71.4115 69.0936 72.8592 71.453L97.8275 112.145C98.795 113.721 96.6084 115.31 95.4079 113.903L64.4235 77.5819C62.627 75.476 59.373 75.476 57.5765 77.5819L26.5922 113.903C25.3915 115.31 23.205 113.721 24.1725 112.145L49.1408 71.453C50.5885 69.0936 49.583 65.9989 47.0249 64.9411L2.90727 46.6969C1.19777 45.99 2.03305 43.4195 3.83149 43.8524L50.2471 55.0243C52.9383 55.6721 55.5709 53.7594 55.7864 50.9997L59.5046 3.4036C59.6486 1.55929 62.3514 1.55941 62.4954 3.40358Z" stroke="black" strokeWidth="3" />
						</svg>
					</Link>
				</div>
				<div className="col-8 text-center">
					<Navigation />
				</div>
				<div className="col-2 theme-mode">
					<span
						role="button"
						tabIndex="0"
						onClick={() => setMode()}
						title={`Toggle ${mode === "light" ? "Dark" : "Light"} Mode`}
					>
						<FontAwesomeIcon icon={faCircleHalfStroke} />
					</span>
				</div>
			</div>

		</nav>
	)
}

Header.propTypes = {
	siteTitle: PropTypes.string,
}

Header.defaultProps = {
	siteTitle: ``,
}

export default Header