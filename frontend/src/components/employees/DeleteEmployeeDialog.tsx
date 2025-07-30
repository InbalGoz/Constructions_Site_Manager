import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Button } from "../../ui/button";

interface Employee {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  status: "active" | "inactive" | "vacation";
  avatar: string;
  visaNumber?: string;
  hasVisa: boolean;
  hasCar: boolean;
  canWorkAtHeight: boolean;
}

interface DeleteEmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee: Employee | null;
  onDeleteEmployee: (employeeId: string) => Promise<void>;
  isDeleting?: boolean;
}

export function DeleteEmployeeDialog({
  open,
  onOpenChange,
  employee,
  onDeleteEmployee,
  isDeleting = false,
}: DeleteEmployeeDialogProps) {
  const handleDelete = async () => {
    if (employee) {
      await onDeleteEmployee(employee.id);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">אישור מחיקת עובד</DialogTitle>
          <DialogDescription className="text-center">
            האם אתה בטוח שברצונך למחוק את העובד "{employee?.name}"?
            <br />
            פעולה זו לא ניתנת לביטול.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
          >
            ביטול
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                מוחק...
              </div>
            ) : (
              "מחק עובד"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
