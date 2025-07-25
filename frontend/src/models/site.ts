export interface Site {
  id: number; // UUID in DB, usually represented as a string in JS/TS
  name: string;
  location: string;
  statusId: number; // SMALLINT in DB
  startDate: string; // DATE in DB, often handled as ISO string (YYYY-MM-DD)
  endDate: string | null; // DATE in DB, can be null
  description: string | null; // TEXT in DB, can be null
  imageUrl: string | null; // TEXT in DB, can be null
  budget: number | null; // DECIMAL in DB, often number in JS/TS
  actualCost: number; // DECIMAL in DB, often number in JS/TS
  manager: string | null; // VARCHAR in DB, can be null
  createdAt: string; // TIMESTAMP WITH TIME ZONE, often ISO string
  updatedAt: string; // TIMESTAMP WITH TIME ZONE, often ISO string
}
