import type { VercelRequest, VercelResponse } from '@vercel/node';
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
      return res.status(500).json({ error: "DATABASE_URL environment variable is missing" });
    }

    const connection = mysql.createPool({
      uri: connectionString,
      ssl: {
        rejectUnauthorized: false
      }
    });

    const db = drizzle(connection);

    return res.status(200).json({ 
      status: "success", 
      message: "تم الاتصال بقاعدة البيانات بنجاح عبر Vercel Serverless!" 
    });

  } catch (error: any) {
    return res.status(500).json({ 
      status: "error", 
      message: error.message || "حدث خطأ أثناء الاتصال بقاعدة البيانات" 
    });
  }
}
