const {resolve} = require('path');
const { createFilePath } = require('gatsby-source-filesystem')
const config = require('./data/siteConfig');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const BlogPostTemplate = resolve('./src/templates/blog-post.js')
  const BlogPostShareImage = resolve('./src/templates/blog-post-share-image.js')
  const PageTemplate = resolve('./src/templates/page.js')
  const TagTemplate = resolve('./src/templates/tag.js')
  const FormatTemplate = resolve('./src/templates/format.js')
  const ListPostsTemplate = resolve('./src/templates/blog-list-template.js')

  const allMarkdown = await graphql(
    `
      {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
          edges {
            node {
              frontmatter {
                title
                slug
                type
                tags
                post_format
              }
            }
          }
        }
      }
    `
  )

  if (allMarkdown.errors) {
    console.error(allMarkdown.errors)
    throw Error(allMarkdown.errors)
  }

  const markdownFiles = allMarkdown.data.allMarkdownRemark.edges

  const posts = markdownFiles
    //.filter(item => (item.node.frontmatter.type !== 'page' && item.node.frontmatter.type !== 'project'))
    .filter(item => !item.node.frontmatter.type)

  // const projects = markdownFiles
  //   .filter(item => item.node.frontmatter.type === 'project')
  
  // generate paginated post list
  const postsPerPage = config.postsPerPage;
  const nbPages = Math.ceil(posts.length / postsPerPage)

  Array.from({ length: nbPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/page/${i + 1}`,
      component: ListPostsTemplate,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        currentPage: i + 1,
        nbPages: nbPages,
      },
    })
  })

  // generate blog posts
  posts
    .forEach((post, index, posts) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node;
      const next = index === 0 ? null : posts[index - 1].node;

      const post_format = post.node.frontmatter.post_format || 'notes';

      createPage({
        path: post_format + '/' + post.node.frontmatter.slug,
        component: BlogPostTemplate,
        context: {
          slug: post.node.frontmatter.slug,
          previous,
          next,
        },
      })

      // generate post share images (dev only)
      if (process.env.gatsby_executing_command.includes('develop')) {
        createPage({
          path: `${post.node.frontmatter.slug}/image_tw`,
          component: BlogPostShareImage,
          context: {
            slug: post.node.frontmatter.slug,
            width: 440,
            height: 220,
            type: 'twitter',
          }
        })
        createPage({
          path: `${post.node.frontmatter.slug}/image_fb`,
          component: BlogPostShareImage,
          context: {
            slug: post.node.frontmatter.slug,
            width: 1200,
            height: 630,
            type: 'facebook',
          }
        })
      }

    })

  // generate pages
  markdownFiles
    .filter(item => item.node.frontmatter.type === 'page')
    .forEach(page => {
      createPage({
        path: page.node.frontmatter.slug,
        component: PageTemplate,
        context: {
          slug: page.node.frontmatter.slug,
        },
      })
    })

  // generate tags
  markdownFiles
    .filter(item => item.node.frontmatter.tags !== null)
    .reduce((acc, cur) => [...new Set([...acc, ...cur.node.frontmatter.tags])], [])
    .forEach(uniqTag => {
      createPage({
        path: `tags/${uniqTag}`,
        component: TagTemplate,
        context: {
          tag: uniqTag
        },
      })
    })

  // generate post formats page
  markdownFiles
    .filter(item => item.node.frontmatter.post_format !== null)
    .reduce((acc, cur) => [...new Set([cur.node.frontmatter.post_format])], [])
    .forEach(uniqFormat => {
      createPage({
        path: `${uniqFormat}`,
        component: FormatTemplate,
        context: {
          post_format: uniqFormat
        },
      })
    })
  
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
