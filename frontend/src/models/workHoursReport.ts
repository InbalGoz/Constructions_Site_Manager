export interface WorkHoursReportCamelCase {
  id: number;
  employeeId: number;
  siteId: number;

  workDate: Date;
  startTime?: string; //check
  endTime?: string;
  totalHours?: number;

  workTypeId: number;
  paymentTypeId: number;
  finalizedWage?: number;

  statusId: number;
  approvedBy?: string;
  approvedAt?: Date;

  notes?: string;
  workMonth: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkType {
  workTypeId: number;
  typeName: string;
  typeNameHebrew?: string;
  description?: string;
}

export interface ReportStatus {
  statusId: number;
  statusName: string;
  statusNameHebrew?: string;
  description?: string;
}
