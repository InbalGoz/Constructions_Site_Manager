export interface Site {
  id: string; // UUID in DB, usually represented as a string in JS/TS
  name: string;
  location: string;
  statusId: number; // SMALLINT in DB
  startDate: string; // DATE in DB, often handled as ISO string (YYYY-MM-DD)
  endDate: string | null; // DATE in DB, can be null
  description: string; // TEXT in DB, can be null
  imageUrl: string; // TEXT in DB, can be null
  budget: number | null; // DECIMAL in DB, often number in JS/TS
  actualCost: number; // DECIMAL in DB, often number in JS/TS
  manager: string | null; // VARCHAR in DB, can be null
  createdAt: Date; // TIMESTAMP WITH TIME ZONE, often ISO string
  updatedAt: Date; // TIMESTAMP WITH TIME ZONE, often ISO string
}

export interface SiteStatus {
  id: number;
  statusName: string;
  description: string;
}
