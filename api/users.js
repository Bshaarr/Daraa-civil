export default async function handler(req, res) {
  try {
    const dbUrl = process.env.DATABASE_URL;

    if (!dbUrl) {
      return res.status(200).json({
        status: "warning",
        message: "لم يتم العثور على DATABASE_URL في Vercel Environment Variables"
      });
    }

    const mysql = require('mysql2/promise');
    const connection = await mysql.createConnection(dbUrl);
    await connection.end();

    return res.status(200).json({
      status: "success",
      message: "تم الاتصال بقاعدة البيانات بنجاح!"
    });
  } catch (error) {
    return res.status(200).json({
      status: "error",
      error: error.message || String(error)
    });
  }
}
