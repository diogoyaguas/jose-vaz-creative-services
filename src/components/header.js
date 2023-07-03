import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "gatsby"
import Navigation from "./navigation"
import PropTypes from "prop-types"
import React from "react"
import Star from '../assets/icons/common/star.svg';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Header = ({ mode, setMode }) => {

	return (

		<nav className="navbar navbar-expand-lg sticky-top justify-content-between">
			<div className="header-container">
				<div className="navbar-brand logo">
					<Link to="/" title="Logo" className="logo-svg">
						<Star />
					</Link>
				</div>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
					<FontAwesomeIcon icon={faBars} size="lg" />
				</button>
				<div className="collapse navbar-collapse" id="navigation">
					<div className="navbar-nav w-100">
						<Navigation mode={mode} setMode={setMode} />
					</div>
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