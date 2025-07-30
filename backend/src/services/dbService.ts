import { Pool, PoolConfig } from "pg";
import configDev from "../../env/dev.json";
//'.'//"../../env/dev.json";

//הקוד יוצר חיבורים למסד הנתונים ומכין אותם לשימוש בכל שאר הקוד

//בניית אובייקט שכולל את כל השדות שפול צריך
const poolConfig: PoolConfig = {
  user: configDev.dbUser,
  host: configDev.dbHost,
  database: configDev.dbName,
  password: configDev.dbPassword,
  port: configDev.dbPort,
  //ssl: { rejectUnauthorized: false }, //מאפשר חיבור מוצפן בלי לבדוק תעודת שרת
  ssl: false,
};

//יצירת מחלקה עם מתודה שמבצעת אתחול לחיבור
export class DBService {
  static pool: Pool;

  // קוראים לזה פעם אחת בתחילת ההרצה
  static async init(): Promise<void> {
    try {
      this.pool = new Pool(poolConfig);
      console.log("Connected to PostgreSQL");
    } catch (error) {
      console.error("DB connection error:", error);
      throw error;
    }
  }
}
