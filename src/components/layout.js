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

    if (window.innerWidth < 1024) setIsMobile(true);
    else setIsMobile(false);
  }, [])

  useEffect(() => {
    // Update screen size whenever the window is resized
    const handleResize = () => {
      if (window.innerWidth < 1024) setIsMobile(true);
      else setIsMobile(false);
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', handleResize);
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
      {isMobile && <>
        <div className="mobile-banner container d-flex align-items-center justify-content-center">
          <div className="row">
            <div className="col-12 text-center logo mb-3 p-0">
              <Star />
            </div>
            <div className="col-12 text-center title p-0">
              MOBILE SITE COMING SOON
            </div>
            <div className="col-12 text-center subtile p-0">
              AVAILABLE ON DESKTOP
            </div>
          </div>
        </div>
      </>}
    </div>
  )
}


Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout