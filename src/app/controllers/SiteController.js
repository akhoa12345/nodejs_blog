class SiteController {
  // [GET] /
  index(req, res) {
    res.render("home");
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
