/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/vars.scss"
import "../styles/layout.scss"

import Header from "./header"
import Footer from "./footer"

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

  useEffect(() => {
      const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setMode(prefersDarkMode ? "dark" : "light" );
  }, [])

    return (
        <div className={mode === "light" ? "light" : "dark"}>
            <Header
                siteTitle={data.site.siteMetadata.title}
                mode={mode}
                setMode={setMode}
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