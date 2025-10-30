// src/components/Header.tsx
import { Search, Calendar, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/authStore";

type Props = {
  /** Muestra/oculta el buscador del encabezado */
  showSearch?: boolean;
  /** Si true, muestra "Volver al inicio" en vez de "Mis eventos" */
  showBackHome?: boolean;
};

const Header = ({ showSearch = true, showBackHome = false }: Props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, logout } = useAuth();

  // Estamos en la pantalla de creación
  const onCreatePage = pathname.startsWith("/crear-evento");

  // Si estamos en /crear-evento, no mostramos buscador
  const shouldShowSearch = showSearch && !onCreatePage;

  return (
    <header className="relative sticky top-0 z-50 border-b bg-background/60 backdrop-blur-md">
      {/* Overlay azul sutil para conservar el look original sobre la imagen de fondo */}
      <div className="pointer-events-none absolute inset-0 bg-primary/10" />

      <div className="relative container mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-3">
          {/* Logo y marca */}
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
              <Calendar className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="leading-none">
              <h1 className="font-bold text-foreground">EventosU</h1>
              <p className="text-xs text-muted-foreground">
                Sistema de Gestión de Eventos
              </p>
            </div>
          </div>

          {/* Buscador (controlado por shouldShowSearch) */}
          {shouldShowSearch ? (
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar eventos..."
                  className="pl-10 bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-primary/20"
                />
              </div>
            </div>
          ) : (
            <div className="flex-1" />
          )}

          {/* Acciones */}
          <div className="flex items-center gap-2">
            {/* Pill de rol detectado */}
            {user && (
              <span className="hidden sm:inline-flex items-center rounded-full border px-3 py-1 text-xs text-muted-foreground">
                Rol: <b className="ml-1 capitalize">{user.role}</b>
              </span>
            )}

            {/* Botón contextual: Mis eventos / Volver al inicio */}
            {showBackHome ? (
              <Button variant="outline" size="sm" onClick={() => navigate("/")}>
                Volver al inicio
              </Button>
            ) : (
              user && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/mis-eventos")}
                >
                  Mis eventos
                </Button>
              )
            )}

            {/* Crear evento (solo funcionario) y NO mostrar en /crear-evento */}
            {user?.role === "funcionario" && !onCreatePage && (
              <Button
                size="sm"
                className="bg-gradient-primary text-primary-foreground shadow-md hover:shadow-lg"
                onClick={() => navigate("/crear-evento")}
              >
                Publicar Evento
              </Button>
            )}

            {/* Login / Logout */}
            {!user ? (
              <Button variant="outline" size="sm" onClick={() => navigate("/login")}>
                <User className="h-4 w-4 mr-2" />
                Ingresar
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full border"
                onClick={logout}
                title="Cerrar sesión"
              >
                <LogOut className="h-4 w-4" />
                <span className="ml-2 hidden sm:inline">Cerrar sesión</span>
              </Button>
            )}
          </div>
        </div>

        {/* Buscador móvil si está habilitado */}
        {shouldShowSearch && (
          <div className="mt-4 md:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar eventos..."
                className="pl-10 bg-muted/50 border-0"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
