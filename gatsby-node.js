const path = require("path")

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type Project implements Node @dontInfer {
      slug: String!
      index: Int!
      seoTitle: String
      title: String!
      date: String
      banner: ProjectMediaItem
      categories: [String!]!
      smallDescription: String!
      description: String!
      cardMedia: ProjectMediaItem!
      content: [ProjectSection!]!
    }

    type ProjectSection @dontInfer {
      type: String!         # "gallery" | "organicTabs" | "hoverVideo" | "tabbedImage"
      title: String
      subtitle: String

      items: [ProjectMediaItem!]
      tabs: [ProjectTab!]
      imageTabs: [ProjectImageTab!]
    }

     type ProjectTab @dontInfer {
      title: String
      items: [ProjectMediaItem!]!
    }

    type ProjectImageTab @dontInfer {
      label: String!
      img: String!
      alt: String
    }

    type ProjectMediaItem @dontInfer {
      img: String
      video: String
    }
  `)
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allProject(sort: { index: ASC }) {
        nodes {
          slug
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(result.errors)
    return
  }

  const template = path.resolve("src/templates/project.jsx")

  result.data.allProject.nodes.forEach((p) => {
    console.log("Creating page for:", p.slug)

    createPage({
      path: `/projetos/${p.slug}`,
      component: template,
      context: { slug: p.slug },
    })
  })
}
