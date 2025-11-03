import Header from "@/components/Header";
import EventsList from "@/components/EventsList";
import { Toaster } from "@/components/ui/toaster";
import universityHero from "@/assets/university-hero.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header showSearch={false} />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={universityHero} className="h-full w-full object-cover" alt="Campus universitario" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative container mx-auto px-6 py-16 text-center text-white">
          <h1 className="text-4xl font-bold">
            Eventos Universitarios <span className="block">Centralizados</span>
          </h1>
          <p className="mt-3 max-w-3xl mx-auto text-white/90">
            Descubre, participa y organiza eventos académicos, culturales y deportivos en tu universidad.
            Todo en un solo lugar.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-6 py-10">
        <EventsList />
      </main>
      <Toaster />
    </div>
  );
};

export default Index;
