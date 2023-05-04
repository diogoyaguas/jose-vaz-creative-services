import * as React from "react"

import { Layout } from "../components/layout"
import { SEO } from "../components/seo"

const About = () => {
    return (
        <Layout>
            <SEO title="Work" />
            <section className="cv">
              
            </section>
        </Layout>
  )
}

export default About

export const Head = () => <title>About Me</title>
