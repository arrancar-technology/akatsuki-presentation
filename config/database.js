// NOT USED currently...
module.exports = {
  development: {
    driver: "mongodb"
    , url:  "mongodb://localhost/test"
  },
  func01: {
    driver: "mongodb"
    , url:  process.env.MONGODB_URL
  },
  qa01: {
    driver: "mongodb"
    , url:  process.env.MONGODB_URL
  },
  demo01: {
    driver: "mongodb"
    , url:  process.env.MONGODB_URL
  },
  stage01: {
    driver: "mongodb"
    , url:  process.env.MONGODB_URL
  },
  prod01: {
    driver: "mongodb"
    , url:  process.env.MONGODB_URL
  }
};
