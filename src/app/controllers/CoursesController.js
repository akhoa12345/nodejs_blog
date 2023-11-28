const Course = require("../models/Course");
const {
  multipleMongooseToObject,
  mongooseToObject,
} = require("../../util/mongoose");

class CoursesController {
  // [GET] /courses/:slug
  async show(req, res, next) {
    try {
      const course = await Course.findOne({ slug: req.params.slug }).exec();
      res.render("courses/show", {
        course: mongooseToObject(course),
      });
    } catch (next) {
      console.log("Có lỗi");
    }
  }

  // [GET] /courses/create
  create(req, res, next) {
    res.render("courses/create")
  }

  // [POST] /courses/store
  async store(req, res, next) {
    try {
        const formData = req.body
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`
        await Course.create(formData);

        // res.send("Gửi Form thành công")
        res.redirect('/')
    } catch (next) {
        console.log("Error: " + next);
    }
  }
}

module.exports = new CoursesController();
