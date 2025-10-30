import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/authStore";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/** Reglas simples de dominio → rol. Ajusta según tu institución */
function deriveRoleFromEmail(email: string): "estudiante" | "funcionario" | "externo" {
  const lower = email.toLowerCase().trim();

  // Estudiantes USM (ejemplo)
  if (/@alumnos\.usm\.cl$/.test(lower)) return "estudiante";

  // Funcionarios USM o U. Mayor (ajusta dominios aquí)
  if (/@usm\.cl$/.test(lower)) return "funcionario";
  if (/@umayor\.cl$/.test(lower)) return "funcionario";

  // Por defecto: público externo
  return "externo";
}

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const emailValid = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), [email]);
  const detectedRole = useMemo(() => (emailValid ? deriveRoleFromEmail(email) : null), [emailValid, email]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailValid) {
      setError("Ingresa un correo válido.");
      return;
    }
    setError("");
    const role = deriveRoleFromEmail(email);
    login(email, role);
    navigate("/");
  };

  return (
    <div className="min-h-[60vh] grid place-items-center p-6">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 space-y-5">
          <div>
            <h1 className="text-xl font-semibold">Ingresar</h1>
            <p className="text-sm text-muted-foreground">
              Escribe tu correo institucional o personal. El sistema asignará tu rol automáticamente.
            </p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm">Correo</label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nombre@alumnos.usm.cl"
                inputMode="email"
                autoFocus
              />
            </div>

            <div className="flex justify-between items-center gap-2">
              <Button type="button" variant="outline" onClick={() => navigate("/")}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-gradient-primary">
                Entrar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
