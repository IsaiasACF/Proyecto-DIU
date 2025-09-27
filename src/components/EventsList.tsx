import { useState, useMemo, useEffect } from "react";
import { Grid, List, Calendar, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventCard from "./EventCard";
import EventFilters from "./EventFilters";

const EventsList = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [userEvents, setUserEvents] = useState<any[]>([]);
  const [sampleEventsState, setSampleEventsState] = useState([]);

  // Cargar eventos del usuario desde localStorage
  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem('userEvents') || '[]');
    setUserEvents(savedEvents);
    
    // Inicializar eventos de muestra
    setSampleEventsState(sampleEvents);
  }, []);

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
      fullDescription: "Esta conferencia magistral reunirá a los más destacados ingenieros e investigadores de América Latina para compartir sus descubrimientos más recientes en áreas como inteligencia artificial, robótica, ingeniería biomédica y desarrollo sostenible.\n\nLos participantes tendrán la oportunidad de asistir a ponencias magistrales, talleres interactivos y sesiones de networking que les permitirán establecer conexiones valiosas con expertos del área.\n\nEste evento está dirigido especialmente a estudiantes de ingeniería, investigadores jóvenes y profesores universitarios interesados en fortalecer sus competencias técnicas y conocer las tendencias más actuales en el campo de la ingeniería.\n\nAgenda del evento:\n• 09:00 - 09:30: Registro y bienvenida\n• 09:30 - 10:30: Conferencia magistral: 'IA y el futuro de la ingeniería'\n• 10:30 - 11:00: Pausa para café y networking\n• 11:00 - 12:30: Mesa redonda: 'Ingeniería sostenible y medio ambiente'\n• 12:30 - 14:00: Almuerzo\n• 14:00 - 15:30: Talleres paralelos de robótica y automatización\n• 15:30 - 16:00: Pausa\n• 16:00 - 17:00: Presentación de proyectos estudiantiles y clausura",
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
      fullDescription: "El Festival Cultural Universitario es la celebración más esperada del año académico, donde convergen todas las expresiones artísticas de nuestra comunidad estudiantil y artistas invitados de reconocida trayectoria.\n\nEste evento gratuito y abierto al público general promete una noche inolvidable con espectáculos de danza contemporánea, folklórica, presentaciones musicales que van desde música clásica hasta géneros modernos, obras de teatro estudiantil y exposiciones de artes plásticas.\n\nEl festival cuenta con la participación especial del grupo de danza 'Raíces Latinoamericanas', la orquesta sinfónica juvenil de la ciudad y el grupo de teatro experimental 'Nuevas Voces'.\n\nProgramación:\n• 18:00 - 18:30: Inauguración y presentación del coro universitario\n• 18:30 - 19:15: Espectáculo de danza folklórica\n• 19:15 - 19:45: Presentaciones musicales estudiantiles\n• 19:45 - 20:30: Obra de teatro: 'Voces del Futuro'\n• 20:30 - 21:00: Intermedio y exposición de artes plásticas\n• 21:00 - 21:45: Concierto de la banda universitaria\n• 21:45 - 22:00: Cierre con espectáculo de fuegos artificiales\n\nHabrá stands de comida típica y artesanías locales durante todo el evento.",
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
      fullDescription: "El Torneo Intercampus de Fútbol es la competencia deportiva más emocionante del semestre, donde los equipos representativos de cada facultad se enfrentan en un formato eliminatorio para determinar al campeón universitario.\n\nEste torneo promueve el deporte, la sana competencia y el compañerismo entre estudiantes de diferentes carreras. Cada equipo estará conformado por 11 jugadores titulares y 5 suplentes, todos debidamente inscritos como estudiantes activos.\n\nRequisitos de participación:\n• Estudiante activo de ingeniería o áreas afines\n• Registro previo obligatorio\n• Llevar identificación institucional\n• Laptop personal para talleres prácticos\n\nPremios:\n• Primer lugar: Trofeo y $500.000 en premios para el equipo\n• Segundo lugar: Medallas y $300.000 en premios\n• Tercer lugar: Medallas y $200.000 en premios\n• Mejor jugador del torneo: Trofeo individual y beca deportiva\n\nCalendario de partidos:\n• 15:00 - 15:45: Ceremonia de inauguración\n• 16:00 - 16:30: Ingeniería vs. Ciencias\n• 16:45 - 17:15: Medicina vs. Derecho\n• 17:30 - 18:00: Semifinal 1\n• 18:15 - 18:45: Semifinal 2\n• 19:00 - 19:30: Final y premiación\n\nSe proporcionará hidratación y refrigerios para todos los participantes.",
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
      fullDescription: "El Seminario de Emprendimiento Digital está diseñado para estudiantes y graduados que desean transformar sus ideas innovadoras en negocios exitosos utilizando las herramientas y estrategias digitales más actuales del mercado.\n\nEste evento intensivo combina conferencias magistrales con talleres prácticos, donde los participantes aprenderán desde la conceptualización de la idea hasta la implementación y escalamiento de su startup digital.\n\nConferenciistas destacados:\n• María González - CEO de TechStart Latam\n• Carlos Mendoza - Director de Innovación en Google México\n• Ana Rodríguez - Fundadora de tres startups exitosas\n• Roberto Silva - Especialista en financiamiento para emprendedores\n\nTemas a desarrollar:\n• Validación de ideas de negocio en el mercado digital\n• Desarrollo de MVP (Producto Mínimo Viable)\n• Estrategias de marketing digital y redes sociales\n• Modelos de negocio digitales rentables\n• Financiamiento y búsqueda de inversores\n• Herramientas tecnológicas esenciales para startups\n• Casos de éxito y fracasos en el ecosistema emprendedor\n\nProgramación detallada:\n• 10:00 - 10:30: Registro y networking inicial\n• 10:30 - 11:30: 'Del concepto a la realidad digital'\n• 11:30 - 12:00: Pausa y networking\n• 12:00 - 13:00: Taller práctico: 'Construye tu MVP'\n• 13:00 - 14:00: Almuerzo\n• 14:00 - 14:45: 'Financiamiento para startups'\n• 14:45 - 15:00: Sesión de mentoría grupal\n\nIncluye certificado de participación y kit de emprendedor.",
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
      fullDescription: "La Jornada de Puertas Abiertas es el evento más importante del año para futuros estudiantes y sus familias, diseñado para brindar una experiencia completa y detallada de lo que significa ser parte de nuestra comunidad universitaria.\n\nEste evento gratuito permite conocer de primera mano nuestras instalaciones, laboratorios, bibliotecas, espacios deportivos y culturales, además de interactuar directamente con docentes, estudiantes actuales y personal administrativo.\n\nActividades programadas:\n• Tours guiados por estudiantes embajadores\n• Charlas informativas sobre cada programa académico\n• Demostraciones en laboratorios especializados\n• Simulacros de clases magistrales\n• Información sobre becas y financiamiento\n• Actividades deportivas y culturales\n• Feria de organizaciones estudiantiles\n\nProgramas académicos participantes:\n• Ingeniería (todas las especialidades)\n• Ciencias de la Salud\n• Ciencias Sociales y Humanidades\n• Ciencias Exactas y Naturales\n• Artes y Diseño\n• Administración y Negocios\n\nItinerario por horarios:\n• 08:00 - 09:00: Registro y bienvenida en el hall principal\n• 09:00 - 10:00: Charla general sobre la universidad\n• 10:00 - 12:00: Tours por facultades (grupos de 15 personas)\n• 12:00 - 13:00: Almuerzo en la cafetería central\n• 13:00 - 14:30: Charlas específicas por carrera\n• 14:30 - 15:30: Visita a laboratorios y talleres\n• 15:30 - 16:00: Sesión de preguntas y respuestas\n\nInformación práctica:\n• Evento completamente gratuito\n• No requiere inscripción previa\n• Se otorgarán materiales informativos\n• Parqueadero disponible sin costo\n• Servicio de cafetería y restaurante abierto",
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
      fullDescription: "El Concierto de la Orquesta Universitaria marca el cierre del año académico con una velada musical excepcional que celebra el talento de nuestros estudiantes y la riqueza del repertorio clásico y contemporáneo.\n\nBajo la dirección del maestro Eduardo Fernández, la orquesta presentará un programa cuidadosamente seleccionado que incluye desde las grandes obras del período romántico hasta composiciones contemporáneas de autores latinoamericanos.\n\nEste evento representa el resultado de un año completo de ensayos, perfeccionamiento técnico y crecimiento artístico de los 45 músicos que conforman la orquesta, incluyendo estudiantes de música, pero también de otras carreras que cultivan su pasión musical.\n\nPrograma musical:\n\nPrimera parte:\n• Obertura de 'El Barbero de Sevilla' - Gioachino Rossini\n• Concierto para piano No. 1 en Mi menor, Op. 11 - Frédéric Chopin\n  Solista: Laura Martínez (estudiante de 4to año)\n• Sinfonía No. 40 en Sol menor, K. 550 - Wolfgang Amadeus Mozart\n\nIntermedio (15 minutos)\n\nSegunda parte:\n• Suite 'Estancia' - Alberto Ginastera\n• Danzas Sinfónicas de 'West Side Story' - Leonard Bernstein\n• Como cierre especial: 'Libertango' - Astor Piazzolla\n  Con la participación del Coro Universitario\n\nInformación del evento:\n• Entrada libre hasta completar aforo\n• Recomendamos llegar 30 minutos antes\n• Vestimenta sugerida: elegante casual\n• Duración aproximada: 2 horas con intermedio\n• Se otorgarán programas de mano con información de las obras\n• Servicio de guardarropa disponible\n\nEste concierto también contará con la participación especial de exalumnos músicos profesionales y será transmitido en vivo por la radio universitaria.",
    },
  ];

  // Función para actualizar eventos
  const handleEventUpdate = (updatedEvent: any) => {
    console.log('Actualizando evento:', updatedEvent); // Debug log
    // Actualizar en eventos de muestra si es uno de ellos
    const sampleEventIndex = sampleEventsState.findIndex(e => e.id === updatedEvent.id);
    if (sampleEventIndex !== -1) {
      const newSampleEvents = [...sampleEventsState];
      newSampleEvents[sampleEventIndex] = { ...newSampleEvents[sampleEventIndex], ...updatedEvent };
      setSampleEventsState(newSampleEvents);
      console.log('Evento de muestra actualizado'); // Debug log
    } else {
      // Actualizar en eventos del usuario
      const userEventIndex = userEvents.findIndex(e => e.id === updatedEvent.id);
      if (userEventIndex !== -1) {
        const newUserEvents = [...userEvents];
        newUserEvents[userEventIndex] = { ...newUserEvents[userEventIndex], ...updatedEvent };
        setUserEvents(newUserEvents);
        localStorage.setItem('userEvents', JSON.stringify(newUserEvents));
        console.log('Evento de usuario actualizado'); // Debug log
      }
    }
  };

  // Combinar eventos predefinidos con eventos del usuario
  const allEventsData = [...sampleEventsState, ...userEvents];

  const filterEvents = (events: typeof allEventsData) => {
    if (activeFilters.length === 0) return events;

    return events.filter(event => {
      return activeFilters.every(filter => {
        const [type, value] = filter.split(':');
        
        switch (type) {
          case 'categoria':
            return event.category.toLowerCase() === value;
          case 'publico':
            return value === 'todo' || event.audienceType.toLowerCase() === value;
          case 'tiempo':
            const eventDate = new Date(event.date.split(' ').reverse().join('-'));
            const today = new Date();
            const oneWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
            const oneMonth = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
            
            switch (value) {
              case 'hoy':
                return eventDate.toDateString() === today.toDateString();
              case 'semana':
                return eventDate >= today && eventDate <= oneWeek;
              case 'mes':
                return eventDate >= today && eventDate <= oneMonth;
              case 'siguiente':
                const nextMonth = new Date(today.getTime() + 60 * 24 * 60 * 60 * 1000);
                return eventDate > oneMonth && eventDate <= nextMonth;
              default:
                return true;
            }
          default:
            return true;
        }
      });
    });
  };

  const filteredAllEvents = useMemo(() => filterEvents(allEventsData), [activeFilters, userEvents, sampleEventsState]);
  const filteredUpcomingEvents = useMemo(() => filterEvents(allEventsData.slice(0, 3)), [activeFilters, userEvents, sampleEventsState]);

  const handleFiltersChange = (filters: string[]) => {
    setActiveFilters(filters);
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <EventFilters onFiltersChange={handleFiltersChange} />

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
            {filteredUpcomingEvents.map((event, index) => (
              <EventCard key={`upcoming-${event.id || index}`} {...event} onEventUpdate={handleEventUpdate} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="all" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Todos los Eventos</h2>
              <p className="text-muted-foreground">{filteredAllEvents.length} eventos disponibles</p>
            </div>
          </div>

          <div className={`grid gap-6 ${
            viewMode === "grid" 
              ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" 
              : "grid-cols-1"
          }`}>
            {filteredAllEvents.map((event, index) => (
              <EventCard key={`all-${event.id || index}`} {...event} onEventUpdate={handleEventUpdate} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventsList;