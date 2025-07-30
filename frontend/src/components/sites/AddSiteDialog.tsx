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
import { Textarea } from "../../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Calendar } from "../../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { CalendarIcon, Upload, X } from "lucide-react";
import { cn } from "../../ui/utils";
import { format } from "date-fns";
import { he } from "date-fns/locale";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getSiteStatuses,
  createNewSite,
} from "../../features/sites/sitesSlice";
import type { SiteStatus } from "../../models/site";
import { selectAllSitesStatuses } from "../../features/sites/sitesSelectors";

interface AddSiteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (site: any) => void;
}

export function AddSiteDialog({
  open,
  onOpenChange,
  onAdd,
}: AddSiteDialogProps) {
  const dispatch = useAppDispatch();
  const sitesStatuses = useAppSelector(selectAllSitesStatuses);

  useEffect(() => {
    dispatch(getSiteStatuses());
  }, [dispatch]);

  const [newSiteData, setnewSiteData] = useState({
    name: "",
    location: "",
    statusId: 0,
    startDate: "",
    endDate: "",
    description: "",
    budget: "",
    actualCost: "",
    imageUrl: "",
    manager: "",
  });

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setnewSiteData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (
    field: "startDate" | "endDate",
    date: Date | undefined
  ) => {
    if (field === "startDate") {
      setStartDate(date);
      setnewSiteData((prev) => ({
        ...prev,
        startDate: date ? format(date, "yyyy-MM-dd") : "",
      }));
    } else {
      setEndDate(date);
      setnewSiteData((prev) => ({
        ...prev,
        endDate: date ? format(date, "yyyy-MM-dd") : "",
      }));
    }
  };

  const handleFileUpload = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setnewSiteData((prev) => ({ ...prev, imageUrl: result }));
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
    setnewSiteData((prev) => ({ ...prev, imageUrl: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newSiteData.name.trim() || !newSiteData.location.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const siteData = {
        ...newSiteData,
        budget: newSiteData.budget ? Number(newSiteData.budget) : undefined,
        actualCost: newSiteData.actualCost
          ? Number(newSiteData.actualCost)
          : undefined,
        startDate: startDate ? format(startDate, "yyyy-MM-dd") : "",
        endDate: endDate ? format(endDate, "yyyy-MM-dd") : undefined,
      };

      await onAdd(siteData);

      dispatch(createNewSite(siteData));

      // Reset form
      setnewSiteData({
        name: "",
        location: "",
        statusId: 1,
        startDate: "",
        endDate: "",
        description: "",
        budget: "",
        actualCost: "",
        imageUrl: "",
        manager: "",
      });
      setStartDate(undefined);
      setEndDate(undefined);
    } catch (error) {
      console.error("Error adding site:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center pb-4">
          <DialogTitle className="text-xl lg:text-2xl text-center">
            הוסף אתר חדש
          </DialogTitle>
          <DialogDescription className="text-base text-center">
            מלא את הפרטים ליצירת אתר בנייה חדש במערכת
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* שם האתר */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-base">
              שם האתר *
            </Label>
            <Input
              id="name"
              value={newSiteData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="הזן שם אתר"
              className="h-11 text-base rounded-lg"
              required
            />
          </div>

          {/* מיקום */}
          <div className="space-y-2">
            <Label htmlFor="location" className="text-base">
              מיקום *
            </Label>
            <Input
              id="location"
              value={newSiteData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              placeholder="הזן כתובת האתר"
              className="h-11 text-base rounded-lg"
              required
            />
          </div>

          {/* סטטוס */}
          <div className="space-y-2">
            <Label htmlFor="status" className="text-base">
              סטטוס
            </Label>
            <Select
              value={newSiteData.statusId.toString()}
              onValueChange={(value) => handleInputChange("status", value)}
            >
              <SelectTrigger className="h-11 text-base rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">פעיל</SelectItem>
                <SelectItem value="completed">הושלם</SelectItem>
                <SelectItem value="inactive">לא פעיל</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* תאריכים */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-base">תאריך התחלה</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-11 justify-start text-right text-base rounded-lg",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="ml-2 h-4 w-4" />
                    {startDate
                      ? format(startDate, "dd/MM/yyyy", { locale: he })
                      : "בחר תאריך"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={(date) => handleDateChange("startDate", date)}
                    locale={he}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label className="text-base">תאריך סיום (אופציונלי)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-11 justify-start text-right text-base rounded-lg",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="ml-2 h-4 w-4" />
                    {endDate
                      ? format(endDate, "dd/MM/yyyy", { locale: he })
                      : "בחר תאריך"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={(date) => handleDateChange("endDate", date)}
                    locale={he}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* תקציב וסכום נוצל */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget" className="text-base">
                תקציב (₪)
              </Label>
              <Input
                id="budget"
                type="number"
                value={newSiteData.budget}
                onChange={(e) => handleInputChange("budget", e.target.value)}
                placeholder="הזן תקציב"
                className="h-11 text-base rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="actualCost" className="text-base">
                סכום נוצל (₪)
              </Label>
              <Input
                id="actualCost"
                type="number"
                value={newSiteData.actualCost}
                onChange={(e) =>
                  handleInputChange("actualCost", e.target.value)
                }
                placeholder="הזן סכום נוצל"
                className="h-11 text-base rounded-lg"
              />
            </div>
          </div>

          {/* תיאור */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-base">
              תיאור
            </Label>
            <Textarea
              id="description"
              value={newSiteData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="הזן תיאור האתר"
              className="min-h-20 text-base rounded-lg resize-none"
              rows={3}
            />
          </div>

          {/* העלאת תמונה */}
          <div className="space-y-2">
            <Label className="text-base">תמונת האתר</Label>

            {!newSiteData.imageUrl ? (
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
                  src={newSiteData.imageUrl}
                  alt="תמונת האתר"
                  className="w-full h-32 object-cover rounded-lg border"
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
                !newSiteData.name.trim() ||
                !newSiteData.location.trim()
              }
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  מוסיף...
                </div>
              ) : (
                "הוסף אתר"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
