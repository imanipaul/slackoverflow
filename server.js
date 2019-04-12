const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { User, Category, Thread, Comment } = require('./models/models.js')
const { Op } = require('sequelize')

const app = express()

app.use(bodyParser.json())
app.use(cors())

const Port = process.env.PORT || 1340

app.get('/', (req, res) => {
  res.send('This is the home page of the server')
})


app.get('/users', async (req, res) => {
  try {
    const allUsers = await User.findAll({ raw: true })
    res.json({ allUsers })
    console.log(JSON.stringify(allUsers, null, 2))
  }
  catch (e) {
    console.log(e.message)
  }
})

app.get('/users/:id', async (req, res) => {
  try {
    const id = req.params.id
    const user = await User.findByPk(id, { raw: true })
    if (!user) throw Error('User not found')
    res.json({ user })
  }
  catch (e) {
    console.log(e.message)
  }
})

app.get('/category', async (req, res) => {
  try {
    const allCategories = await Category.findAll({ raw: true })
    res.json({ allCategories })
  } catch (error) {
    console.log(error.message)

  }
})

app.get('/category/:id', async (req, res) => {
  try {
    const id = req.params.id
    const category = await Category.findByPk(id, { raw: true })
    if (!category) throw Error('Category not found')
    res.json({ category })
  }
  catch (e) {
    console.log(e.message)
  }
})

app.get('/thread', async (req, res) => {
  try {
    const allThreads = await Thread.findAll({ raw: true })
    res.json(allThreads)
  } catch (error) {
    console.log(error.message)

  }
})

app.get('/thread/:id', async (req, res) => {
  try {
    const id = req.params.id
    const thread = await Thread.findByPk(id, { raw: true })
    if (!thread) throw Error('Thread not found')
    res.json({ thread })
  }
  catch (e) {
    console.log(e.message)
  }
})

app.get('/comment', async (req, res) => {
  try {
    const allComments = await Comment.findAll({ raw: true })
    res.json(allComments)
  } catch (error) {
    console.log(error.message)
  }
})

app.get('/comment/:id', async (req, res) => {
  try {
    const id = req.params.id
    const comment = await Comment.findByPk(id, { raw: true })
    if (!comment) throw Error('User not found')
    res.json({ comment })
  }
  catch (e) {
    console.log(e.message)
  }
})

app.post('/users', async (req, res) => {
  console.log(req.body)
  try {
    const user = User.create(req.body)
    res.json(user)
  } catch (error) {
    console.log(error.message)

  }
})

app.post('/category', async (req, res) => {
  console.log(req.body)
  try {
    const category = Category.create(req.body)
    res.json(category)
  } catch (error) {
    console.log(error.message)
  }
})

app.post('/thread', async (req, res) => {
  console.log(req.body)
  try {
    const thread = Thread.create(req.body)
    res.json(thread)
  } catch (error) {
    console.log(error.message)
  }
})

app.post('/comment', async (req, res) => {
  console.log(req.body)
  try {
    const comment = Comment.create(req.body)
    res.json(comment)
  } catch (error) {
    console.log(error.message)
  }
})

app.put('/users/:id', async (req, res) => {
  try {
    const id = req.params.id
    const updateUser = {
      name: req.body.name,
      email: req.body.email,
      password_digest: req.body.password_digest
    };
    const user = await User.update(updateUser,
      {
        where: {
          id: id
        }
      })
    res.json(user)
  } catch (error) {
    console.log(error.message)
  }
})

app.put('/category/:id', async (req, res) => {
  try {
    const id = req.params.id
    const updateCategory = {
      name: req.body.name,
    };
    const category = await Category.update(updateCategory,
      {
        where: {
          id: id
        }
      })
    res.json(category)
  } catch (error) {
    console.log(error.message)
  }
})

app.put('/thread/:id', async (req, res) => {
  try {
    const id = req.params.id
    const updateThread = {
      title: req.body.title,
      content: req.body.content,
    };
    const thread = await Thread.update(updateThread,
      {
        where: {
          id: id
        }
      })
    res.json(thread)
  } catch (error) {
    console.log(error.message)
  }
})

app.put('/comment/:id', async (req, res) => {
  try {
    const id = req.params.id
    const updateComment = {
      content: req.body.content,
      userId: req.body.userId,
      threadId: req.body.threadId
    };
    const comment = await Comment.update(updateComment,
      {
        where: {
          id: id
        }
      })
    res.json(comment)
  } catch (error) {
    console.log(error.message)
  }
})

app.delete('/users/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.destroy({
      where: {
        id: id
      }
    })
    res.json(building);
  } catch (error) {
    console.log(error.message)
  }
})

app.delete('/category/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.destroy({
      where: {
        id: id
      }
    })
    res.json(category);
  } catch (error) {
    console.log(error.message)
  }
})

app.delete('/thread/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const thread = await Thread.destroy({
      where: {
        id: id
      }
    })
    res.json(thread);
  } catch (error) {
    console.log(error.message)
  }
})

app.delete('/comment/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const comment = await Comment.destroy({
      where: {
        id: id
      }
    })
    res.json(comment);
  } catch (error) {
    console.log(error.message)
  }
})

app.listen(Port, () => console.log(`Running on port ${Port}`))
