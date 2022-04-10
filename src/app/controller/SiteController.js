const Course = require('../models/Course')
const {multipleMongooseToObject} = require('../../util/mongoose')

class SiteController {
    // [GET] /home
    index(req, res, next) {
        // res.json({name: 'test'})
        // Course.find({}, function (err, courses) {
        //     if (!err) {
        //         res.json(courses);
        //     } else {res.status(400).json({error: 'ERROR'})}
        // })

        //promise method
        Course.find({})
            .then(courses => res.render('home', {
                courses: multipleMongooseToObject(courses)
            }))
            .catch(next)
        // res.render('home')

    }

    // [GET] /search
    search(req, res) {
        res.render('search')
    }
}

module.exports = new SiteController

// const NewController = require('./NewController')