import React, { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import { Button } from "../ui/button";
import { Plus, Loader2 } from "lucide-react";
import { SitesList } from "../components/sites/SitesList";
import { SitesFilters } from "../components/sites/SitesFilters";
import { AddSiteDialog } from "../components/sites/AddSiteDialog";
import { EditSiteDialog } from "../components/sites/EditSiteDialog";
import { DeleteSiteDialog } from "../components/sites/DeleteSiteDialog";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  loadAllSites,
  createNewSite,
  updateSiteThunk,
  deleteSiteThunk,
} from "../features/sites/sitesSlice";
import {
  selectAllSites,
  selectAllSitesLoading,
  selectAllSitesError,
} from "../features/sites/sitesSelectors";
import type { Site } from "../models/site";

// Define Site interface locally
/*interface Site {
  id: string;
  name: string;
  location: string;
  status: "active" | "completed" | "inactive";
  startDate: string;
  endDate?: string;
  description: string;
  imageUrl?: string;
  budget?: number;
  actualCost?: number;
  createdAt: string;
  updatedAt: string;
}*/

// Demo sites data with better images and proper dates
/*const demoSites: Site[] = [
  {
    id: "1",
    name: "בניין מגורים רמת גן",
    location: "רמת גן, רחוב הרצל 45",
    status: "active",
    startDate: "2024-01-15T00:00:00.000Z",
    description:
      "פרויקט בניית בניין מגורים בן 10 קומות עם 40 דירות יוקרה. הפרויקט כולל חניון תת קרקעי, גינה משותפת ומרכז כושר לדיירים.",
    imageUrl:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop&auto=format",
    budget: 5000000,
    actualCost: 2800000,
    createdAt: "2024-01-15T08:00:00.000Z",
    updatedAt: "2024-07-21T14:30:00.000Z",
  },
  {
    id: "2",
    name: "מרכז מסחרי הרצליה",
    location: "הרצליה, רחוב סוקולוב 12",
    status: "active",
    startDate: "2024-02-01T00:00:00.000Z",
    description:
      "בניית מרכז מסחרי חדש עם 50 חנויות, בתי קפה ומסעדות. הפרויקט כולל חניה על גג וגינת גן על הגג.",
    imageUrl:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&auto=format",
    budget: 8000000,
    actualCost: 4200000,
    createdAt: "2024-02-01T09:00:00.000Z",
    updatedAt: "2024-07-21T15:20:00.000Z",
  },
  {
    id: "3",
    name: "מגדל משרדים תל אביב",
    location: "תל אביב, רחוב הארבעה 8",
    status: "completed",
    startDate: "2023-06-01T00:00:00.000Z",
    endDate: "2024-05-30T00:00:00.000Z",
    description:
      "בניין משרדים מודרני בן 15 קומות עם חזית זכוכית ומערכות חכמות לחיסכון באנרגיה.",
    imageUrl:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&auto=format",
    budget: 12000000,
    actualCost: 11800000,
    createdAt: "2023-06-01T10:00:00.000Z",
    updatedAt: "2024-05-30T16:45:00.000Z",
  },
  {
    id: "4",
    name: "וילה פרטית כפר סבא",
    location: "כפר סבא, רחוב הדקל 22",
    status: "inactive",
    startDate: "2024-03-01T00:00:00.000Z",
    description:
      "בניית וילה פרטית עם בריכה, גינה מעוצבת ואלמנטים של אדריכלות ירוקה וברת קיימא.",
    imageUrl:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop&auto=format",
    budget: 2500000,
    actualCost: 800000,
    createdAt: "2024-03-01T11:00:00.000Z",
    updatedAt: "2024-07-21T13:15:00.000Z",
  },
  {
    id: "5",
    name: "אולם ספורט נתניה",
    location: "נתניה, רחוב ויצמן 15",
    status: "active",
    startDate: "2024-06-01T00:00:00.000Z",
    description:
      "בניית אולם ספורט מודרני עם 2000 מקומות ישיבה, חדרי כושר וחלל רב-תכליתי לאירועים.",
    imageUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&auto=format",
    budget: 15000000,
    actualCost: 3500000,
    createdAt: "2024-06-01T10:00:00.000Z",
    updatedAt: "2024-07-21T16:45:00.000Z",
  },
  {
    id: "6",
    name: "פרויקט חידוש עירוני",
    location: "חיפה, רחוב הנמל 30",
    status: "active",
    startDate: "2024-04-15T00:00:00.000Z",
    description:
      "פרויקט חידוש שכונה היסטורית הכולל שימור מבנים, יצירת רחובות להולכי רגל וחנויות בוטיק.",
    imageUrl:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop&auto=format",
    budget: 6500000,
    actualCost: 2100000,
    createdAt: "2024-04-15T08:30:00.000Z",
    updatedAt: "2024-07-21T17:00:00.000Z",
  },
];*/

// selector
// פונקציה למיון אתרים לפי סטטוס
/*const sortSitesByStatus = (sites: Site[]): Site[] => {
  const statusOrder = { active: 1, completed: 2, inactive: 3 };

  return [...sites].sort((a, b) => {
    // מיון ראשוני לפי סטטוס
    const statusDiff = statusOrder[a.statusId] - statusOrder[b.statusId];
    if (statusDiff !== 0) return statusDiff;

    // מיון משני לפי תאריך עדכון (האחרון קודם)
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
};*/

export function SitesPage() {
  const dispatch = useAppDispatch();
  //selecto -  slices
  const sites = useAppSelector(selectAllSites);
  const loading = useAppSelector(selectAllSitesLoading);
  const error = useAppSelector(selectAllSitesError);

  // Dialog states
  const [showAddDialog, setShowAddDialog] = useState(false);
  // slice
  const [editingSite, setEditingSite] = useState<Site | null>(null);
  const [deletingSite, setDeletingSite] = useState<Site | null>(null);

  // Filter states
  const [filters, setFilters] = useState({
    statusId: 0,
    search: "",
    location: "",
  });

  // slices
  // Load initial data
  useEffect(() => {
    dispatch(loadAllSites());
  }, [dispatch]);

  // noooo
  // Save sites to localStorage with sorting
  /*const saveSites = (newSites: Site[]) => {
    const sortedSites = sortSitesByStatus(newSites);
    setSites(sortedSites);
    localStorage.setItem("sites", JSON.stringify(sortedSites));
  };*/

  // selector/???
  // Filter sites and maintain sorting
  const filteredSites = sites.filter((site) => {
    if (filters.statusId && site.statusId !== filters.statusId) return false;
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        site.name.toLowerCase().includes(searchLower) ||
        site.location.toLowerCase().includes(searchLower) ||
        site.description?.toLowerCase().includes(searchLower)
      );
    }
    if (
      filters.location &&
      !site.location.toLowerCase().includes(filters.location.toLowerCase())
    )
      return false;
    return true;
  });

  // Handle filter changes
  const handleFiltersChange = (newFilters: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  // Add new site
  const handleAddSite = async (siteData: Site) => {
    try {
      const now = new Date().toISOString();
      const newSite: Site = {
        ...siteData,
        // id: Date.now().toString(),
        createdAt: now,
        updatedAt: now,
      };

      //const newSites = [newSite, ...sites];
      dispatch(createNewSite(newSite));
      // saveSites(newSites);
      setShowAddDialog(false);
      toast.success("האתר נוסף בהצלחה");
    } catch (addError) {
      console.error("Error adding site:", addError);
      toast.error("שגיאה בהוספת האתר");
    }
  };

  // Edit site
  const handleEditSite = async (siteData: Site) => {
    if (!editingSite) return;

    try {
      const updatedSite: Site = {
        ...editingSite,
        ...siteData,
        updatedAt: new Date().toISOString(),
      };

      /* const newSites = sites.map((site) =>
        site.id === editingSite.id ? updatedSite : site
      );*/

      dispatch(
        updateSiteThunk({ siteId: updatedSite.id, siteData: updatedSite })
      );
      //saveSites(newSites);
      //setEditingSite(null);
      toast.success("האתר עודכן בהצלחה");
    } catch (editError) {
      console.error("Error editing site:", editError);
      toast.error("שגיאה בעדכון האתר");
    }
  };

  // Delete site
  const handleDeleteSite = async (siteId: number | undefined) => {
    //if (!deletingSite) return;

    try {
      // const newSites = sites.filter((site) => site.id !== deletingSite.id);
      //saveSites(newSites);
      dispatch(deleteSiteThunk(siteId || 0));
      //setDeletingSite(null);
      toast.success("האתר נמחק בהצלחה");
    } catch (deleteError) {
      console.error("Error deleting site:", deleteError);
      toast.error("שגיאה במחיקת האתר");
    }
  };

  // Reload page function for error handling
  const handleReload = () => {
    window.location.reload();
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6 space-y-6">
          <PageHeader
            title="אתרי בנייה"
            subtitle="ניהול כל אתרי הבנייה של החברה"
          />

          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center space-y-4">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
              <p className="text-muted-foreground">טוען אתרים...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 space-y-6">
        <PageHeader
          title="אתרי בנייה"
          subtitle="ניהול כל אתרי הבנייה של החברה"
        />

        <div className="space-y-6">
          {/* כפתור הוספת אתר */}
          <div className="flex justify-start">
            <Button
              onClick={() => setShowAddDialog(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 px-4 py-2 text-base rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Plus className="w-4 h-4" />
              הוסף אתר חדש
            </Button>
          </div>

          {/* פילטרים */}
          <SitesFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            disabled={false}
          />

          {/* הודעה על סדר התצוגה */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-4 text-sm">
                <span className="font-medium text-blue-900">סדר תצוגה:</span>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-status-active"></div>
                  <span className="text-blue-700">פעילים</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-status-completed"></div>
                  <span className="text-blue-700">הושלמו</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-status-inactive"></div>
                  <span className="text-blue-700">לא פעילים</span>
                </div>
              </div>
            </div>
          </div>

          {/* הצגת שגיאה */}
          {error && (
            <div className="bg-destructive/10 border-2 border-destructive/20 text-destructive px-4 py-3 rounded-lg">
              <p className="font-medium">שגיאה: {error}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReload}
                className="mt-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                נסה שוב
              </Button>
            </div>
          )}

          {/* רשימת אתרים */}
          <SitesList
            sites={filteredSites}
            loading={false}
            onEdit={() => setEditingSite}
            onDelete={() => setDeletingSite}
            onClearFilters={() =>
              setFilters({ statusId: 0, search: "", location: "" })
            }
          />

          {/* סטטיסטיקות */}
          {filteredSites.length > 0 && (
            <div className="text-center text-sm text-muted-foreground bg-card p-6 rounded-lg border shadow-sm">
              <p className="text-base font-medium mb-3">
                מציג {filteredSites.length} אתרים מתוך {sites.length} סה"כ
              </p>
              <div className="flex justify-center gap-8 text-xs">
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-status-active"></div>
                  <span>
                    פעילים: {sites.filter((s) => s.statusId === 1).length}
                  </span>
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-status-completed"></div>
                  <span>
                    הושלמו: {sites.filter((s) => s.statusId === 2).length}
                  </span>
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-status-inactive"></div>
                  <span>
                    לא פעילים: {sites.filter((s) => s.statusId === 3).length}
                  </span>
                </span>
              </div>
            </div>
          )}

          {/* הודעה כאשר אין אתרים */}
          {filteredSites.length === 0 && !loading && (
            <div className="text-center py-12 bg-card rounded-lg border shadow-sm">
              <div className="max-w-md mx-auto space-y-4">
                <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                  <Plus className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">אין אתרים להצגה</h3>
                <p className="text-muted-foreground">
                  {filters.search || filters.statusId || filters.location
                    ? "לא נמצאו אתרים התואמים לחיפוש. נסה לשנות את הפילטרים."
                    : "התחל על ידי הוספת אתר ראשון."}
                </p>
                <div className="flex gap-2 justify-center">
                  {(filters.search || filters.statusId || filters.location) && (
                    <Button
                      variant="outline"
                      onClick={() =>
                        setFilters({ statusId: 0, search: "", location: "" })
                      }
                    >
                      נקה פילטרים
                    </Button>
                  )}
                  <Button onClick={() => setShowAddDialog(true)}>
                    הוסף אתר חדש
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Dialogs */}
        <AddSiteDialog
          open={showAddDialog}
          onOpenChange={setShowAddDialog}
          onAdd={handleAddSite}
        />

        <EditSiteDialog
          open={!!editingSite}
          onOpenChange={(open) => !open && setEditingSite(null)}
          site={editingSite}
          onEdit={handleEditSite}
        />

        <DeleteSiteDialog
          open={!!deletingSite}
          onOpenChange={(open) => !open && setDeletingSite(null)}
          site={deletingSite}
          onDelete={() => handleDeleteSite(deletingSite?.id)}
        />
      </div>
    </div>
  );
}
