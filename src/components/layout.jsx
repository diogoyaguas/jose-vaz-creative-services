import React, { useEffect } from "react"
import { graphql, navigate, useStaticQuery } from "gatsby"

import Footer from "./footer"
import Header from "./header"
import PropTypes from "prop-types"

const STORAGE_KEY = "creative_vaz_auth"

const NETLIFY_CONTEXT =
  typeof process !== "undefined" ? process.env.GATSBY_NETLIFY_CONTEXT : undefined

const isProdNetlify = NETLIFY_CONTEXT === "production"
const isDevMode = !isProdNetlify

const Layout = ({ children, locale = "pt", other, otherPath }) => {
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
    const run = async () => {
      if (isDevMode) {
        const authorized = localStorage.getItem(STORAGE_KEY)
        if (authorized !== "true") navigate("/")
        return
      }

      try {
        const res = await fetch("/.netlify/functions/verify", { method: "GET" })
        if (!res.ok) navigate("/")
      } catch {
        navigate("/")
      }
    }

    run()
  }, [])

  const otherFromProject =
    other?.locale === "en"
      ? `/en/projects/${other.slug}`
      : other?.locale === "pt"
        ? `/projetos/${other.slug}`
        : null

  const switchPath = otherPath || otherFromProject || null

  return (
    <div>
      <Header
        siteTitle={data.site.siteMetadata.title}
        locale={locale}
        otherPath={switchPath}
      />

      <main>{children}</main>

      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  locale: PropTypes.oneOf(["pt", "en"]),
  otherPath: PropTypes.string,
  other: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    locale: PropTypes.oneOf(["pt", "en"]).isRequired,
  }),
}

Layout.defaultProps = {
  locale: "pt",
  otherPath: null,
  other: null,
}

export default Layout
