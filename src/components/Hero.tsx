import { Calendar, Users, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import universityHero from "@/assets/university-hero.jpg";

const Hero = () => {
  const stats = [
    { icon: Calendar, label: "Eventos este mes", value: "47" },
    { icon: Users, label: "Participantes activos", value: "2.3K" },
    { icon: MapPin, label: "Ubicaciones", value: "12" },
    { icon: Clock, label: "Eventos hoy", value: "5" },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-20">
        <img 
          src={universityHero} 
          alt="Campus universitario"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero/80" />
      </div>

      <div className="container relative mx-auto px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          {/* Main Heading */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight lg:text-6xl">
            Eventos Universitarios
            <span className="block text-primary-lighter">Centralizados</span>
          </h1>
          
          <p className="mb-8 text-lg text-primary-lighter/90 lg:text-xl">
            Descubre, participa y organiza eventos académicos, culturales y deportivos 
            en tu universidad. Todo en un solo lugar.
          </p>

          {/* CTA Buttons */}
          <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 shadow-hero min-w-[200px]"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Ver Calendario
            </Button>
            <Button 
              size="lg" 
              variant="hero" 
              className="min-w-[200px]"
            >
              Explorar Eventos
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={index} className="border-white/20 bg-white/10 backdrop-blur-sm p-4 text-center">
                <stat.icon className="mx-auto mb-2 h-6 w-6 text-primary-lighter" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-primary-lighter/80">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;