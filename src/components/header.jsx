import React, { useMemo, useState } from "react"

import { Link } from "gatsby"
import Logo from "../assets/icons/common/creative_vaz.svg"
import PropTypes from "prop-types"

const Header = ({ locale = "pt", otherPath }) => {
  const [open, setOpen] = useState(false)

  const closeMenu = () => setOpen(false)
  const toggleMenu = () => setOpen((v) => !v)

  const nav = useMemo(() => {
    if (locale === "en") {
      return {
        projects: "/en/projects",
        contact: "/en/contact",
        about: "/en/about",
        labelProjects: "Projects",
        labelContact: "Contact",
        labelAbout: "About",
        switchLabel: "EN",
      }
    }

    return {
      projects: "/projetos",
      contact: "/contacto",
      about: "/sobre",
      labelProjects: "Projetos",
      labelContact: "Contacto",
      labelAbout: "Sobre",
      switchLabel: "PT",
    }
  }, [locale])

  return (
    <nav className="navbar navbar-expand-md sticky-top">
      <div className="container">
        <div className="navbar-brand logo logo-svg">
          <Link to={nav.projects} className="nav-link" onClick={closeMenu} aria-label="Home">
            <Logo />
          </Link>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          aria-controls="mainNavbar"
          aria-expanded={open}
          aria-label={locale === "en" ? "Toggle navigation" : "Alternar navegação"}
          onClick={toggleMenu}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div id="mainNavbar" className={`collapse navbar-collapse ${open ? "show" : ""}`}>
          <div className="ms-auto d-flex align-items-center gap-5 navbar-links">
            <Link to={nav.projects} className="nav-link" onClick={closeMenu}>
              {nav.labelProjects}
            </Link>
            <Link to={nav.contact} className="nav-link" onClick={closeMenu}>
              {nav.labelContact}
            </Link>
            <Link to={nav.about} className="nav-link" onClick={closeMenu}>
              {nav.labelAbout}
            </Link>

            {otherPath ? (
              <Link
                to={otherPath}
                className="nav-link"
                onClick={closeMenu}
                aria-label={locale === "en" ? "PT" : "EN"}
              >
                {nav.switchLabel}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  )
}

Header.propTypes = {
  locale: PropTypes.oneOf(["pt", "en"]),
  otherPath: PropTypes.string,
}

Header.defaultProps = {
  locale: "pt",
  otherPath: null,
}

export default Header
