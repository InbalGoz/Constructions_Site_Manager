import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Switch } from "../../ui/switch";
import { Separator } from "../../ui/separator";
import { Upload, X, User, Shield, Car, Calculator } from "lucide-react";
import { toast } from "sonner";
import type { Employee } from "../../models/employee";

/*interface Employee {
  id: string;
  name: string;
  role: string;
  phone: string;
  status: 'active' | 'inactive';
  image?: string;
  hasVisa: boolean;
  visaNumber?: string; // מספר ויזה במקום תוקף ויזה
  hasVehicle: boolean;
  canWorkAtHeight: boolean;
  notes?: string;
  paymentType?: 'hourly' | 'daily';
  hourlyRate?: number;
  dailyRate?: number;
}*/

interface EditEmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee: Employee | null;
  onEditEmployee: (updatedEmployee: Employee) => void;
}

export function EditEmployeeDialog({
  open,
  onOpenChange,
  employee,
  onEditEmployee,
}: EditEmployeeDialogProps) {
  const [editEmployee, setEditEmployee] = useState({
    name: "",
    roleId: 0,
    roleName: "",
    phone: "",
    siteStatusId: 0,
    image: "",
    hasVisa: false,
    visaNumber: "", // מספר ויזה במקום תוקף ויזה
    hasVehicle: false,
    canWorkAtHeight: false,
    notes: "",
    paymentTypeId: 0,
    // hourlyRate: undefined as number | undefined,
    // dailyRate: undefined as number | undefined,
  });
  const [editImagePreview, setEditImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update form when employee changes
  useEffect(() => {
    if (employee) {
      setEditEmployee({
        name: employee.name,
        roleId: employee.roleId,
        roleName: employee.roleName,
        phone: employee.phone,
        siteStatusId: employee.siteStatusId,
        image: employee.imageUrl || "",
        hasVisa: employee.hasVisa || false,
        visaNumber: employee.visaNumber || "", // מספר ויזה
        hasVehicle: employee.hasVehicle,
        canWorkAtHeight: employee.canWorkAtHeight,
        notes: employee.notes || "",
        paymentTypeId: employee.paymentTypeId,
        //hourlyRate: employee.hourlyRate,
        //dailyRate: employee.dailyRate,
      });
      setEditImagePreview(employee.imageUrl || null);
    }
  }, [employee]);

  const handleEditImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setEditImagePreview(result);
        setEditEmployee({ ...editEmployee, image: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeEditImage = () => {
    setEditImagePreview(null);
    setEditEmployee({ ...editEmployee, image: "" });
  };

  const handleSubmit = async () => {
    if (
      !employee ||
      !editEmployee.name ||
      !editEmployee.roleId ||
      !editEmployee.phone
    ) {
      toast.error("שגיאת קלט", {
        description: "אנא מלא את כל השדות הנדרשים",
        duration: 3000,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const updatedEmployee = {
        ...employee,
        ...editEmployee,
      };

      onEditEmployee(updatedEmployee);

      toast.success("הצלחה", {
        description: "העובד עודכן בהצלחה",
        duration: 3000,
      });

      onOpenChange(false);
    } catch (error) {
      toast.error("שגיאה", {
        description: "אירעה שגיאה בעדכון העובד",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader className="text-center pb-4">
          <DialogTitle className="text-xl lg:text-2xl text-center">
            עריכת עובד
          </DialogTitle>
          <DialogDescription className="text-base text-center">
            עדכן את פרטי העובד
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-2">
          {/* פרטים אישיים */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-medium">פרטים אישיים</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name" className="text-base">
                  שם מלא *
                </Label>
                <Input
                  id="edit-name"
                  value={editEmployee.name}
                  onChange={(e) =>
                    setEditEmployee({ ...editEmployee, name: e.target.value })
                  }
                  placeholder="הכנס שם מלא"
                  className="h-11 text-base rounded-lg"
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-role" className="text-base">
                  תפקיד *
                </Label>
                <Select
                  value={editEmployee.roleName}
                  onValueChange={(value) =>
                    setEditEmployee({ ...editEmployee, roleName: value })
                  }
                  disabled={isSubmitting}
                >
                  <SelectTrigger className="h-11 text-base rounded-lg">
                    <SelectValue placeholder="בחר תפקיד" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="מנהל פרויקט">מנהל פרויקט</SelectItem>
                    <SelectItem value="מנהל אתר">מנהל אתר</SelectItem>
                    <SelectItem value="מהנדס">מהנדס</SelectItem>
                    <SelectItem value="עובד בנייה">עובד בנייה</SelectItem>
                    <SelectItem value="חשמלאי">חשמלאי</SelectItem>
                    <SelectItem value="אינסטלטור">אינסטלטור</SelectItem>
                    <SelectItem value="צבע">צבע</SelectItem>
                    <SelectItem value="ריצוף">ריצוף</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-phone" className="text-base">
                  טלפון *
                </Label>
                <Input
                  id="edit-phone"
                  value={editEmployee.phone}
                  onChange={(e) =>
                    setEditEmployee({ ...editEmployee, phone: e.target.value })
                  }
                  placeholder="050-1234567"
                  className="h-11 text-base rounded-lg"
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-status" className="text-base">
                  סטטוס העובד
                </Label>
                <Select
                  value={"siteStatusId"}
                  // value={editEmployee.siteStatusId}
                  onValueChange={(value: "active" | "inactive") =>
                    setEditEmployee({ ...editEmployee, siteStatusId: 1 })
                  }
                  disabled={isSubmitting}
                >
                  <SelectTrigger className="h-11 text-base rounded-lg">
                    <SelectValue placeholder="בחר סטטוס" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">פעיל</SelectItem>
                    <SelectItem value="inactive">לא פעיל</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator />

          {/* פרטי ויזה */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-medium">פרטי ויזה</h3>
            </div>

            <div className="flex items-center space-x-2 space-x-reverse mb-4">
              <Switch
                id="edit-has-visa"
                checked={editEmployee.hasVisa}
                onCheckedChange={(checked) =>
                  setEditEmployee({
                    ...editEmployee,
                    hasVisa: checked,
                    visaNumber: checked ? editEmployee.visaNumber : "",
                  })
                }
                disabled={isSubmitting}
              />
              <Label htmlFor="edit-has-visa" className="text-base">
                יש ויזה
              </Label>
            </div>

            {editEmployee.hasVisa && (
              <div className="space-y-2">
                <Label htmlFor="edit-visa-number" className="text-base">
                  מספר ויזה
                </Label>
                <Input
                  id="edit-visa-number"
                  value={editEmployee.visaNumber}
                  onChange={(e) =>
                    setEditEmployee({
                      ...editEmployee,
                      visaNumber: e.target.value,
                    })
                  }
                  placeholder="הכנס מספר ויזה"
                  className="h-11 text-base rounded-lg"
                  disabled={isSubmitting}
                />
              </div>
            )}
          </div>

          <Separator />

          {/* פרטים נוספים */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Car className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-medium">פרטים נוספים</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Switch
                  id="edit-has-vehicle"
                  checked={editEmployee.hasVehicle}
                  onCheckedChange={(checked) =>
                    setEditEmployee({ ...editEmployee, hasVehicle: checked })
                  }
                  disabled={isSubmitting}
                />
                <Label htmlFor="edit-has-vehicle" className="text-base">
                  יש רכב
                </Label>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Switch
                  id="edit-can-work-height"
                  checked={editEmployee.canWorkAtHeight}
                  onCheckedChange={(checked) =>
                    setEditEmployee({
                      ...editEmployee,
                      canWorkAtHeight: checked,
                    })
                  }
                  disabled={isSubmitting}
                />
                <Label htmlFor="edit-can-work-height" className="text-base">
                  יכול לעבוד בגובה
                </Label>
              </div>
            </div>
          </div>

          <Separator />

          {/* פרטי שכר */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-medium">פרטי שכר</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-payment-type" className="text-base">
                  סוג תשלום
                </Label>
                <Select
                  value={"editEmployee.paymentType"}
                  //value={editEmployee.paymentType}
                  onValueChange={(value: "hourly" | "daily") => {
                    setEditEmployee({
                      ...editEmployee,
                      paymentType: 1,
                      hourlyRate:
                        value === "hourly"
                          ? editEmployee.hourlyRate
                          : undefined,
                      dailyRate:
                        value === "daily" ? editEmployee.dailyRate : undefined,
                    });
                  }}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className="h-11 text-base rounded-lg">
                    <SelectValue placeholder="בחר סוג תשלום" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">שכר שעתי</SelectItem>
                    <SelectItem value="daily">שכר יומי</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {editEmployee.paymentType === "hourly" && (
                <div className="space-y-2">
                  <Label htmlFor="edit-hourly-rate" className="text-base">
                    שכר שעתי (₪)
                  </Label>
                  <Input
                    id="edit-hourly-rate"
                    type="number"
                    step="0.5"
                    min="0"
                    value={editEmployee.hourlyRate || ""}
                    onChange={(e) =>
                      setEditEmployee({
                        ...editEmployee,
                        hourlyRate: e.target.value
                          ? Number(e.target.value)
                          : undefined,
                      })
                    }
                    placeholder="60.5"
                    className="h-11 text-base rounded-lg"
                    disabled={isSubmitting}
                  />
                </div>
              )}

              {editEmployee.paymentType === "daily" && (
                <div className="space-y-2">
                  <Label htmlFor="edit-daily-rate" className="text-base">
                    שכר יומי (₪)
                  </Label>
                  <Input
                    id="edit-daily-rate"
                    type="number"
                    step="1"
                    min="0"
                    value={editEmployee.dailyRate || ""}
                    onChange={(e) =>
                      setEditEmployee({
                        ...editEmployee,
                        dailyRate: e.target.value
                          ? Number(e.target.value)
                          : undefined,
                      })
                    }
                    placeholder="500"
                    className="h-11 text-base rounded-lg"
                    disabled={isSubmitting}
                  />
                </div>
              )}

              <p className="text-sm text-muted-foreground">
                {editEmployee.paymentType === "hourly"
                  ? "השכר השעתי ישמש לחישוב שכר על בסיס שעות עבודה"
                  : "השכר היומי ישמש לחישוב שכר על בסיס ימי עבודה"}
              </p>
            </div>
          </div>

          <Separator />

          {/* הערות */}
          <div className="space-y-2">
            <Label htmlFor="edit-notes" className="text-base">
              הערות
            </Label>
            <Textarea
              id="edit-notes"
              value={editEmployee.notes}
              onChange={(e) =>
                setEditEmployee({ ...editEmployee, notes: e.target.value })
              }
              placeholder="הערות נוספות על העובד (אופציונלי)"
              className="min-h-20 text-base rounded-lg resize-none"
              disabled={isSubmitting}
            />
          </div>

          <Separator />

          {/* תמונת עובד */}
          <div className="space-y-2">
            <Label className="text-base">תמונת עובד (אופציונלי)</Label>
            <div className="flex flex-col gap-3">
              {editImagePreview ? (
                <div className="relative">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <div className="relative inline-block">
                      <img
                        src={editImagePreview}
                        alt="תצוגה מקדימה"
                        className="max-w-full h-32 object-cover rounded-lg mx-auto"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={removeEditImage}
                        className="absolute -top-2 -right-2 p-1 rounded-full w-8 h-8"
                        disabled={isSubmitting}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleEditImageUpload}
                    className="hidden"
                    id="edit-employee-image-upload"
                    disabled={isSubmitting}
                  />
                  <label
                    htmlFor="edit-employee-image-upload"
                    className="cursor-pointer"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <Upload className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">לחץ להעלאת תמונה</p>
                        <p className="text-sm text-muted-foreground">
                          PNG, JPG, GIF עד 10MB
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="gap-3 pt-6">
          <Button
            variant="outline"
            onClick={handleClose}
            className="h-11 px-6 text-base rounded-lg hover:scale-105 transition-all duration-200"
            disabled={isSubmitting}
          >
            ביטול
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              !editEmployee.name ||
              !editEmployee.role ||
              !editEmployee.phone ||
              isSubmitting
            }
            className="h-11 px-6 text-base rounded-lg hover:scale-105 transition-all duration-200"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                מעדכן...
              </div>
            ) : (
              "עדכן עובד"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
