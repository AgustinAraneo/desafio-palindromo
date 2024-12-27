"use client";

import { useState } from "react";
import {
  Button,
  Input,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface CreateAccountProps {
  onSwitchToLogin: () => void;
}

export default function CreateAccountForm({
  onSwitchToLogin,
}: CreateAccountProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isFormValid = email && password && confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden", {
        position: "top-center",
        style: {
          backgroundColor: "white",
          color: "#ef4444",
        },
      });

      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Cuenta creada con éxito", {
          position: "top-center",
          style: {
            backgroundColor: "white",
            color: "#008000",
          },
        });

        onSwitchToLogin();
      } else {
        toast.error(data.error || "Error un error al crear la cuenta", {
          position: "top-center",
          style: {
            backgroundColor: "white",
            color: "#ef4444",
          },
        });
      }
    } catch {
      toast.error(`Hubo un problema con la conexión`, {
        position: "top-center",
        style: {
          backgroundColor: "white",
          color: "#ef4444",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Crear Cuenta
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            variant={"submit"}
            className="w-full"
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? (
              <Loader2 className="animate-spin w-5 h-5 text-white" />
            ) : (
              "Crear Cuenta"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          variant="link"
          onClick={onSwitchToLogin}
          className="w-fit text-white"
        >
          Ya tenés cuenta? Inicia sesión
        </Button>
      </CardFooter>
    </Card>
  );
}
