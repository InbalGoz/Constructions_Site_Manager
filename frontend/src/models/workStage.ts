export interface WorkStage {
  id: number;
  siteId: number;
  name: string;
  description?: string;
  statusId: number;
  startDate?: Date;
  endDate?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkStageStatus {
  statusId: number;
  statusName: string;
  statusNameHebrew?: string;
  description?: string;
}

export interface WorkStageWorker {
  workStageId: number;
  employeeId: string;
  assignedAt: string;
}
