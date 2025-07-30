export interface Role {
  id: number;
  name: string;
  nameHebrew: string;
  description?: string;
  categoryId: number; //'management' | 'technical' | 'labor' | 'administrative';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RoleCatagory {
  id: number;
  name: string;
  nameHebrew: string;
  description?: string;
}
