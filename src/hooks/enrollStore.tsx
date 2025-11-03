import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Role } from "@/hooks/authStore";

export type EnrollEvent = {
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
  attendeeEmail?: string;
  attendeeName?: string;
  attendeeRole?: Role; // "estudiante" | "funcionario" | "externo"
};

type EnrollContextType = {
  myEvents: EnrollEvent[];
  enrolledIds: string[];
  enroll: (ev: EnrollEvent) => void;
  unEnroll: (id: string) => void;
};

const EnrollContext = createContext<EnrollContextType>({
  myEvents: [],
  enrolledIds: [],
  enroll: () => {},
  unEnroll: () => {},
});

const STORAGE_KEY = "enrolledEvents";

export const EnrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [myEvents, setMyEvents] = useState<EnrollEvent[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setMyEvents(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(myEvents));
  }, [myEvents]);

  const enroll = (ev: EnrollEvent) => {
    setMyEvents(prev => (prev.some(e => e.id === ev.id) ? prev : [...prev, ev]));
  };

  const unEnroll = (id: string) => {
    setMyEvents(prev => prev.filter(e => e.id !== id));
  };

  const enrolledIds = useMemo(() => myEvents.map(e => e.id), [myEvents]);

  return (
    <EnrollContext.Provider value={{ myEvents, enrolledIds, enroll, unEnroll }}>
      {children}
    </EnrollContext.Provider>
  );
};

export const useEnroll = () => useContext(EnrollContext);

