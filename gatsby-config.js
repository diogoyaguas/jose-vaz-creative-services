/**
 * @type {import("gatsby").GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: "Creative Vaz",
    siteUrl: "https://creativevaz.com",
    description:
      "Portefólio de José Vaz, designer gráfico e criativo em Portugal. Projetos de branding, campanhas, social media, conteúdo digital e direção criativa.",
    author: "@sr.josevaz",
    keywords: [
      "José Vaz",
      "Creative Vaz",
      "Designer Gráfico",
      "Direção Criativa",
      "Branding",
      "Campanhas",
      "Social Media",
      "Conteúdo Digital",
      "Design Portugal",
    ],
    defaultImage: "/og/default.png",
  },

  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-plugin-sass",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-mdx",
    "gatsby-transformer-sharp", {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "José Vaz",
        short_name: "José Vaz",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#000000",
        display: "minimal-ui",
        "icon": "static/assets/icons/logo.svg"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        "name": "pages",
        "path": "./src/pages/"
      },
      __key: "pages"
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "projects",
        path: "./src/data/projects",
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        name: "icons",
        path: "./static/assets/icons",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/static/assets`
      },
    },
    {
      resolve: "gatsby-transformer-json",
      options: {
        typeName: ({ node }) => {
          if (node.sourceInstanceName === "projects") return "Project"
          return "Data"
        },
      },
    },
  ]
};