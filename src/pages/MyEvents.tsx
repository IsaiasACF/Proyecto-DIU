import Header from "@/components/Header";
import EventCard from "@/components/EventCard";
import { useEnroll } from "@/hooks/enrollStore";

export default function MyEvents() {
  const { myEvents, unEnroll } = useEnroll();

  return (
    <div className="min-h-screen bg-background">
      <Header showSearch={false} showBackHome />

      <main className="container mx-auto px-6 py-12 space-y-6">
        <h1 className="text-3xl font-bold">Mis eventos</h1>

        {myEvents.length === 0 ? (
          <p className="text-muted-foreground">Aún no te has inscrito en ningún evento.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {myEvents.map((ev) => (
              <EventCard
                key={ev.id}
                {...(ev as any)}
                context="my"
                onEventDelete={() => unEnroll(ev.id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
