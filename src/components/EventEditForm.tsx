import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface EventEditFormProps {
  event: {
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
  };
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onEventUpdate: (updatedEvent: any) => void;
}

const EventEditForm = ({ event, isOpen, onOpenChange, onEventUpdate }: EventEditFormProps) => {
  const [formData, setFormData] = useState(event);
  const { toast } = useToast();

  // Sincronizar formData cuando el evento cambie
  useEffect(() => {
    setFormData(event);
  }, [event]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Guardando evento:', formData); // Debug log
    onEventUpdate(formData);
    toast({
      title: "Evento actualizado",
      description: "Los cambios se han guardado exitosamente.",
    });
    onOpenChange(false);
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Evento</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="title">Título del evento</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="date">Fecha</Label>
              <Input
                id="date"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                placeholder="DD MMM YYYY"
                required
              />
            </div>

            <div>
              <Label htmlFor="time">Horario</Label>
              <Input
                id="time"
                value={formData.time}
                onChange={(e) => handleChange('time', e.target.value)}
                placeholder="HH:MM - HH:MM"
                required
              />
            </div>

            <div>
              <Label htmlFor="location">Ubicación</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="organizer">Organizador</Label>
              <Input
                id="organizer"
                value={formData.organizer}
                onChange={(e) => handleChange('organizer', e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Categoría</Label>
              <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Académico">Académico</SelectItem>
                  <SelectItem value="Cultural">Cultural</SelectItem>
                  <SelectItem value="Deportivo">Deportivo</SelectItem>
                  <SelectItem value="Administrativo">Administrativo</SelectItem>
                  <SelectItem value="Conferencia">Conferencia</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="audienceType">Tipo de audiencia</Label>
              <Select value={formData.audienceType} onValueChange={(value) => handleChange('audienceType', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Estudiantes">Estudiantes</SelectItem>
                  <SelectItem value="Funcionarios">Funcionarios</SelectItem>
                  <SelectItem value="Público">Público</SelectItem>
                  <SelectItem value="Interno">Interno</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="attendees">Participantes actuales</Label>
              <Input
                id="attendees"
                type="number"
                value={formData.attendees}
                onChange={(e) => handleChange('attendees', parseInt(e.target.value) || 0)}
                min="0"
              />
            </div>

            <div>
              <Label htmlFor="maxAttendees">Capacidad máxima (opcional)</Label>
              <Input
                id="maxAttendees"
                type="number"
                value={formData.maxAttendees || ''}
                onChange={(e) => handleChange('maxAttendees', parseInt(e.target.value) || undefined)}
                min="0"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Descripción breve</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={3}
              required
            />
          </div>

          <div>
            <Label htmlFor="fullDescription">Descripción completa</Label>
            <Textarea
              id="fullDescription"
              value={formData.fullDescription || ''}
              onChange={(e) => handleChange('fullDescription', e.target.value)}
              rows={8}
              placeholder="Descripción detallada del evento que aparecerá en 'Más info'"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              Guardar cambios
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventEditForm;