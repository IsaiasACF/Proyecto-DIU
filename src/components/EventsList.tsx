import { useState } from "react";
import { Grid, List, Calendar, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventCard from "./EventCard";
import EventFilters from "./EventFilters";

const EventsList = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Datos de ejemplo para los eventos
  const sampleEvents = [
    {
      title: "Conferencia Internacional de Ingeniería",
      date: "25 Nov 2024",
      time: "09:00 - 17:00",
      location: "Auditorio Principal",
      organizer: "Facultad de Ingeniería",
      category: "Académico",
      audienceType: "Estudiantes",
      attendees: 156,
      maxAttendees: 200,
      description: "Conferencia con expertos internacionales sobre las últimas tendencias en ingeniería y tecnología. Incluye talleres prácticos y networking.",
      isHighlighted: true,
    },
    {
      title: "Festival Cultural Universitario",
      date: "28 Nov 2024",
      time: "18:00 - 22:00",
      location: "Plaza Central",
      organizer: "Extensión Cultural",
      category: "Cultural",
      audienceType: "Público",
      attendees: 324,
      maxAttendees: 500,
      description: "Celebración anual con presentaciones de danza, música y teatro de estudiantes y artistas invitados.",
    },
    {
      title: "Torneo Intercampus de Fútbol",
      date: "30 Nov 2024",
      time: "15:00 - 19:00",
      location: "Cancha de Fútbol",
      organizer: "Deportes Universitarios",
      category: "Deportivo",
      audienceType: "Estudiantes",
      attendees: 89,
      maxAttendees: 120,
      description: "Torneo entre las diferentes facultades. Inscripciones abiertas hasta el 28 de noviembre.",
    },
    {
      title: "Seminario de Emprendimiento Digital",
      date: "02 Dic 2024",
      time: "10:00 - 15:00",
      location: "Sala de Conferencias B",
      organizer: "Centro de Emprendimiento",
      category: "Conferencia",
      audienceType: "Estudiantes",
      attendees: 67,
      maxAttendees: 80,
      description: "Aprende sobre las herramientas digitales más efectivas para lanzar tu startup. Incluye casos de éxito y mentorías.",
    },
    {
      title: "Jornada de Puertas Abiertas",
      date: "05 Dic 2024",
      time: "08:00 - 16:00",
      location: "Campus Principal",
      organizer: "Admisiones",
      category: "Administrativo",
      audienceType: "Público",
      attendees: 245,
      description: "Evento para futuros estudiantes y sus familias. Incluye tours por las instalaciones y charlas informativas.",
    },
    {
      title: "Concierto de la Orquesta Universitaria",
      date: "08 Dic 2024",
      time: "20:00 - 22:00",
      location: "Teatro Universitario",
      organizer: "Conservatorio",
      category: "Cultural",
      audienceType: "Público",
      attendees: 178,
      maxAttendees: 300,
      description: "Concierto de fin de año con obras clásicas y contemporáneas interpretadas por la orquesta universitaria.",
    },
  ];

  const upcomingEvents = sampleEvents.slice(0, 3);
  const allEvents = sampleEvents;

  return (
    <div className="space-y-6">
      {/* Filters */}
      <EventFilters />

      <Tabs defaultValue="upcoming" className="w-full">
        <div className="flex items-center justify-between mb-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="upcoming" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Próximos Eventos
            </TabsTrigger>
            <TabsTrigger value="all" className="flex items-center gap-2">
              <List className="h-4 w-4" />
              Todos los Eventos
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="upcoming" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Eventos Destacados</h2>
              <p className="text-muted-foreground">Los eventos más relevantes de esta semana</p>
            </div>
            <Button variant="outline" className="gap-2">
              Ver todos
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className={`grid gap-6 ${
            viewMode === "grid" 
              ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" 
              : "grid-cols-1"
          }`}>
            {upcomingEvents.map((event, index) => (
              <EventCard key={index} {...event} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="all" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Todos los Eventos</h2>
              <p className="text-muted-foreground">{allEvents.length} eventos disponibles</p>
            </div>
          </div>

          <div className={`grid gap-6 ${
            viewMode === "grid" 
              ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" 
              : "grid-cols-1"
          }`}>
            {allEvents.map((event, index) => (
              <EventCard key={index} {...event} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventsList;