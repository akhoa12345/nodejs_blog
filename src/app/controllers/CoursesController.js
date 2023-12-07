const Course = require('../models/Course');
const {
  multipleMongooseToObject,
  mongooseToObject,
} = require('../../util/mongoose');

class CoursesController {
  // [GET] /courses/:slug
  async show(req, res, next) {
    try {
      const course = await Course.findOne({ slug: req.params.slug }).exec();
      res.render('courses/show', {
        course: mongooseToObject(course),
      });
    } catch (next) {
      console.log('Có lỗi');
    }
  }

  // [GET] /courses/create
  create(req, res, next) {
    res.render('courses/create');
  }

  // [POST] /courses/store
  async store(req, res, next) {
    try {
      const formData = req.body;
      formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
      await Course.create(formData);

      // res.send("Gửi Form thành công")
      res.redirect('/me/stored/courses');
    } catch (next) {
      console.log('Error: ' + next);
    }
  }

  // [GET] /courses/:id/edit
  async edit(req, res, next) {
    try {
      const course = await Course.findById(req.params.id).exec();
      res.render('courses/edit', {
        course: mongooseToObject(course),
      });
    } catch (next) {
      console.log('Lỗi: ', next);
    }
  }

  // [PUT] /courses/:id
  async update(req, res, next) {
    try {
      await Course.findByIdAndUpdate(req.params.id, req.body).exec();
      res.redirect('/me/stored/courses');
    } catch (next) {
      console.log('Lỗi: ', next);
    }
  }

  // [DELETE] /courses/:id
  async delete(req, res, next) {
    try {
      await Course.delete({ _id: req.params.id });
      res.redirect('back');
    } catch (next) {
      console.log('Lỗi: ', next);
    }
  }

  // [DELETE] /courses/:id/force
  async forceDelete(req, res, next) {
    try {
      await Course.findByIdAndDelete({ _id: req.params.id });
      res.redirect('back');
    } catch (next) {
      console.log('Lỗi: ', next);
    }
  }

  // [PATCH] /courses/:id/restore
  async restore(req, res, next) {
    try {
      await Course.restore({ _id: req.params.id });
      res.redirect('back');
    } catch (next) {
      console.log('Lỗi: ', next);
    }
  }

  // [POST] /courses/handle-form-actions
  async handleFormActions(req, res, next) {
    switch (req.body.action) {
      case 'delete':
        try {
          await Course.delete({ _id: {$in: req.body.courseIds} });
          res.redirect('back');
        } catch (next) {
          console.log('Lỗi: ', next);
        }
        break;
      default:
        res.json({ message: 'Action invalid!' });
    }
  }
}

module.exports = new CoursesController();
