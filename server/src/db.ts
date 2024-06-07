import mysql, { Pool } from 'mysql2/promise';
import dotenv from 'dotenv';


dotenv.config();

const pool: Pool = mysql.createPool({
  host: process.env.DB_HOST || 'charging-db.ctq2gqy0svm5.us-east-1.rds.amazonaws.com',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'charging',
  database: process.env.DB_NAME || 'charging_db'
});

export default pool;
