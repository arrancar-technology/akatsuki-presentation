var config = {
  development: {
    database: {
      url:  "localhost:27017/test"
    }
  },
  func01: {
    database: {
      url:  process.env.MONGODB_URL
    }
  },
  qa01: {
    database: {
      url:  process.env.MONGODB_URL
    }
  },
  demo01: {
    database: {
      url:  process.env.MONGODB_URL
    }
  },
  stage01: {
    database: {
      url:  process.env.MONGODB_URL
    }
  },
  prod01: {
    database: {
      url:  process.env.MONGODB_URL
    }
  }
};

module.exports = config;
