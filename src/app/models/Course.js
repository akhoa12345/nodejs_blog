const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
const { AutoIncrementID, AutoIncrementIDOptions } = require(
  '@typegoose/auto-increment'
);

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CourseSchema = new Schema(
  {
    _id: { type: Number },
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    videoId: { type: String, required: true },
    slug: { type: String, slug: 'name', unique: true },
  },
  {
    timestamps: true,
  }
);

// Custom query helpers
CourseSchema.query.sortable = async function (req) {
  if (req.query.hasOwnProperty('_sort')) {
    const isValidType = ['asc', 'desc'].includes(req.query.type);
    return await this.sort({
      [req.query.column]: isValidType ? req.query.type : 'desc',
    });
  }

  return this;
};

// Add plugins
mongoose.plugin(slug);
CourseSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});
CourseSchema.plugin(AutoIncrementID, {});

module.exports = mongoose.model('Course', CourseSchema);
