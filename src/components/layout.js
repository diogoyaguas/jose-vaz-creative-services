import "../styles/vars.scss"
import "../styles/layout.scss"

import React, { useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"

import Footer from "./footer"
import Header from "./header"
import PropTypes from "prop-types"
import { navigate } from "gatsby"

const STORAGE_KEY = "creative_vaz_auth"

const Layout = ({ children }) => {
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
    const authorized = localStorage.getItem(STORAGE_KEY)
    if (authorized !== "true") {
      navigate("/")
    }
  }, [])

  return (
    <div>
      <Header
        siteTitle={data.site.siteMetadata.title}
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