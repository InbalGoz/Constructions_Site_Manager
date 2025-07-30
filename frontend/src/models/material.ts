export interface Material {
  id: number;
  siteId: number;
  name: string;
  quantity: number;
  unitId: number;
  pricePerUnit?: number;
  totalPrice?: number;
  supplierId: number;
  deliveryDate: Date;
  statusId: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UnitCamelCase {
  unitId: number;
  unitName: string;
  unitSymbol?: string;
  unitNameHebrew?: string;
  description?: string;
}

export interface MaterialStatusCamelCase {
  statusId: number;
  statusName: string;
  statusNameHebrew?: string;
  description?: string;
}

export interface SupplierCamelCase {
  id: number;
  name: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  address?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
