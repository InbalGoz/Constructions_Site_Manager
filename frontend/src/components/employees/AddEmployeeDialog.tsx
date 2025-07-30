import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Checkbox } from "../../ui/checkbox";
import { Calendar } from "../../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { CalendarIcon, Upload, X, Loader2 } from "lucide-react";
import { cn } from "../../ui/utils";
import { format } from "date-fns";
import { he } from "date-fns/locale";
import { toast } from "sonner";
//import { RolesService } from '../../services/rolesService';
//import { Role } from '../../models';
import type { Role } from "../../models/role";

interface AddEmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (employee: any) => void;
}

export function AddEmployeeDialog({
  open,
  onOpenChange,
  onAdd,
}: AddEmployeeDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    roleId: 0,
    role: "", // Keep for backwards compatibility
    phone: "",
    email: "",
    paymentType: "hourly" as "hourly" | "daily",
    hourlyRate: "",
    dailyRate: "",
    hasVisa: false,
    visaNumber: "", // מספר ויזה במקום תוקף
    hasHeightCertification: false,
    hasVehicle: false,
    imageUrl: "",
    address: "",
    idNumber: "",
    hireDate: "",
  });

  const [hireDate, setHireDate] = useState<Date>();
  const [isHireDateCalendarOpen, setIsHireDateCalendarOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Roles state
  const [roles, setRoles] = useState<Role[]>([]);
  const [rolesLoading, setRolesLoading] = useState(true);

  // Load roles when component mounts
  useEffect(() => {
    // loadRoles();
  }, []);

  /*const loadRoles = async () => {
    try {
      setRolesLoading(true);
      await RolesService.initializeRoles();
      const activeRoles = await RolesService.getActiveRoles();
      setRoles(activeRoles);
    } catch (error) {
      console.error('Error loading roles:', error);
      toast.error('שגיאה בטעינת תפקידים');
    } finally {
      setRolesLoading(false);
    }
  };*/

  // Update role name for backwards compatibility when role changes
  useEffect(() => {
    if (formData.roleId && roles.length > 0) {
      const selectedRole = roles.find((role) => role.id === formData.roleId);
      if (selectedRole) {
        setFormData((prev) => ({ ...prev, role: selectedRole.nameHebrew }));
      }
    }
  }, [formData.roleId, roles]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setHireDate(date);
    setFormData((prev) => ({
      ...prev,
      hireDate: date ? format(date, "yyyy-MM-dd") : "",
    }));
    setIsHireDateCalendarOpen(false);
  };

  const handleFileUpload = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFormData((prev) => ({ ...prev, imageUrl: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, imageUrl: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.roleId || !formData.phone.trim()) {
      toast.error("נא למלא את כל השדות החובה");
      return;
    }

    if (formData.paymentType === "hourly" && !formData.hourlyRate) {
      toast.error("נא להזין שכר שעתי");
      return;
    }

    if (formData.paymentType === "daily" && !formData.dailyRate) {
      toast.error("נא להזין שכר יומי");
      return;
    }

    setIsSubmitting(true);

    try {
      const employeeData = {
        ...formData,
        hourlyRate:
          formData.paymentType === "hourly"
            ? Number(formData.hourlyRate)
            : undefined,
        dailyRate:
          formData.paymentType === "daily"
            ? Number(formData.dailyRate)
            : undefined,
        hireDate: hireDate
          ? format(hireDate, "yyyy-MM-dd")
          : format(new Date(), "yyyy-MM-dd"),
        isActive: true,
      };

      await onAdd(employeeData);

      // Reset form
      setFormData({
        name: "",
        roleId: 0,
        role: "",
        phone: "",
        email: "",
        paymentType: "hourly",
        hourlyRate: "",
        dailyRate: "",
        hasVisa: false,
        visaNumber: "",
        hasHeightCertification: false,
        hasVehicle: false,
        imageUrl: "",
        address: "",
        idNumber: "",
        hireDate: "",
      });
      setHireDate(undefined);

      toast.success("העובד נוסף בהצלחה!");
    } catch (error) {
      console.error("Error adding employee:", error);
      toast.error("שגיאה בהוספת העובד");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Group roles by category for better UX
  const rolesByCategory = roles.reduce((acc, role) => {
    if (!acc[role.categoryId]) {
      acc[role.categoryId] = [];
    }
    acc[role.categoryId].push(role);
    return acc;
  }, {} as Record<string, Role[]>);

  const getCategoryLabel = (category: string) => {
    const labels = {
      management: "ניהול",
      technical: "תפקידים טכניים",
      labor: "עבודה מיומנת וכללית",
      administrative: "אדמיניסטרציה",
    };
    return labels[category as keyof typeof labels] || category;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center pb-4">
          <DialogTitle className="text-xl lg:text-2xl text-center">
            הוסף עובד חדש
          </DialogTitle>
          <DialogDescription className="text-base text-center">
            מלא את פרטי העובד החדש. שדות עם * הם שדות חובה.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* פרטים אישיים */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-center border-b pb-2">
              פרטים אישיים
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base">
                  שם מלא *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="הזן שם מלא"
                  className="h-11 text-base rounded-lg"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-base">
                  תפקיד *
                </Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => handleInputChange("roleId", value)}
                  disabled={rolesLoading}
                  required
                >
                  <SelectTrigger className="h-11 text-base rounded-lg">
                    <SelectValue
                      placeholder={
                        rolesLoading ? "טוען תפקידים..." : "בחר תפקיד"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {rolesLoading ? (
                      <SelectItem value="" disabled>
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          טוען תפקידים...
                        </div>
                      </SelectItem>
                    ) : Object.keys(rolesByCategory).length > 0 ? (
                      Object.entries(rolesByCategory).map(
                        ([category, categoryRoles]) => (
                          <div key={category}>
                            <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground border-b">
                              {getCategoryLabel(category)}
                            </div>
                            {categoryRoles.map((role) => (
                              <SelectItem
                                key={role.id}
                                value={role.name}
                                className="pr-4"
                              >
                                {role.nameHebrew}
                              </SelectItem>
                            ))}
                          </div>
                        )
                      )
                    ) : (
                      <SelectItem value="" disabled>
                        אין תפקידים זמינים
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-base">
                  טלפון *
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="050-1234567"
                  className="h-11 text-base rounded-lg"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-base">
                  אימייל
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="email@example.com"
                  className="h-11 text-base rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="idNumber" className="text-base">
                  תעודת זהות
                </Label>
                <Input
                  id="idNumber"
                  value={formData.idNumber}
                  onChange={(e) =>
                    handleInputChange("idNumber", e.target.value)
                  }
                  placeholder="123456789"
                  className="h-11 text-base rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-base">תאריך גיוס</Label>
                <Popover
                  open={isHireDateCalendarOpen}
                  onOpenChange={setIsHireDateCalendarOpen}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full h-11 justify-start text-right text-base rounded-lg",
                        !hireDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="ml-2 h-4 w-4" />
                      {hireDate
                        ? format(hireDate, "dd/MM/yyyy", { locale: he })
                        : "בחר תאריך גיוס"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={hireDate}
                      onSelect={handleDateChange}
                      locale={he}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-base">
                כתובת
              </Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="רחוב, עיר"
                className="h-11 text-base rounded-lg"
              />
            </div>
          </div>

          {/* פרטי תשלום */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-center border-b pb-2">
              פרטי תשלום
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-base">סוג תשלום *</Label>
                <Select
                  value={formData.paymentType}
                  onValueChange={(value) =>
                    handleInputChange("paymentType", value)
                  }
                >
                  <SelectTrigger className="h-11 text-base rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">שעתי</SelectItem>
                    <SelectItem value="daily">יומי</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.paymentType === "hourly" ? (
                <div className="space-y-2">
                  <Label htmlFor="hourlyRate" className="text-base">
                    שכר לשעה (₪) *
                  </Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.hourlyRate}
                    onChange={(e) =>
                      handleInputChange("hourlyRate", e.target.value)
                    }
                    placeholder="75.00"
                    className="h-11 text-base rounded-lg"
                    required
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="dailyRate" className="text-base">
                    שכר יומי (₪) *
                  </Label>
                  <Input
                    id="dailyRate"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.dailyRate}
                    onChange={(e) =>
                      handleInputChange("dailyRate", e.target.value)
                    }
                    placeholder="300.00"
                    className="h-11 text-base rounded-lg"
                    required
                  />
                </div>
              )}
            </div>
          </div>

          {/* תיעוד ורישויים */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-center border-b pb-2">
              תיעוד ורישויים
            </h3>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 space-x-reverse">
                <Checkbox
                  id="hasVisa"
                  checked={formData.hasVisa}
                  onCheckedChange={(checked) =>
                    handleInputChange("hasVisa", checked)
                  }
                />
                <Label htmlFor="hasVisa" className="text-base">
                  יש ויזה
                </Label>
              </div>

              {formData.hasVisa && (
                <div className="space-y-2 mr-6">
                  <Label htmlFor="visaNumber" className="text-base">
                    מספר ויזה
                  </Label>
                  <Input
                    id="visaNumber"
                    value={formData.visaNumber}
                    onChange={(e) =>
                      handleInputChange("visaNumber", e.target.value)
                    }
                    placeholder="הזן מספר ויזה"
                    className="h-11 text-base rounded-lg"
                  />
                </div>
              )}

              <div className="flex items-center space-x-3 space-x-reverse">
                <Checkbox
                  id="hasHeightCertification"
                  checked={formData.hasHeightCertification}
                  onCheckedChange={(checked) =>
                    handleInputChange("hasHeightCertification", checked)
                  }
                />
                <Label htmlFor="hasHeightCertification" className="text-base">
                  יש תעודת עבודה בגובה
                </Label>
              </div>

              <div className="flex items-center space-x-3 space-x-reverse">
                <Checkbox
                  id="hasVehicle"
                  checked={formData.hasVehicle}
                  onCheckedChange={(checked) =>
                    handleInputChange("hasVehicle", checked)
                  }
                />
                <Label htmlFor="hasVehicle" className="text-base">
                  יש רכב
                </Label>
              </div>
            </div>
          </div>

          {/* העלאת תמונה */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-center border-b pb-2">
              תמונת פרופיל
            </h3>

            {!formData.imageUrl ? (
              <div
                className={cn(
                  "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
                  dragActive
                    ? "border-primary bg-primary/5"
                    : "border-gray-300 hover:border-primary hover:bg-gray-50"
                )}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">
                  גרור תמונה לכאן או לחץ לבחירה
                </p>
                <p className="text-xs text-gray-400 mt-1">JPG, PNG עד 5MB</p>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={formData.imageUrl}
                  alt="תמונת העובד"
                  className="w-full h-48 object-cover rounded-lg border"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={removeImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}

            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file);
              }}
            />
          </div>

          {/* כפתורים */}
          <div className="flex gap-3 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 h-11 text-base rounded-lg hover:scale-105 transition-all duration-200"
              disabled={isSubmitting}
            >
              ביטול
            </Button>
            <Button
              type="submit"
              className="flex-1 h-11 text-base rounded-lg bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-200"
              disabled={
                isSubmitting ||
                !formData.name.trim() ||
                !formData.roleId ||
                !formData.phone.trim()
              }
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  מוסיף...
                </div>
              ) : (
                "הוסף עובד"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
