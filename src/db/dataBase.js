import pg from 'pg';

const { Pool } = pg;

// const connection = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

const connection = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '03111999',
  database: 'shortly_api',
});

export default connection