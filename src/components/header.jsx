import { Link } from "gatsby"
import Logo from "../assets/icons/common/creative_vaz.svg"
import PropTypes from "prop-types"
import React from "react"

const Header = () => {
	return (
		<nav className="navbar navbar-expand-lg sticky-top">
			<div className="container">

				<div className="navbar-brand logo logo-svg">
					<Link to="/projetos" className="nav-link">
						<Logo />
					</Link>
				</div>

				<div className="ms-auto d-flex gap-5">
					<Link to="/projetos" className="nav-link">
						Projetos
					</Link>
					<Link to="/contacto" className="nav-link">
						Contacto
					</Link>
					<Link to="/sobre" className="nav-link">
						Sobre
					</Link>
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
