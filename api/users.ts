import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const dbUrl = process.env.DATABASE_URL;
    
    if (!dbUrl) {
      return res.status(200).json({ 
        status: "warning", 
        message: "لم يتم العثور على DATABASE_URL في متغيرات بيئة Vercel! يرجى إضافته في Settings -> Environment Variables." 
      });
    }

    const mysql = require('mysql2/promise');
    const connection = await mysql.createConnection(dbUrl);
    await connection.end();

    return res.status(200).json({ 
      status: "success", 
      message: "تم الاتصال بقاعدة البيانات Aiven بنجاح تام!" 
    });

  } catch (error: any) {
    return res.status(200).json({ 
      status: "error", 
      error_details: error.message || String(error)
    });
  }
}
