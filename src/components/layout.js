import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/vars.scss"
import "../styles/layout.scss"

import React, { useEffect, useState } from "react"
import { graphql, useStaticQuery } from "gatsby"

import Footer from "./footer"
import Header from "./header"
import PropTypes from "prop-types"

const Layout = ({ children }) => {
  const [mode, setMode] = useState("light")
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const saveThemeMode = () => {
    const newMode = mode === "light" ? "dark" : "light"
    localStorage.setItem("themeMode", newMode);
    setMode(newMode);
  }

  useEffect(() => {
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const savedThemeMode = localStorage.getItem("themeMode")
    if (savedThemeMode !== undefined) {
      setMode(savedThemeMode)
    } else setMode(prefersDarkMode ? "dark" : "light");
  }, [])

  return (
    <div className={mode === "light" ? "light" : "dark"}>
      <Header
        siteTitle={data.site.siteMetadata.title}
        mode={mode}
        setMode={saveThemeMode}
      />
      <main>{children}</main>
      <Footer />
    </div>
  )
}


Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout