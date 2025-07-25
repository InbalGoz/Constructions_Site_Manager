import React from "react";
import { Card, CardContent } from "../../ui/card";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Button } from "../../ui/button";
import { X } from "lucide-react";

//get the status list from slices

interface SitesFiltersProps {
  filters: {
    statusId: number;
    search: string;
    location: string;
  };
  onFiltersChange: (filters: any) => void;
  disabled?: boolean;
}

export function SitesFilters({
  filters,
  onFiltersChange,
  disabled = false,
}: SitesFiltersProps) {
  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      status: "",
      search: "",
      location: "",
    });
  };

  const hasActiveFilters =
    filters.statusId || filters.search || filters.location;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col lg:flex-row gap-4 items-end">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Status Filter */}
            <div className="space-y-2">
              <Label htmlFor="status-filter">סטטוס</Label>
              <Select
                //value={filters.statusId || undefined}//* need to fix
                value={undefined}
                onValueChange={(value) => handleFilterChange("status", value)}
                disabled={disabled}
              >
                <SelectTrigger>
                  <SelectValue placeholder="כל הסטטוסים" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">פעיל</SelectItem>
                  <SelectItem value="completed">הושלם</SelectItem>
                  <SelectItem value="inactive">לא פעיל</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Search Filter */}
            <div className="space-y-2">
              <Label htmlFor="search-filter">חיפוש</Label>
              <Input
                id="search-filter"
                placeholder="חפש לפי שם אתר..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                disabled={disabled}
              />
            </div>

            {/* Location Filter */}
            <div className="space-y-2">
              <Label htmlFor="location-filter">מיקום</Label>
              <Input
                id="location-filter"
                placeholder="חפש לפי מיקום..."
                value={filters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
                disabled={disabled}
              />
            </div>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={clearAllFilters}
              disabled={disabled}
              className="flex items-center space-x-2"
            >
              <X className="h-4 w-4" />
              <span>נקה פילטרים</span>
            </Button>
          )}
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="mt-4 flex flex-wrap gap-2">
            {filters.statusId && (
              <div className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                <span>
                  סטטוס:{" "}
                  {filters.statusId === 1
                    ? "פעיל"
                    : filters.statusId === 2
                    ? "הושלם"
                    : "לא פעיל"}
                </span>
                <button
                  onClick={() => handleFilterChange("status", "")}
                  className="mr-1 hover:bg-blue-200 rounded p-0.5"
                  disabled={disabled}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}

            {filters.search && (
              <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                <span>חיפוש: {filters.search}</span>
                <button
                  onClick={() => handleFilterChange("search", "")}
                  className="mr-1 hover:bg-green-200 rounded p-0.5"
                  disabled={disabled}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}

            {filters.location && (
              <div className="flex items-center bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">
                <span>מיקום: {filters.location}</span>
                <button
                  onClick={() => handleFilterChange("location", "")}
                  className="mr-1 hover:bg-purple-200 rounded p-0.5"
                  disabled={disabled}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
