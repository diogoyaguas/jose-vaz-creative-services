/**
 * @type {import("gatsby").GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: "José Vaz - Creative Services",
    siteUrl: "https://creativevaz.com",
    description: "Welcome to my personal website, where creativity comes to life through stunning visual experiences. As a talented Graphic Designer, I specialize in translating ideas into captivating designs that leave a lasting impression. Explore my portfolio and discover a collection of meticulously crafted logos, illustrations, branding projects, and more. With a keen eye for aesthetics and a deep understanding of design principles, I strive to create visually striking solutions that effectively communicate your brand's story. Let's collaborate and bring your design visions to reality.",
    author: "@sr.josevaz",
    keywords: ["José Vaz", "Creative Services", "Graphic Designer", "Portugal", "Feeting Room", "Dulis Shoes"],
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
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
        "icon": "src/assets/images/common/icon.png"
      }
    }, {
      resolve: "gatsby-source-filesystem",
      options: {
        "name": "images",
        "path": "./src/assets/images"
      },
      __key: "images"
    }, {
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
      resolve: "gatsby-source-filesystem",
      options: {
        name: "videos",
        path: "./src/assets/videos",
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        name: "icons",
        path: "./src/assets/icons",
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
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: ["webp", "auto"],
          quality: 100,
          backgroundColor: `transparent`,
          placeholder: `blurred`,
          breakpoints: [576, 768, 992, 1200],
        },
      },
    },
  ]
};