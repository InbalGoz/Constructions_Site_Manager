import { Card, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Phone, Edit, Trash2, Shield, Car } from "lucide-react";
import type { Employee, EmployeePaymentDetail } from "../../models/employee";

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

interface EmployeesTableProps {
  employees: Employee[];
  employeePayData: EmployeePaymentDetail;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

export function EmployeesTable({
  employees,
  employeePayData,
  onEdit,
  onDelete,
}: EmployeesTableProps) {
  const getStatusBadge = (statusId: number) => {
    switch (statusId) {
      case 1:
        return (
          <Badge className="bg-green-500 hover:bg-green-600 text-white border-green-500">
            פעיל
          </Badge>
        );
      case 3:
        return (
          <Badge className="bg-red-500 hover:bg-red-600 text-white border-red-500">
            לא פעיל
          </Badge>
        );
      default:
        return null;
    }
  };

  const getPaymentInfo = (employee: Employee) => {
    if (!employee.paymentTypeId) {
      return <span className="text-muted-foreground text-sm">לא הוגדר</span>;
    }

    if (employee.paymentTypeId === 1) {
      if (employee.paymentTypeId === 1) {
        return (
          <div className="text-sm">
            <div className="font-medium text-blue-600">שעתי</div>
            <div className="text-muted-foreground">
              {employeePayData.rate}₪/שעה
            </div>
          </div>
        );
      } else {
        return (
          <div className="text-sm">
            <div className="font-medium text-blue-600">שעתי</div>
            <div className="text-muted-foreground">לא הוגדר שכר</div>
          </div>
        );
      }
    } else if (employee.id === employeePayData.employeeId) {
      if (employee.paymentTypeId == 2)
        return (
          <div className="text-sm">
            <div className="font-medium text-green-600">יומי</div>
            <div className="text-muted-foreground">
              {employeePayData.rate}₪/יום
            </div>
          </div>
        );
    } else {
      return (
        <div className="text-sm">
          <div className="font-medium text-green-600">יומי</div>
          <div className="text-muted-foreground">לא הוגדר שכר</div>
        </div>
      );
    }

    return <span className="text-muted-foreground text-sm">לא הוגדר</span>;
  };

  return (
    <Card className="border-0 shadow-xl">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-200 hover:bg-gray-50/50">
              <TableHead className="text-base lg:text-lg py-6 text-right w-[80px] pr-6">
                תמונה
              </TableHead>
              <TableHead className="text-base lg:text-lg py-6 text-right w-[200px] pr-6">
                עובד
              </TableHead>
              <TableHead className="text-base lg:text-lg py-6 text-right w-[150px] pr-6">
                תפקיד
              </TableHead>
              <TableHead className="text-base lg:text-lg py-6 text-right w-[140px] pr-6">
                טלפון
              </TableHead>
              <TableHead className="text-base lg:text-lg py-6 text-right w-[100px] pr-6">
                סטטוס
              </TableHead>
              <TableHead className="text-base lg:text-lg py-6 text-right w-[120px] pr-6">
                שכר
              </TableHead>
              <TableHead className="text-base lg:text-lg py-6 text-right w-[150px] pr-6">
                פרטים נוספים
              </TableHead>
              <TableHead className="text-base lg:text-lg py-6 text-right w-[120px] pr-6">
                פעולות
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => (
              <TableRow
                key={employee.id}
                className="hover:bg-gray-50/50 border-gray-200"
              >
                <TableCell className="py-6 text-right w-[80px] pr-6">
                  <div className="flex justify-center">
                    <Avatar className="w-14 h-14 flex-shrink-0">
                      <AvatarImage
                        src={employee.imageUrl}
                        alt={employee.name}
                      />
                      <AvatarFallback className="text-lg">
                        {employee.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </TableCell>
                <TableCell className="py-6 text-right w-[200px] pr-6">
                  <div className="text-right">
                    <div className="font-medium text-base lg:text-lg">
                      {employee.name}
                    </div>
                    {employee.visaNumber && (
                      <div className="text-xs text-muted-foreground">
                        ויזה: {employee.visaNumber}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-base lg:text-lg py-6 text-right w-[150px] pr-6">
                  {employee.roleId}
                </TableCell>
                <TableCell className="py-6 text-right w-[140px] pr-6">
                  <div className="flex items-center gap-2 justify-start">
                    <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-base lg:text-lg">
                      {employee.phone}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-6 text-right w-[100px] pr-6">
                  <div className="flex justify-start">
                    {getStatusBadge(employee.siteStatusId)}
                  </div>
                </TableCell>
                <TableCell className="py-6 text-right w-[120px] pr-6">
                  <div className="flex justify-start">
                    {getPaymentInfo(employee)}
                  </div>
                </TableCell>
                <TableCell className="py-6 text-right w-[150px] pr-6">
                  <div className="flex flex-wrap gap-1 justify-start">
                    {employee.hasVehicle && (
                      <Badge variant="outline" className="text-xs">
                        <Car className="w-3 h-3 mr-1" />
                        רכב
                      </Badge>
                    )}
                    {employee.canWorkAtHeight && (
                      <Badge
                        variant="outline"
                        className="text-xs bg-orange-50 text-orange-700 border-orange-200"
                      >
                        גובה
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="py-6 text-right w-[120px] pr-6">
                  <div className="flex gap-2 justify-start">
                    <Button
                      variant="ghost"
                      size="sm"
                      title="עריכה"
                      onClick={() => onEdit(employee)}
                      className="p-2 rounded-lg hover:scale-105 transition-all duration-200"
                    >
                      <Edit className="w-5 h-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      title="מחיקה"
                      onClick={() => onDelete(employee)}
                      className="p-2 rounded-lg text-destructive hover:text-destructive hover:scale-105 transition-all duration-200"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
