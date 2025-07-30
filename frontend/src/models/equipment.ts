export interface Equipment {
  id: number;
  name: string;
  model?: string;
  manufacturer?: string;
  serialNumber?: string;

  categoryId: number;
  statusId: number;
  conditionId: number;

  currentLocation?: string;
  currentSiteId?: number;
  assignedTo?: string;

  purchaseDate: Date;
  purchasePrice?: number;
  currentValue?: number;

  imageUrl?: string;
  manualUrl?: string;
  warrantyExpirationDate?: Date;

  description?: string;
  notes?: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface EquipmentCategory {
  categoryId: number;
  categoryName: string;
  categoryNameHebrew?: string;
  description?: string;
}

export interface EquipmentStatus {
  statusId: number;
  statusName: string;
  statusNameHebrew?: string;
  description?: string;
}

export interface EquipmentCondition {
  conditionId: number;
  conditionName: string;
  conditionNameHebrew?: string;
  description?: string;
}

export interface EquipmentMaintenanceRecordHistory {
  id: number;
  equipmentId: number;
  maintenanceDate: Date;
  maintenanceType: string;
  cost: number;
  performedBy?: string;
  description?: string;
  nextDueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}
