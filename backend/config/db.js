const mongoose = require('mongoose');

const connectDB = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(process.env.MONGO_URI)
      .then(conn => {
        resolve(conn);
      })
      .catch(error => {
        reject(error);
      });
  });
};

module.exports = connectDB;
