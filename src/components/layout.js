import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/vars.scss"
import "../styles/layout.scss"

import React, { useEffect, useState } from "react"
import { graphql, useStaticQuery } from "gatsby"

import Footer from "./footer"
import Header from "./header"
import PropTypes from "prop-types"
import Star from '../assets/icons/common/star.svg';

const Layout = ({ children }) => {
  const [mode, setMode] = useState("light")
  const [isMobile, setIsMobile] = useState(false);
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

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    const handleMediaQueryChange = (e) => {
      setIsMobile(e.matches);
    };

    // Initial check
    setIsMobile(mediaQuery.matches);

    // Listen for changes in the media query
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // Clean up the event listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  return (
    <div className={mode === "light" ? "light" : "dark"}>
      {!isMobile && <>
        <Header
          siteTitle={data.site.siteMetadata.title}
          mode={mode}
          setMode={saveThemeMode}
        />
        <main>{children}</main>
        <Footer />
      </>
      }
      {isMobile &&

        <div className="container under-construction">
          <h1 className="col-10 mx-auto text-center">
            Mobile Version Under Construction
          </h1>
          <Star />
        </div>}
    </div>
  )
}


Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout