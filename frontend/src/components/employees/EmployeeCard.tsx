import { Card, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
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

interface EmployeeCardProps {
  employee: Employee;
  employeePayData: EmployeePaymentDetail;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

export function EmployeeCard({
  employee,
  employeePayData,
  onEdit,
  onDelete,
}: EmployeeCardProps) {
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

  const getPaymentInfo = () => {
    if (!employee.paymentTypeId) {
      return null;
    }

    if (employee.id === employeePayData.employeeId) {
      if (employee.paymentTypeId === 1) {
        //employee.hourlyRate) {
        return (
          <div className="text-sm">
            <span className="font-medium text-blue-600">שכר שעתי: </span>
            <span className="text-muted-foreground">
              {employeePayData.rate}₪/שעה
            </span>
          </div>
        );
      } else {
        return (
          <div className="text-sm">
            <span className="font-medium text-blue-600">שכר שעתי</span>
            <span className="text-muted-foreground"> - לא הוגדר</span>
          </div>
        );
      }
    } else if (employee.id === employeePayData.employeeId) {
      if (employee.paymentTypeId == 2) {
        //if (employee.dailyRate) {
        return (
          <div className="text-sm">
            <span className="font-medium text-green-600">שכר יומי: </span>
            <span className="text-muted-foreground">
              {employeePayData.rate}₪/יום
            </span>
          </div>
        );
      } else {
        return (
          <div className="text-sm">
            <span className="font-medium text-green-600">שכר יומי</span>
            <span className="text-muted-foreground"> - לא הוגדר</span>
          </div>
        );
      }
    }

    return null;
  };

  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="w-16 h-16 flex-shrink-0">
            <AvatarImage src={employee.imageUrl} alt={employee.name} />
            <AvatarFallback className="text-lg">
              {employee.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="text-lg font-medium truncate">
                  {employee.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {employee.roleId}
                </p>
              </div>
              {getStatusBadge(employee.siteStatusId)}
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>{employee.phone}</span>
              </div>
              {employee.visaNumber && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Shield className="w-4 h-4" />
                  <span className="truncate">ויזה: {employee.visaNumber}</span>
                </div>
              )}
              {getPaymentInfo()}
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
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
                  עבודה בגובה
                </Badge>
              )}
            </div>

            <div className="flex gap-2 mt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(employee)}
                className="p-2 rounded-lg hover:scale-105 transition-all duration-200"
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(employee)}
                className="p-2 rounded-lg text-destructive hover:text-destructive hover:scale-105 transition-all duration-200"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
