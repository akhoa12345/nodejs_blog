module.exports = {
  multipleMongooseToObject: function (mongooseArray) {
    return mongooseArray.map((mongoose) => {
      return mongoose.toObject();
    });
  },

  mongooseToObject: function (mongoose) {
    return mongoose ? mongoose.toObject() : mongoose;
  },
};
