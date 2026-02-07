import React, { useState } from "react"

import { Link } from "gatsby"
import Logo from "../assets/icons/common/creative_vaz.svg"
import PropTypes from "prop-types"

const Header = () => {
  const [open, setOpen] = useState(false)

  const closeMenu = () => setOpen(false)
  const toggleMenu = () => setOpen((v) => !v)

  return (
    <nav className="navbar navbar-expand-md sticky-top">
      <div className="container">
        <div className="navbar-brand logo logo-svg">
          <Link to="/projetos" className="nav-link" onClick={closeMenu}>
            <Logo />
          </Link>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          aria-controls="mainNavbar"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={toggleMenu}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          id="mainNavbar"
          className={`collapse navbar-collapse ${open ? "show" : ""}`}
        >
          <div className="ms-auto d-flex gap-5 navbar-links">
            <Link to="/projetos" className="nav-link" onClick={closeMenu}>
              Projetos
            </Link>
            <Link to="/contacto" className="nav-link" onClick={closeMenu}>
              Contacto
            </Link>
            <Link to="/sobre" className="nav-link" onClick={closeMenu}>
              Sobre
            </Link>
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
