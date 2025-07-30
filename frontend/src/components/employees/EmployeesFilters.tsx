import { Search, Filter } from "lucide-react";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

interface EmployeesFiltersProps {
  searchTerm: string;
  statusFilter: string;
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  onClearFilters: () => void;
}

export function EmployeesFilters({
  searchTerm,
  statusFilter,
  onSearchChange,
  onStatusFilterChange,
  onClearFilters,
}: EmployeesFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="חיפוש עובדים..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pr-10 h-11 text-base"
        />
      </div>
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-muted-foreground" />
        <Select
          value={statusFilter === "all" ? undefined : statusFilter}
          onValueChange={(value) => onStatusFilterChange(value || "all")}
        >
          <SelectTrigger className="w-40 h-11">
            <SelectValue placeholder="כל הסטטוסים" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">פעיל</SelectItem>
            <SelectItem value="inactive">לא פעיל</SelectItem>
            <SelectItem value="terminated">פוטר</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
