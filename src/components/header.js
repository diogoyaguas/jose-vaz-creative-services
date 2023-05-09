import PropTypes from "prop-types"
import React from "react"

import { Link } from "gatsby"
import { faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Header = ({ mode, setMode }) => {
	return (
		<nav className="navbar py-4">
			<div className="row w-100">
				<div className="col-4">
				</div>
				<div className="col-4 text-center">
					<Link to="/">
						<span>JOSE VAZ - CREATIVE SERVICES</span>
					</Link>
				</div>
				<div className="col-4 theme-mode">
					<span
						role="button"
						tabIndex="0"
						onClick={() => setMode(mode === "light" ? "dark" : "light")}
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