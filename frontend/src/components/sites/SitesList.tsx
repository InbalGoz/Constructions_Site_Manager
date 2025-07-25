import { Building2, Loader2 } from "lucide-react";
import { Button } from "../../ui/button";
import { SiteCard } from "./SiteCard";
import { useNavigate } from "react-router-dom";
import type { Site } from "../../models/site";

/*interface Site {
  id: string;
  name: string;
  location: string;
  startDate: string;
  status: "active" | "completed" | "inactive";
  description: string;
  imageUrl?: string;
  image?: string; // Backwards compatibility
  manager?: string; // Optional backwards compatibility
  budget?: number;
  actualCost?: number;
  endDate?: string;
  createdAt?: string;
  updatedAt?: string;
}*/

interface SitesListProps {
  sites: Site[];
  loading?: boolean;
  searchTerm?: string;
  statusFilter?: string;
  onEdit: (site: Site) => void;
  onDelete: (site: Site) => void;
  onClearFilters?: () => void;
}

export function SitesList({
  sites,
  loading = false,
  searchTerm = "",
  statusFilter = "all",
  onEdit,
  onDelete,
  onClearFilters,
}: SitesListProps) {
  const navigate = useNavigate();

  const handleSiteClick = (siteId: string) => {
    navigate(`/sites/${siteId}`);
  };

  // Loading state
  if (loading) {
    return (
      <div className="text-center py-12">
        <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary mb-4" />
        <p className="text-muted-foreground">טוען אתרים...</p>
      </div>
    );
  }

  // Empty state
  if (sites.length === 0) {
    const hasFilters = searchTerm || (statusFilter && statusFilter !== "all");

    return (
      <div className="text-center py-12 sm:py-16 lg:py-20">
        <div className="mx-auto w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-muted rounded-3xl flex items-center justify-center mb-6 sm:mb-8">
          <Building2 className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-muted-foreground" />
        </div>

        <h3 className="text-xl sm:text-2xl lg:text-3xl mb-3 sm:mb-4 text-foreground">
          {hasFilters ? "לא נמצאו תוצאות" : "אין אתרים"}
        </h3>

        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-md mx-auto">
          {hasFilters
            ? "לא נמצאו אתרים התואמים לחיפוש או לסינון הנוכחי"
            : "עדיין לא נוספו אתרים למערכת. התחל על ידי הוספת אתר ראשון."}
        </p>

        {hasFilters && onClearFilters && (
          <Button
            variant="outline"
            onClick={onClearFilters}
            className="text-base sm:text-lg h-12 sm:h-14 px-6 sm:px-8 rounded-xl hover:scale-105 transition-all duration-200"
          >
            נקה חיפוש וסינון
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results summary */}
      {sites.length > 0 &&
        (searchTerm || (statusFilter && statusFilter !== "all")) && (
          <div className="text-sm text-muted-foreground bg-muted/30 px-4 py-2 rounded-lg">
            נמצאו {sites.length} אתרים
            {searchTerm && ` עבור "${searchTerm}"`}
            {statusFilter &&
              statusFilter !== "all" &&
              ` בסטטוס "${
                statusFilter === "active"
                  ? "פעיל"
                  : statusFilter === "completed"
                  ? "הושלם"
                  : "לא פעיל"
              }"`}
          </div>
        )}

      {/* Sites grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {sites.map((site) => (
          <SiteCard
            key={site.id}
            site={site}
            onEdit={onEdit}
            onDelete={onDelete}
            onClick={() => handleSiteClick(site.id)}
          />
        ))}
      </div>
    </div>
  );
}
