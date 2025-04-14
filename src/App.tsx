
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AttendeeDashboard from "./pages/AttendeeDashboard";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import EventDetail from "./pages/EventDetail";
import CreateEvent from "./pages/CreateEvent";
import CategoryPage from "./pages/CategoryPage";
import NotFound from "./pages/NotFound";
import AuthCallback from "./pages/AuthCallback";
import PrivateRoute from "./components/auth/PrivateRoute";
import RoleRoute from "./components/auth/RoleRoute";
import NewsPage from "./pages/NewsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            
            {/* Protected Routes with Role-Based Access */}
            <Route path="/dashboard" element={
              <PrivateRoute>
                <AttendeeDashboard />
              </PrivateRoute>
            } />
            
            <Route path="/organizer/dashboard" element={
              <RoleRoute requiredRole="host_organizer">
                <OrganizerDashboard />
              </RoleRoute>
            } />
            
            <Route path="/event/:id" element={<EventDetail />} />
            
            <Route path="/create" element={
              <RoleRoute requiredRole="host_organizer">
                <CreateEvent />
              </RoleRoute>
            } />
            
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/explore" element={<CategoryPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
