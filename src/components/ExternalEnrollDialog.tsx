// src/components/ExternalEnrollDialog.tsx
import { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { isValidEmail, inferRoleByEmail } from "@/lib/validators";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onConfirm: (data: { email: string; name?: string; inferredRole: "estudiante" | "funcionario" | "externo" }) => void;
};

export default function ExternalEnrollDialog({ open, onOpenChange, onConfirm }: Props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [touched, setTouched] = useState(false);

  const valid = useMemo(() => isValidEmail(email), [email]);
  const inferred = useMemo(() => (valid ? inferRoleByEmail(email) : null), [valid, email]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;
    onConfirm({ email, name: name.trim() || undefined, inferredRole: inferred! });
    // limpiar y cerrar
    setEmail("");
    setName("");
    setTouched(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={(v)=>{ onOpenChange(v); if (!v){ setEmail(""); setName(""); setTouched(false); } }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Inscribirse con correo</DialogTitle>
          <DialogDescription>
            Ingresa tu correo (y opcionalmente tu nombre) para inscribirte. No es necesario iniciar sesión.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm">Correo *</label>
            <Input
              type="email"
              placeholder="nombre@dominio.cl"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              onBlur={()=>setTouched(true)}
              autoFocus
            />
            {touched && !valid && <p className="text-xs text-destructive">Ingresa un correo válido.</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm">Nombre (opcional)</label>
            <Input
              placeholder="Tu nombre"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={()=>onOpenChange(false)}>Cancelar</Button>
            <Button type="submit" className="bg-gradient-primary">Inscribirme</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
