import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { LogOut, Home, Building2, Users, Clock, Wrench } from "lucide-react";
//import { useAppDispatch, useAuth } from '../store/hooks';
//import { logoutAsync } from '../store/slices/authSlice';
import { toast } from "sonner";

export function Navigation() {
  const location = useLocation();
  //const dispatch = useAppDispatch();
  //const { user, loading } = useAuth();

  /*const handleLogout = async () => {
    try {
      await dispatch(logoutAsync()).unwrap();
      toast.success('התנתקת בהצלחה');
    } catch (error) {
      toast.error('שגיאה בהתנתקות');
    }
  };*/

  const navItems = [
    { to: "/home", label: "בית", icon: Home },
    { to: "/sites", label: "אתרי בנייה", icon: Building2 },
    { to: "/employees", label: "עובדים", icon: Users },
    { to: "/equipment", label: "ציוד", icon: Wrench },
    { to: "/hours", label: "שעות עבודה", icon: Clock },
  ];

  return (
    <nav className="bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/home" className="flex items-center space-x-3">
              <Building2 className="h-8 w-8 text-primary" />
              <span className="text-lg font-semibold text-foreground">
                ניהול אתרי בנייה
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                  location.pathname === to
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <select
              value={location.pathname}
              onChange={(e) => (window.location.href = e.target.value)}
              className="bg-background border border-border rounded-md px-3 py-2 text-sm"
            >
              {navItems.map(({ to, label }) => (
                <option key={to} value={to}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/*8user && (
              <div className="hidden md:flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  שלום, {user.name || user.email}
                </span>
              </div>
            )*/}

            <Button
              // onClick={handleLogout}
              variant="outline"
              size="sm"
              // disabled={loading}
              className="flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">התנתק</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className="md:hidden border-t border-border">
          <div className="flex overflow-x-auto py-2 space-x-1">
            {navItems.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm whitespace-nowrap transition-colors ${
                  location.pathname === to
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
