// BUILD YOUR SERVER HERE
const express = require('express')
const Users = require('./users/model.js')

// creating instance of express app
const server = express()

// global middleware
server.use(express.json())

// Endpoints for MVP

// [GET] all users
server.get("/api/users", (req, res) => {
  Users.find()
    .then(users => {
      console.log(users)
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).json({ message: "The users information could not be retrieved" })
    })
})

// [GET] user object with specified id
server.get("/api/users/:id", ( req, res) => {
  const userID = req.params.id
  Users.findById(userID)
    .then(user => {
      if(!user) {
        res.status(404).json(`The user with the specified ID does not exist`)
      } else {
        res.json(user)
      }
    })
    .catch(err => {
      res.status(500).json({ message: "The user information could not be retrieved" })
    })
})

// [POST] creates user with info sent in req.body
server.post("/api/users", (req, res) => {
  const newUser = req.body
  if (!newUser.name || !newUser.bio) {
    res.status(400).json({ message: "Please provide name and bio for the user"})
  } else {
    Users.insert(newUser)
      .then(user => {
        res.status(201).json(user)
      })
      .catch(err => {
        res.status(500).json({ message: "There was an error while saving the user to the database"})
      })
  }
})

// [PUT] updates the user with the specified id
server.put("/api/users/:id", async (req, res) => {
  const { id } =req.params
  const changes = req.body

    try {
      if (!changes.name || !changes.bio) {
        res.status(400).json({ message: "Please provide name and bio for the user"})
      } else {
        const updatedUser = await Users.update(id, changes)
        if (!updatedUser) {
          res.status(404).json({ message: "The user with the specified ID does not exist"})
        } else {
          res.status(200).json(updatedUser)
        }
      }
    } catch (err) {
      res.status(500).json({ message: "The user information could not be modified"})
    }
})

// [DELETE] removed user with specified id
server.delete("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params
    const removedUser = await Users.remove(id)
    if(!removedUser){
      res.status(404).json("The user with the specified ID does not exist")
    } else {
      res.status(204).json(removedUser)
    }
  } catch(err) {
    res.status(500).json({ message: "The user could not be removed"})
  }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
