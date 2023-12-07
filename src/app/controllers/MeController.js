const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class MeController {
  // [GET] /me/stored/courses
  async storedCourses(req, res, next) {
    try {
      const courses = await Course.find({});
      const deletedCount = await Course.countDocumentsWithDeleted({ deleted: true });
      res.render('me/stored-courses', {
        deletedCount,
        courses: multipleMongooseToObject(courses),
      });
    } catch (error) {
      next(error);
    }
  }

  // [GET] /me/trash/courses
  async trashCourses(req, res, next) {
    try {
      const courses = await Course.findWithDeleted({ deleted: true });
      res.render('me/trash-courses', {
        courses: multipleMongooseToObject(courses),
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MeController();
