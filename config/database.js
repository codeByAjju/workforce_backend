// module.exports = {
//   development: {
//     host: process.env.DB_HOST,
//     username: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     dialect: 'mysql',
//   },
//   test: {
//     username: process.env.CI_DB_USERNAME,
//     password: process.env.CI_DB_PASSWORD,
//     database: process.env.CI_DB_NAME,
//     host: '127.0.0.1',
//     dialect: 'mysql',
//   },
//   staging: {
//     host: process.env.DB_HOST,
//     username: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     dialect: 'mysql',
//   },
//   production: {
//     host: process.env.DB_HOST,
//     username: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     dialect: 'mysql',
//   },
// };

import path from "path";
import dotenv from "dotenv";

dotenv.config();
export default {
  app: {
    siteName: process.env.SITE_NAME,
    siteEmail: "",
    mediaStorage: "local",
    mediaUploadSizeLimit: 1024 * 1024 * 15,
    baseUrl: process.env.BASE_URL,
    adminUrl: process.env.ADMIN_URL,
    resetUrl: process.env.RESET_URL,
    environment: process.env.NODE_ENV,
    languages: ["en", "hi"],
    setBaseUrl(url) {
      this.baseUrl = url;
    },
  },
  database: {
    mysql: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      db: process.env.DB_NAME,
      timezone: "+00:00",
    },
  },

  jwt: {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpireIn: process.env.JWT_EXPIRE_IN,
    encryption: {
      key: process.env.ENCRYPTION_KEY,
    },
  },
};
