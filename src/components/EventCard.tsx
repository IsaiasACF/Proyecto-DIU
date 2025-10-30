// src/components/EventCard.tsx
import { Calendar, Clock, MapPin, Users, Tag, Edit3, X } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import EventEditForm from "./EventEditForm";
import { useEnroll } from "@/hooks/enrollStore";
import { useAuth } from "@/hooks/authStore";
import ExternalEnrollDialog from "@/components/ExternalEnrollDialog";

interface EventCardProps {
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
  fullDescription?: string;
  isHighlighted?: boolean;
  onEventUpdate?: (updatedEvent: any) => void;
  onEventDelete?: (eventId: string) => void;
  context?: "general" | "my";
}

const EventCard = (props: EventCardProps) => {
  const {
    id, title, date, time, location, organizer, category, audienceType, attendees,
    maxAttendees, description, fullDescription, isHighlighted = false,
    onEventUpdate, onEventDelete, context = "general",
  } = props;

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [openExternalEnroll, setOpenExternalEnroll] = useState(false);

  const { toast } = useToast();
  const { enroll, unEnroll, enrolledIds } = useEnroll();
  const { user } = useAuth();

  const isEnrolled = enrolledIds.includes(id);
  const aud = (audienceType || "").toLowerCase();

  const handleRegisterLogged = () => {
    if (user?.role === "externo" && aud === "estudiantes") {
      toast({ title: "No puedes inscribirte", description: "Este evento es solo para estudiantes.", variant: "destructive" });
      return;
    }
    enroll({ id, title, date, time, location, organizer, category, audienceType, attendees, maxAttendees, description, fullDescription, isHighlighted });
    toast({ title: "Listo", description: "Te inscribiste al evento." });
  };

  const handleRegister = () => {
    if (user) return handleRegisterLogged();
    if (aud === "público" || aud === "publico") {
      setOpenExternalEnroll(true);
    } else {
      toast({ title: "Requiere inicio de sesión", description: "Para este evento debes iniciar sesión.", variant: "destructive" });
    }
  };

  const handleExternalConfirm = (data: { email: string; name?: string; inferredRole: "estudiante" | "funcionario" | "externo" }) => {
    enroll({
      id, title, date, time, location, organizer, category, audienceType,
      attendees, maxAttendees, description, fullDescription, isHighlighted,
      attendeeEmail: data.email,
      attendeeName: data.name,
      attendeeRole: data.inferredRole,
    });
    toast({ title: "Inscripción registrada", description: "Te hemos inscrito usando tu correo." });
  };

  const handleLeave = () => {
    unEnroll(id);
    toast({ title: "Eliminado", description: "Saliste del evento." });
    onEventDelete?.(id);
  };

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
      "público": "border-success/20 bg-success/5 text-success",
      interno: "border-muted text-muted-foreground bg-muted/20",
    };
    return colors[audience.toLowerCase()] || "border-muted text-muted-foreground";
  };

  return (
    <Card className={`group hover:shadow-lg transition-all duration-200 ${isHighlighted ? 'ring-2 ring-primary/20 shadow-md' : ''}`}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">{organizer}</p>
          </div>
          <div className="flex flex-col gap-2 ml-4">
            <Badge className={`pointer-events-none ${getCategoryColor(category)} hover:bg-inherit hover:text-inherit`} variant="secondary">
              <Tag className="h-3 w-3 mr-1" />
              {category}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2 text-primary" />
            {date}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-2 text-primary" />
            {time}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2 text-primary" />
            {location}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-2 text-primary" />
            {attendees} {maxAttendees && `/ ${maxAttendees}`} participantes
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Badge variant="outline" className={`pointer-events-none ${getAudienceColor(audienceType)} hover:bg-inherit hover:text-inherit`}>
            {audienceType}
          </Badge>

          <div className="flex gap-2">
            {/* ✅ Editar SOLO funcionarios */}
            {user?.role === "funcionario" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditOpen(true)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Edit3 className="h-4 w-4" />
              </Button>
            )}

            {/* Más info */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  Más info
                </Button>
              </DialogTrigger>
              <DialogContent
                className="
                  sm:max-w-4xl w-[95%] p-0 gap-0 overflow-hidden
                  [&>button.absolute]:hidden
                "
              >
                {/* X roja sticky */}
                <div className="sticky top-0 z-20 flex justify-end bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/80 p-3 border-b">
                  <DialogClose asChild>
                    <button
                      aria-label="Cerrar"
                      className="
                        inline-flex h-8 w-8 items-center justify-center
                        rounded-md border border-destructive
                        bg-destructive text-destructive-foreground
                        hover:bg-destructive/90 transition-colors shadow-sm
                      "
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </DialogClose>
                </div>

                <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
                    <p className="text-lg text-muted-foreground">{organizer}</p>
                    <div className="flex gap-2 mt-2">
                      <Badge className={`pointer-events-none ${getCategoryColor(category)} hover:bg-inherit hover:text-inherit`} variant="secondary">
                        <Tag className="h-4 w-4 mr-2" />
                        {category}
                      </Badge>
                      <Badge variant="outline" className={`pointer-events-none ${getAudienceColor(audienceType)} hover:bg-inherit hover:text-inherit`}>
                        {audienceType}
                      </Badge>
                    </div>
                  </DialogHeader>

                  <div className="space-y-6 mt-6">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">Descripción</h3>
                      <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                        {fullDescription || description}
                      </div>
                    </div>
                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-sm">Fecha</p>
                          <p className="text-sm text-muted-foreground">{date}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-sm">Horario</p>
                          <p className="text-sm text-muted-foreground">{time}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-sm">Ubicación</p>
                          <p className="text-sm text-muted-foreground">{location}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <Users className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-sm">Participantes</p>
                          <p className="text-sm text-muted-foreground">
                            {attendees} {maxAttendees && `/ ${maxAttendees}`} inscritos
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* sin botones de acción dentro del modal */}
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* CTA principal en la tarjeta */}
            {context === "my" ? (
              <Button size="sm" variant="outline" onClick={handleLeave}>
                Salir del evento
              </Button>
            ) : isEnrolled ? (
              <Button size="sm" variant="outline" onClick={handleLeave}>
                Quitar
              </Button>
            ) : (
              <Button size="sm" className="bg-gradient-primary" onClick={handleRegister}>
                Inscribirse
              </Button>
            )}
          </div>
        </div>

        <EventEditForm
          event={props}
          isOpen={isEditOpen}
          onOpenChange={setIsEditOpen}
          onEventUpdate={onEventUpdate}
          onEventDelete={onEventDelete || (() => {})}
        />
      </CardContent>

      {/* Modal para inscripción sin login */}
      <ExternalEnrollDialog
        open={openExternalEnroll}
        onOpenChange={setOpenExternalEnroll}
        onConfirm={handleExternalConfirm}
      />
    </Card>
  );
};

export default EventCard;
