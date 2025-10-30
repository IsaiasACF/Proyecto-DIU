import Index from "@/pages/Index";
import CreateEvent from "@/pages/CreateEvent";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/Login";
import MyEvents from "@/pages/MyEvents";

import ProtectedRoute from "@/components/ProtectedRoute";
import { AuthProvider } from "@/hooks/authStore";
import { EnrollProvider } from "@/hooks/enrollStore";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as Sonner } from "@/components/ui/sonner";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* tostadores globales */}
      <Toaster />
      <Sonner />
      {/* providers de auth e inscripciones */}
      <AuthProvider>
        <EnrollProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />

              {/* crear: solo funcionarios */}
              <Route
                path="/crear-evento"
                element={
                  <ProtectedRoute allowed={["funcionario"]}>
                    <CreateEvent />
                  </ProtectedRoute>
                }
              />

              {/* Mis eventos: requiere sesión (cualquier rol) */}
              <Route
                path="/mis-eventos"
                element={
                  <ProtectedRoute allowed={["estudiante", "funcionario", "externo"]}>
                    <MyEvents />
                  </ProtectedRoute>
                }
              />

              {/* catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </EnrollProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
