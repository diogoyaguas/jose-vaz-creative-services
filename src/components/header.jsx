import React, { useMemo, useState } from "react"

import { Link } from "gatsby"
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
        labelProjects: "projects",
        labelContact: "contact",
        labelAbout: "about",
      }
    }

    return {
      projects: "/projetos",
      contact: "/contacto",
      about: "/sobre",
      labelProjects: "projetos",
      labelContact: "contacto",
      labelAbout: "sobre",
    }
  }, [locale])

  return (
    <nav className="navbar navbar-expand-md sticky-top">
      <div className="container">
        <div className="navbar-brand logo logo-svg">
          <Link to={nav.projects} className="nav-link" onClick={closeMenu} aria-label="Home">
            creative <span className="blue">vaz</span>
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
          <div className="ms-auto d-flex gap-5 navbar-links">
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
                className="nav-link language-switch"
                onClick={closeMenu}
                aria-label={locale === "en" ? "PT" : "EN"}
              >
                <span className={locale === "pt" ? "active" : ""}>pt</span>
                <span className="separator"> | </span>
                <span className={locale === "en" ? "active" : ""}>en</span>
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
