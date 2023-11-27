const Course = require("../models/Course");
const { multipleMongooseToObject, mongooseToObject } = require("../../util/mongoose");

class CoursesController {
  
    // [GET] /courses/:slug
    async show(req, res, next) {
        try {
            const course = await Course.findOne({ slug: req.params.slug }).exec();
            res.render('courses/show', { 
                course: mongooseToObject(course),
            });
        } catch (next) {
            console.log("Có lỗi");
        }
    }
  }
  
  module.exports = new CoursesController();
  