import { Card, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import {
  MapPin,
  Calendar,
  Edit,
  Trash2,
  DollarSign,
  Building2,
} from "lucide-react";
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

interface SiteCardProps {
  site: Site;
  onClick: () => void;
  onEdit: (site: Site) => void;
  onDelete: (site: Site) => void;
}

export function SiteCard({ site, onClick, onEdit, onDelete }: SiteCardProps) {
  const getStatusBadge = (statusId: number) => {
    switch (statusId) {
      case 1:
        return (
          <Badge className="bg-status-active hover:bg-status-active/90 text-status-active-foreground border-status-active">
            פעיל
          </Badge>
        );
      case 2:
        return (
          <Badge className="bg-status-completed hover:bg-status-completed/90 text-status-completed-foreground border-status-completed">
            הושלם
          </Badge>
        );
      case 3:
        return (
          <Badge className="bg-status-inactive hover:bg-status-inactive/90 text-status-inactive-foreground border-status-inactive">
            לא פעיל
          </Badge>
        );
      default:
        return null;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("he-IL", {
      style: "currency",
      currency: "ILS",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format dates in Hebrew
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("he-IL", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };

  // Use imageUrl or fallback to image for backwards compatibility
  const imageSource = site.imageUrl || site.imageUrl;

  const ImageComponent = () => {
    if (imageSource) {
      return (
        <img
          src={imageSource}
          alt={site.name}
          className="w-full h-48 sm:h-56 object-cover group-hover:brightness-110 transition-all duration-300"
          onError={(e) => {
            // Replace with fallback on error
            e.currentTarget.style.display = "none";
            e.currentTarget.parentElement
              ?.querySelector(".fallback-image")
              ?.classList.remove("hidden");
          }}
        />
      );
    }
    return null;
  };

  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group overflow-hidden bg-card">
      <div className="cursor-pointer" onClick={onClick}>
        <div className="relative bg-gradient-to-br from-muted/30 to-muted/60">
          <ImageComponent />

          {/* Fallback image - always present but hidden if real image loads */}
          <div
            className={`fallback-image w-full h-48 sm:h-56 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center ${
              imageSource ? "hidden" : ""
            }`}
          >
            <div className="text-center space-y-2">
              <Building2 className="w-12 h-12 mx-auto text-muted-foreground/60" />
              <p className="text-xs text-muted-foreground/80 px-4">
                {site.name}
              </p>
            </div>
          </div>

          <div className="absolute top-4 right-4">
            {getStatusBadge(site.statusId)}
          </div>
        </div>
      </div>

      <CardContent className="p-4 sm:p-6 space-y-4">
        <div>
          <h3 className="text-lg sm:text-xl mb-2 line-clamp-2 text-foreground group-hover:text-primary transition-colors duration-200 leading-tight">
            {site.name}
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground line-clamp-2 leading-relaxed">
            {site.description}
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-3 text-sm sm:text-base text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <span className="line-clamp-2 leading-relaxed">
              {site.location}
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm sm:text-base text-muted-foreground">
            <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <span>התחיל: {formatDate(site.startDate)}</span>
              {site.endDate && site.statusId === 2 && (
                <span className="text-xs sm:text-sm">
                  <span className="hidden sm:inline">•</span> הסתיים:{" "}
                  {formatDate(site.endDate)}
                </span>
              )}
            </div>
          </div>

          {/* Budget information - ללא אחוזי ניצול */}
          {site.budget && (
            <div className="flex items-start gap-3 text-sm sm:text-base text-muted-foreground">
              <DollarSign className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1">
                <span>תקציב: {formatCurrency(site.budget)}</span>
                {site.actualCost && site.actualCost > 0 && (
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    נוצל: {formatCurrency(site.actualCost)}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Manager information for backwards compatibility */}
          {site.manager && (
            <div className="flex items-center gap-3 text-sm sm:text-base text-muted-foreground">
              <span className="w-4 h-4 text-primary flex-shrink-0 text-center leading-none">
                👤
              </span>
              <span>מנהל: {site.manager}</span>
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-3 border-t border-border/50">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(site);
            }}
            className="flex-1 p-2 h-9 rounded-lg hover:scale-[1.02] transition-all duration-200 hover:bg-primary/10 hover:text-primary"
          >
            <Edit className="w-4 h-4 ml-2" />
            <span>עריכה</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(site);
            }}
            className="flex-1 p-2 h-9 rounded-lg text-destructive hover:text-destructive hover:scale-[1.02] transition-all duration-200 hover:bg-destructive/10"
          >
            <Trash2 className="w-4 h-4 ml-2" />
            <span>מחיקה</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
