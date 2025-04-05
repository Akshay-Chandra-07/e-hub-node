const dashboardController = require('../controllers/dashboard.controller')

const dashboardRouter = require('express').Router()

dashboardRouter.post('/books',dashboardController.getBooks)

module.exports = dashboardRouter