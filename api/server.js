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
  Users.findAll()
    .then(users => {
      console.log(users)
    })
    .catch(err => {
      res.status(500).json({ message: err.message })
    })
})

// [GET] user object with specified id

// [POST] creates user with info sent in req.body

// [DELETE] removed user with specified id

// [PUT] updates the user with the specified id

module.exports = server; // EXPORT YOUR SERVER instead of {}
