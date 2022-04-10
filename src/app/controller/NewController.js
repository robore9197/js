const res = require("express/lib/response")

class NewController {
    // [GET] /news
    index(req, res) {
        res.render('news')

    }

    // [GET] /news/:slug
    show(req, res) {
        res.send(['New Detail?'])
    }
}

module.exports = new NewController

// const NewController = require('./NewController')