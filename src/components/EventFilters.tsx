import { useState } from "react";
import { Filter, Calendar, Tag, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const EventFilters = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

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

  const timeRanges = [
    { value: "hoy", label: "Hoy" },
    { value: "semana", label: "Esta semana" },
    { value: "mes", label: "Este mes" },
    { value: "siguiente", label: "Próximo mes" },
  ];

  const addFilter = (type: string, value: string) => {
    const filter = `${type}:${value}`;
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter(f => f !== filter));
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
  };

  const getFilterLabel = (filter: string) => {
    const [type, value] = filter.split(':');
    const allOptions = [...categories, ...audiences, ...timeRanges];
    const option = allOptions.find(opt => opt.value === value);
    return option?.label || value;
  };

  return (
    <div className="space-y-4">
      {/* Filter Toggle and Quick Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filtros
              {activeFilters.length > 0 && (
                <Badge variant="secondary" className="ml-1 px-1.5 py-0.5 text-xs">
                  {activeFilters.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="start">
            <Card className="border-0 shadow-none">
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Filtros de Eventos</h4>
                    {activeFilters.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAllFilters}
                        className="text-xs"
                      >
                        Limpiar todo
                      </Button>
                    )}
                  </div>

                  {/* Time Range */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      Tiempo
                    </div>
                    <Select onValueChange={(value) => addFilter('tiempo', value)}>
                      <SelectTrigger className="h-8">
                        <SelectValue placeholder="Seleccionar período" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeRanges.map((range) => (
                          <SelectItem key={range.value} value={range.value}>
                            {range.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Tag className="h-4 w-4" />
                      Categoría
                    </div>
                    <Select onValueChange={(value) => addFilter('categoria', value)}>
                      <SelectTrigger className="h-8">
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

                  {/* Audience */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Users className="h-4 w-4" />
                      Público Objetivo
                    </div>
                    <Select onValueChange={(value) => addFilter('publico', value)}>
                      <SelectTrigger className="h-8">
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
              </CardContent>
            </Card>
          </PopoverContent>
        </Popover>

        {/* Quick Time Filters */}
        {timeRanges.slice(0, 3).map((range) => (
          <Button
            key={range.value}
            variant={activeFilters.includes(`tiempo:${range.value}`) ? "default" : "outline"}
            size="sm"
            onClick={() => addFilter('tiempo', range.value)}
            className="text-xs"
          >
            {range.label}
          </Button>
        ))}
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Filtros activos:</span>
          {activeFilters.map((filter) => (
            <Badge
              key={filter}
              variant="secondary"
              className="gap-1 pr-1 text-xs"
            >
              {getFilterLabel(filter)}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFilter(filter)}
                className="h-4 w-4 p-0 hover:bg-destructive/10"
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventFilters;