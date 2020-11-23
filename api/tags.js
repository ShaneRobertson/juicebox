const express = require('express')
const tagsRouter = express.Router()
const {getAllTags, getPostsByTagName} = require('../db')

tagsRouter.use((req, res, next) => {
    console.log("A request has been made to /tags")

    next()
})

tagsRouter.get('/', async (req, res) => {
    const tags = await getAllTags()

    res.send({
        tags
    })
})

tagsRouter.get('/:tagName/posts', async (req, res, next) => {


    const { tagName } = req.params
    console.log(tagName)
    try {

      const requestedPosts = await getPostsByTagName(tagName)
      console.log(requestedPosts)

      const posts = requestedPosts.filter(post => {
        return post.active || (req.user && post.author.id === req.user.id);
      });

      res.send({post: posts})

    } catch ({ name, message }) {

      next({name: "Error from get /:tagname", message: message})
    }
  });



module.exports = tagsRouter