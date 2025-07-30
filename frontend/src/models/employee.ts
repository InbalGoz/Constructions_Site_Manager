export interface Employee {
  id: number;
  name: string;
  roleId: number;
  phone: string;
  email?: string;

  paymentTypeId: number;

  imageUrl?: string;
  address?: string;

  siteStatusId: number; //active-complete-- need to change this
  hasVisa: boolean;
  visaNumber: string;
  hasVehicle: boolean; //add db
  canWorkAtHeight: boolean; //add db

  notes: string;
  isActive: boolean;
  hireDate: Date; // או Date אם את ממירה
  createdAt: Date; // או Date
  updatedAt: Date; // או Date
}

export interface PaymentTypes {
  id: number;
  typeName: string;
  typeNameHeb: string;
  description: string | null;
}

export interface EmployeePaymentDetail {
  id: number;
  employeeId: number;
  paymentTypeId: number;
  rate: number;
  effectiveDate: Date; // או Date אם ממירים
  endDate?: Date; // אופציונלי
  createdAt: Date;
  updatedAt: Date;
}

export interface DocumentType {
  documentTypeId: number;
  typeName: string;
  typeNameHebrew?: string;
}

export interface EmployeeDocument {
  id: number;
  employeeId: number;
  documentTypeId: number;
  documentNumber?: string;
  issueDate?: Date;
  expirationDate?: Date;
  isValid: boolean;
  documentUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
