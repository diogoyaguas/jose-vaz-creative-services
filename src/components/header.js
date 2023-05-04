import PropTypes from "prop-types"
import React from "react"

const Header = ({ mode, setMode }) => {
	return (
		<nav class="navbar">
			<div className="row w-100">
				<div className="col-4">
				</div>
				<div className="col-4 text-center">
					<span>JOSE VAZ - CREATIVE SERVICES</span>
				</div>
				<div className="col-4 text-right">
					<span
						onClick={() => setMode(mode == "light" ? "dark" : "light")}
						title={`Toggle ${mode === "light" ? "Dark" : "Light"} Mode`}
					>	
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