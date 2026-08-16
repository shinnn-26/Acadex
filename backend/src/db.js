import pg from "pg"; import "dotenv/config";
export const pool=new pg.Pool({connectionString:process.env.DATABASE_URL});
export const q=(sql,params=[])=>pool.query(sql,params);