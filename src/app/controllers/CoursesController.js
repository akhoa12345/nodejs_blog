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
    res.render("courses/create");
  }

  // [POST] /courses/store
  async store(req, res, next) {
    try {
      const formData = req.body;
      formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
      await Course.create(formData);

      // res.send("Gửi Form thành công")
      res.redirect("/");
    } catch (next) {
      console.log("Error: " + next);
    }
  }

  // [GET] /courses/:id/edit
  async edit(req, res, next) {
    try {
      const course = await Course.findById(req.params.id).exec();
      res.render("courses/edit", {
        course: mongooseToObject(course),
      });
    } catch (next) {
      console.log("Lỗi: ", next);
    }
  }

  // [PUT] /courses/:id
  async update(req, res, next) {
    try {
      Course.findByIdAndUpdate(req.params.id, req.body).exec();
      res.redirect("/me/stored/courses");
    } catch (next) {
      console.log("Lỗi: ", next);
    }
  }
}

module.exports = new CoursesController();
