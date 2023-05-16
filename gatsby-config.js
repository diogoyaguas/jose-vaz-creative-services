/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Jose Vaz - Creative Services`,
    siteUrl: `https://www.yourdomain.tld`,
    description: `Personal Website`,
    author: `@sr.josevaz`,
    keywords: [`José Vaz`, `Creative Services`],
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    "gatsby-transformer-json",
    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp", {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: `José Vaz`,
        short_name: `José Vaz`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#000000`,
        display: `minimal-ui`,
        "icon": "src/images/icon.png"
      }
    }, {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "images",
        "path": `./src/images/`
      },
      __key: "images"
    }, {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "pages",
        "path": `./src/pages/`
      },
      __key: "pages"
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "data",
        path: `./src/data`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `videos`,
        path: `./src/videos`,
      },
    },
  ]
};