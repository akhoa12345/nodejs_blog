const Course = require("../models/Course");
const { multipleMongooseToObject } = require("../../util/mongoose");

class SiteController {
  // [GET] /
  async index(req, res, next) {
    try {
      const courses = await Course.find({});
      res.render("home", {
        courses: multipleMongooseToObject(courses),
      });
    } catch (error) {
      next(error);
    }
  }

  // [GET] /search
  search(req, res) {
    if (req.method === "GET") {
      // Handle GET request
      res.render("search");
    } else if (req.method === "POST") {
      // Handle POST request
      res.send("Đã gửi form thành công");
    }
  }
}

module.exports = new SiteController();
