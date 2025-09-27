import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin, Users, Tag, FileText, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";

const CreateEvent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    organizer: "",
    category: "",
    audienceType: "",
  });

  const categories = [
    { value: "academico", label: "Académico" },
    { value: "cultural", label: "Cultural" },
    { value: "deportivo", label: "Deportivo" },
    { value: "conferencia", label: "Conferencia" },
    { value: "administrativo", label: "Administrativo" },
  ];

  const audiences = [
    { value: "estudiantes", label: "Estudiantes" },
    { value: "funcionarios", label: "Funcionarios" },
    { value: "publico", label: "Público General" },
    { value: "interno", label: "Comunidad Interna" },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.title || !formData.date || !formData.time || !formData.location || !formData.category || !formData.audienceType) {
      toast({
        title: "Error",
        description: "Por favor complete todos los campos obligatorios",
        variant: "destructive",
      });
      return;
    }

    // Crear el evento
    const newEvent = {
      id: `user-${Date.now()}`,
      ...formData,
      attendees: 0,
      maxAttendees: Math.floor(Math.random() * 300) + 50, // Capacidad aleatoria para demo
      isHighlighted: false,
    };

    // Guardar en localStorage (solución temporal)
    const existingEvents = JSON.parse(localStorage.getItem('userEvents') || '[]');
    existingEvents.push(newEvent);
    localStorage.setItem('userEvents', JSON.stringify(existingEvents));

    toast({
      title: "¡Evento creado exitosamente!",
      description: "Tu evento ha sido publicado y aparecerá en la lista principal.",
    });

    // Redirigir a la página principal
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Crear Nuevo Evento</h1>
              <p className="text-muted-foreground">Completa los detalles de tu evento para publicarlo</p>
            </div>
          </div>

          {/* Formulario */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Información del Evento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Título */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Título del evento *
                  </Label>
                  <Input
                    id="title"
                    placeholder="Ej: Conferencia Internacional de Ingeniería"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full"
                  />
                </div>

                {/* Descripción */}
                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe tu evento, incluye detalles importantes, agenda, etc."
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>

                {/* Fecha y Hora */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Fecha *
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time" className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Hora *
                    </Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => handleInputChange('time', e.target.value)}
                    />
                  </div>
                </div>

                {/* Lugar y Organizador */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location" className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Lugar *
                    </Label>
                    <Input
                      id="location"
                      placeholder="Ej: Auditorio Principal"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="organizer">Organizador</Label>
                    <Input
                      id="organizer"
                      placeholder="Ej: Facultad de Ingeniería"
                      value={formData.organizer}
                      onChange={(e) => handleInputChange('organizer', e.target.value)}
                    />
                  </div>
                </div>

                {/* Categoría y Público Objetivo */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      Categoría *
                    </Label>
                    <Select onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Público Objetivo *
                    </Label>
                    <Select onValueChange={(value) => handleInputChange('audienceType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar público" />
                      </SelectTrigger>
                      <SelectContent>
                        {audiences.map((audience) => (
                          <SelectItem key={audience.value} value={audience.value}>
                            {audience.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Botones */}
                <div className="flex justify-end gap-4 pt-6">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => navigate('/')}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-gradient-primary text-primary-foreground shadow-md hover:shadow-lg"
                  >
                    Publicar Evento
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CreateEvent;