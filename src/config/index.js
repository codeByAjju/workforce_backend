import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
export default {
  database: {
        mysql: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        db: process.env.DB_NAME,
        timezone: '+00:00',
        }
  },

  jwt: {
        jwtSecret: process.env.JWT_SECRET,
        jwtExpireIn: process.env.JWT_EXPIRE_IN,
        encryption: {
        key: process.env.ENCRYPTION_KEY,
  }
  }
  
}
