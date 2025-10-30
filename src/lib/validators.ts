// src/lib/validators.ts
export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Ajusta estos dominios a tu realidad institucional:
const STUDENT_DOMAINS = ["alumnos.usm.cl", "estudiantes.usm.cl"];
const STAFF_DOMAINS   = ["usm.cl", "funcionarios.usm.cl"];

export type InferredRole = "estudiante" | "funcionario" | "externo";

export function inferRoleByEmail(email: string): InferredRole {
  const domain = email.split("@")[1]?.toLowerCase() || "";
  if (STUDENT_DOMAINS.some(d => domain === d)) return "estudiante";
  if (STAFF_DOMAINS.some(d => domain === d))   return "funcionario";
  return "externo";
}
