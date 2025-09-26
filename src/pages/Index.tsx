import Header from "@/components/Header";
import Hero from "@/components/Hero";
import EventsList from "@/components/EventsList";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <main className="container mx-auto px-6 py-12">
        <EventsList />
      </main>
      <Toaster />
    </div>
  );
};

export default Index;
