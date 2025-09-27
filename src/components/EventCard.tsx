import { Calendar, Clock, MapPin, Users, Tag } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
  isHighlighted?: boolean;
}

const EventCard = ({
  id,
  title,
  date,
  time,
  location,
  organizer,
  category,
  audienceType,
  attendees,
  maxAttendees,
  description,
  isHighlighted = false,
}: EventCardProps) => {
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
            <Badge className={getCategoryColor(category)} variant="secondary">
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
          <Badge variant="outline" className={getAudienceColor(audienceType)}>
            {audienceType}
          </Badge>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to={`/evento/${id}`}>
                Más info
              </Link>
            </Button>
            <Button size="sm" className="bg-gradient-primary">
              Inscribirse
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;