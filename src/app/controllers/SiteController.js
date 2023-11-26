const Course = require("../models/Course");

class SiteController {
  // [GET] /
  async index(req, res) {
    try {
      const courses = await Course.find({});
      res.json(courses);
    } catch (error) {
      res.status(400).json({ error: "Có lỗi" });
    }
    // res.render("home");
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
