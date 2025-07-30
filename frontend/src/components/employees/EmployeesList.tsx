import { User } from "lucide-react";
import { Button } from "../../ui/button";
import { EmployeeCard } from "./EmployeeCard";
import { EmployeesTable } from "./EmployeesTable";
import type { Employee } from "../../models/employee";

/*interface Employee {
  id: string;
  name: string;
  role: string;
  phone: string;
  status: "active" | "inactive";
  image?: string;
  visaNumber?: string;
  visaExpiry?: string;
  hasVehicle: boolean;
  canWorkAtHeight: boolean;
  notes?: string;
  paymentType?: "hourly" | "daily";
  hourlyRate?: number;
  dailyRate?: number;
}*/

interface EmployeesListProps {
  employees: Employee[];
  searchTerm: string;
  statusFilter: string;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
  onClearFilters: () => void;
}

export function EmployeesList({
  employees,
  searchTerm,
  statusFilter,
  onEdit,
  onDelete,
  onClearFilters,
}: EmployeesListProps) {
  if (employees.length === 0) {
    return (
      <div className="text-center py-12 sm:py-16 lg:py-20">
        <div className="mx-auto w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-gray-100 rounded-3xl flex items-center justify-center mb-6 sm:mb-8">
          <User className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-muted-foreground" />
        </div>
        <h3 className="text-xl sm:text-2xl lg:text-3xl mb-3 sm:mb-4">
          לא נמצאו עובדים
        </h3>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-md mx-auto">
          {searchTerm || statusFilter !== "all"
            ? "לא נמצאו עובדים התואמים לחיפוש או לסינון הנוכחי"
            : "עדיין לא נוספו עובדים למערכת"}
        </p>
        {(searchTerm || statusFilter !== "all") && (
          <Button
            variant="outline"
            onClick={onClearFilters}
            className="text-base sm:text-lg h-12 sm:h-14 px-6 sm:px-8 rounded-xl hover:scale-105 transition-all duration-200"
          >
            נקה חיפוש וסינון
          </Button>
        )}
      </div>
    );
  }

  return (
    <>
      {/* Mobile Cards */}
      <div className="sm:hidden space-y-4">
        {employees.map((employee) => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
            employeePayData={{
              id: 1,
              employeeId: 1,
              paymentTypeId: 1,
              rate: 50,
              effectiveDate: new Date(),
              endDate: new Date(),
              createdAt: new Date(),
              updatedAt: new Date(),
            }}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden sm:block">
        <EmployeesTable
          employees={employees}
          employeePayData={{
            id: 1,
            employeeId: 1,
            paymentTypeId: 1,
            rate: 50,
            effectiveDate: new Date(),
            endDate: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
          }}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </>
  );
}
