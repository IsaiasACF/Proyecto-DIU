import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Calendar, Clock, MapPin, Users, Tag, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  category: string;
  audienceType: string;
  attendees: number;
  maxAttendees?: number;
  description: string;
  isHighlighted?: boolean;
}

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    // Datos de ejemplo para los eventos
    const sampleEvents = [
      {
        id: "1",
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
        id: "2",
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
        id: "3",
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
        id: "4",
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
        id: "5",
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
        id: "6",
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

    // Cargar eventos del usuario desde localStorage
    const userEvents = JSON.parse(localStorage.getItem('userEvents') || '[]');
    const allEvents = [...sampleEvents, ...userEvents];
    
    const foundEvent = allEvents.find(event => event.id === id);
    setEvent(foundEvent || null);
  }, [id]);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      academico: "bg-primary text-primary-foreground",
      cultural: "bg-accent text-accent-foreground",
      deportivo: "bg-success text-success-foreground",
      administrativo: "bg-muted text-muted-foreground",
      conferencia: "bg-warning text-warning-foreground",
    };
    return colors[category.toLowerCase()] || "bg-muted text-muted-foreground";
  };

  const getAudienceColor = (audience: string) => {
    const colors: Record<string, string> = {
      estudiantes: "border-primary/20 bg-primary/5 text-primary",
      funcionarios: "border-accent/20 bg-accent/5 text-accent",
      publico: "border-success/20 bg-success/5 text-success",
      interno: "border-muted text-muted-foreground bg-muted/20",
    };
    return colors[audience.toLowerCase()] || "border-muted text-muted-foreground";
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-foreground mb-4">Evento no encontrado</h1>
            <Button onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al inicio
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a eventos
        </Button>

        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden">
            <CardHeader className="pb-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    {event.title}
                  </h1>
                  <p className="text-lg text-muted-foreground">{event.organizer}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Badge className={getCategoryColor(event.category)} variant="secondary">
                    <Tag className="h-4 w-4 mr-2" />
                    {event.category}
                  </Badge>
                  <Badge variant="outline" className={getAudienceColor(event.audienceType)}>
                    {event.audienceType}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">Descripción</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {event.description}
                </p>
              </div>

              <Separator />

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Detalles del evento</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-5 w-5 mr-3 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Fecha</p>
                      <p>{event.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="h-5 w-5 mr-3 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Horario</p>
                      <p>{event.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-5 w-5 mr-3 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Ubicación</p>
                      <p>{event.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Users className="h-5 w-5 mr-3 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Participantes</p>
                      <p>{event.attendees} {event.maxAttendees && `/ ${event.maxAttendees}`} inscritos</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="bg-gradient-primary flex-1">
                  Inscribirse al evento
                </Button>
                <Button variant="outline" size="lg">
                  Compartir evento
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default EventDetails;