import { Site, SiteStatus } from "../entities/site";
import { DBService } from "./dbService";

const sqlBaseQuery = `SELECT
  si.id,
  si.name,
  si.location,
  si.status_id AS "statusId",
  si.start_date AS "startDate",
  si.end_date AS "endDate",
  si.description,
  si.image_url AS "imageUrl",
  si.budget,
  si.actual_cost AS "actualCost",
  si.manager,
  si.created_at AS "createdAt",
  si.updated_at AS "updatedAt",
  ss.status_name AS "statusName",
  ss.description AS "description"
  FROM sites si
  JOIN site_statuses ss ON si.status_id = ss.status_id`;

interface SiteFilters {
  status_id?: number;
  search?: string; // חיפוש לפי שם
  location?: string; // חיפוש לפי מיקום
}

export async function getAllSites(filters: SiteFilters): Promise<Site[]> {
  const conditions: string[] = [];
  const values: any[] = [];

  if (filters.status_id !== undefined) {
    values.push(filters.status_id);
    conditions.push(`s.status_id = $${values.length}`);
  }
  if (filters.location) {
    values.push(`%${filters.location}%`);
    conditions.push(`s.location ILIKE $${values.length}`);
  }
  if (filters.search) {
    values.push(`%${filters.search}%`);
    conditions.push(`s.name ILIKE $${values.length}`);
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
  const orderByClause = `
  ORDER BY 
    CASE ss.status_name 
      WHEN 'active' THEN 1 
      WHEN 'completed' THEN 2 
      ELSE 3 
    END,
    s.updated_at DESC
   `;

  const sqlQuery = sqlBaseQuery + whereClause + orderByClause;
  try {
    const result = await DBService.pool.query(sqlQuery, values); //ריצת השאילתה

    return result.rows as Site[]; //מחזיר את השורות כמערך של אתרים
  } catch (error: any) {
    console.error("DB Error:", error); // זה ידפיס את השגיאה האמיתית
    throw new Error("Failed to fetch sites");
  }
}

export async function getAllSite_Statuses(): Promise<SiteStatus[]> {
  const sqlQuery = `SELECT * FROM site_statuses`;
  try {
    const result = await DBService.pool.query(sqlQuery);

    return result.rows as SiteStatus[];
  } catch (error: any) {
    console.error("DB Error:", error);
    throw new Error("Failed to fetch site statuses");
  }
}

export async function getSiteById(id: string): Promise<Site> {
  const sqlQuery = sqlBaseQuery + `WHERE id = ($1)`;
  try {
    const result = await DBService.pool.query(sqlQuery, [id]); //הפרמטר ID נמצא במקום 1

    // מחזיר את השורה הראשונה,  null אם לא נמצא
    return (result.rows[0] as Site) || null;
  } catch (error: any) {
    throw new Error("Failed to fetch site by ID: " + error.message);
  }
}

export async function createSite(data: Site): Promise<Site> {
  const {
    name,
    location,
    statusId,
    startDate,
    endDate,
    description,
    imageUrl,
    budget,
    actualCost,
    manager,
  } = data;
  const sql = `
    INSERT INTO sites (name, location,status_id, start_date, end_date,description 
    ,image_url, budget, actual_cost, manager,created_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW())
    RETURNING 
      si.id,
      si.name,
      si.location,
      si.status_id AS "statusId",
      si.start_date AS "startDate",
      si.end_date AS "endDate",
      si.description,
      si.image_url AS "imageUrl",
      si.budget,
      si.actual_cost AS "actualCost",
      si.manager,
      si.created_at AS "createdAt",
      si.updatedAt AS "updatedAt"`;

  const values = [
    name,
    location,
    statusId,
    startDate,
    endDate,
    description,
    imageUrl,
    budget,
    actualCost,
    manager,
  ];

  try {
    const result = await DBService.pool.query(sql, values);
    return result.rows[0] as Site;
  } catch (error) {
    console.error("DB Error in createSite:", error);
    throw new Error("Failed to create site");
  }
}

export async function updateSite(id: string, data: Site): Promise<Site> {
  const {
    name,
    location,
    statusId,
    startDate,
    endDate,
    description,
    imageUrl,
    budget,
    actualCost,
    manager,
    updatedAt,
  } = data;

  const sql = `
      UPDATE sites
      SET name = $1, location = $2, status_id = $3, start_date = $4, end_date = $5, description = $6 
     ,image_url = $7, budget = $8, actual_cost = $9, manager = $10, updated_at = $11
      WHERE id = $12
      RETURNING id, name, address, image_url AS "imageUrl", description, is_finished AS "isFinished", created_at AS "createdAt"
    `;
  const values = [
    name,
    location,
    statusId,
    startDate,
    endDate,
    description,
    imageUrl,
    budget,
    actualCost,
    manager,
    updatedAt,
    id,
  ];
  try {
    const result = await DBService.pool.query(sql, values);
    return result.rows[0] as Site;
  } catch (error) {
    console.error("DB Error in updateSite:", error);
    throw new Error("Failed to update site");
  }
}

export async function deleteSite(id: string): Promise<Site> {
  const sql = `DELETE FROM sites WHERE id = $1 RETURNING id`;
  try {
    const result = await DBService.pool.query(sql, [id]);
    return result.rows[0] as Site;
  } catch (error) {
    console.error("DB Error in deleteSite:", error);
    throw new Error("Failed to delete site");
  }
}
