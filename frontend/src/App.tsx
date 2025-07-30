import React from "react";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
//import { store } from "./store/store";
//import { LoginPage } from "../components/LoginPage";
//import { HomePage } from "./components/HomePage";import
import { SitesPage } from "./pages/SitesPage";
//import { SiteDetailsPage } from "./components/SiteDetailsPage";
import { EmployeesPage } from "./pages/EmployeesPage";
//import { WorkHoursPage } from "./components/WorkHoursPage";
////import { EquipmentPage } from "./components/EquipmentPage";
import { Navigation } from "./components/Navigation";
import { Toaster } from "./ui/sonner";
//import { useAuth } from './store/hooks';

// Protected Route Component - חייב להיות בתוך Provider
/*function ProtectedRoute({ children }: { children: React.ReactNode }) {
  //const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}*/

// Layout Component for authenticated pages
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 w-full">{children}</main>
      <Toaster />
    </div>
  );
}

// App Routes - בתוך Provider
function App() {
  return (
    <Routes>
      <Route
        path="/sites"
        element={
          <Layout>
            <SitesPage />
          </Layout>
        }
      />
      <Route
        path="/employees"
        element={
          <Layout>
            <EmployeesPage />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
/*
<Routes>
        /* Public Routes */
/*
        <Route path="/login" element={<LoginPage />} />
        
         Protected Routes 
        <Route path="/" element={
          <ProtectedRoute>
            <Layout>
              <HomePage />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/home" element={
          <ProtectedRoute>
            <Layout>
              <HomePage />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/sites" element={
          <ProtectedRoute>
            <Layout>
              <SitesPage />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/sites/:siteId" element={
          <ProtectedRoute>
            <Layout>
              <SiteDetailsPage />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/employees" element={
          <ProtectedRoute>
            <Layout>
              <EmployeesPage />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/equipment" element={
          <ProtectedRoute>
            <Layout>
              <EquipmentPage />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/hours" element={
          <ProtectedRoute>
            <Layout>
              <WorkHoursPage />
            </Layout>
          </ProtectedRoute>
        } />

        /* Redirect any unknown routes to home *
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
*/
