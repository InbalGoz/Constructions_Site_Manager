import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { EmployeesFilters } from "../components/employees/EmployeesFilters";
import { EmployeesList } from "../components/employees/EmployeesList";
import { AddEmployeeDialog } from "../components/employees/AddEmployeeDialog";
import { EditEmployeeDialog } from "../components/employees/EditEmployeeDialog";
import { DeleteEmployeeDialog } from "../components/employees/DeleteEmployeeDialog";
import PageHeader from "../components/PageHeader";
import type { Employee } from "../models/employee";

/*interface Employee {
  id: string;
  name: string;
  role: string;
  phone: string;
  status: 'active' | 'inactive';
  image?: string;
  hasVisa: boolean;
  visaNumber?: string;
  hasVehicle: boolean;
  canWorkAtHeight: boolean;
  notes?: string;
  paymentType?: 'hourly' | 'daily';
  hourlyRate?: number;
  dailyRate?: number;
}*/

export function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  useEffect(() => {
    const savedEmployees = localStorage.getItem("employees");
    if (savedEmployees) {
      try {
        const parsedEmployees = JSON.parse(savedEmployees);
        setEmployees(parsedEmployees);
      } catch (error) {
        console.error("Error parsing employees data:", error);
        setEmployees([]);
      }
    }
  }, []);

  const saveEmployees = (newEmployees: Employee[]) => {
    setEmployees(newEmployees);
    localStorage.setItem("employees", JSON.stringify(newEmployees));
  };

  const handleAddEmployee = (employeeData: any) => {
    const newEmployee: Employee = {
      ...employeeData,
      id: Date.now().toString(),
      // Ensure all required fields are set with defaults if not provided
      status: employeeData.status || "active",
      hasVisa: employeeData.hasVisa || false,
      hasVehicle: employeeData.hasVehicle || false,
      canWorkAtHeight: employeeData.canWorkAtHeight || false,
      paymentType: employeeData.paymentType || "hourly",
      hourlyRate: employeeData.hourlyRate || undefined,
      dailyRate: employeeData.dailyRate || undefined,
      image: employeeData.image || "",
      visaNumber: employeeData.hasVisa ? employeeData.visaNumber || "" : "",
      notes: employeeData.notes || "",
    };

    console.log("Adding new employee:", newEmployee); // Debug log

    const newEmployees = [...employees, newEmployee];
    saveEmployees(newEmployees);
    setAddDialogOpen(false);
  };

  const handleEditEmployee = (updatedEmployee: Employee) => {
    console.log("Updating employee:", updatedEmployee); // Debug log

    const newEmployees = employees.map((emp) =>
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    );
    saveEmployees(newEmployees);
    setEditDialogOpen(false);
    setSelectedEmployee(null);
  };

  const handleDeleteEmployee = () => {
    if (selectedEmployee) {
      const newEmployees = employees.filter(
        (emp) => emp.id !== selectedEmployee.id
      );
      saveEmployees(newEmployees);
      setDeleteDialogOpen(false);
      setSelectedEmployee(null);
    }
  };

  const openEditDialog = (employee: Employee) => {
    setSelectedEmployee(employee);
    setEditDialogOpen(true);
  };

  const openDeleteDialog = (employee: Employee) => {
    setSelectedEmployee(employee);
    setDeleteDialogOpen(true);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
  };

  // Filter employees based on search term and status
  /* const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });*/

  return (
    <div className="container max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
      <PageHeader
        title="ניהול עובדים"
        subtitle="רשימת כל העובדים הפעילים במערכת"
      >
        <Button
          onClick={() => setAddDialogOpen(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 px-4 py-2 sm:px-6 sm:py-3 text-base sm:text-lg rounded-lg"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          הוסף עובד חדש
        </Button>
      </PageHeader>

      <EmployeesFilters
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        onSearchChange={setSearchTerm}
        onStatusFilterChange={setStatusFilter}
        onClearFilters={clearFilters}
      />

      <EmployeesList
        employees={employees}
        //employees={filteredEmployees}
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        onEdit={openEditDialog}
        onDelete={openDeleteDialog}
        onClearFilters={clearFilters}
      />

      <AddEmployeeDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onAdd={handleAddEmployee}
      />

      {/* <EditEmployeeDialog 
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        employee={selectedEmployee}
        onEditEmployee={handleEditEmployee}
      />*/}

      {/* <DeleteEmployeeDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        employee={selectedEmployee}
        onDeleteEmployee={handleDeleteEmployee}
      />*/}
    </div>
  );
}
