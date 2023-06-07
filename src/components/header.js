import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "gatsby"
import Navigation from "./navigation"
import PropTypes from "prop-types"
import React from "react"
import Star from '../assets/icons/common/star.svg';
import { faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons';

const Header = ({ mode, setMode }) => {

	return (
		<nav className="navbar pt-4">
			<div className="row w-100 align-items-center">
				<div className="col-2 logo">
					<Link to="/">
						<Star />
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
						onKeyDown={() => setMode()}
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