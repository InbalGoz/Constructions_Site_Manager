import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { AlertTriangle } from "lucide-react";
import type { Site } from "../../models/site";

interface DeleteSiteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  site: Site | null;
  onDelete: () => void;
}

export function DeleteSiteDialog({
  open,
  onOpenChange,
  site,
  onDelete,
}: DeleteSiteDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete();
    } catch (error) {
      console.error("Error deleting site:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!site) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            מחיקת אתר
          </DialogTitle>
          <DialogDescription>
            פעולה זו תמחק את האתר לצמיתות מהמערכת. לא ניתן לבטל פעולה זו.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
            <p className="text-sm text-foreground mb-2">
              האם אתה בטוח שברצונך למחוק את האתר:
            </p>
            <p className="font-medium text-foreground">{site.name}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {site.location}
            </p>
          </div>

          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800">
              <strong>אזהרה:</strong> מחיקת האתר תמחק גם את כל שלבי העבודה,
              החומרים ודיווחי שעות העבודה הקשורים אליו.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
            disabled={isDeleting}
          >
            ביטול
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            className="flex-1"
            disabled={isDeleting}
          >
            {isDeleting ? "מוחק..." : "מחק אתר"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
