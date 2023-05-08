import PropTypes from "prop-types"
import React from "react"

import { Link } from "gatsby"

const Header = ({ mode, setMode }) => {
	return (
		<nav className="navbar">
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
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M448 256c0-106-86-192-192-192V448c106 0 192-86 192-192zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" /></svg>
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