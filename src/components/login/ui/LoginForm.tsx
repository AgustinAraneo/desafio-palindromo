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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { setCookie } from "cookies-next";
import { Loader2 } from "lucide-react";

interface LoginFormProps {
  onSwitchToSignUp: () => void;
}

export default function LoginForm({ onSwitchToSignUp }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const isFormValid = email && password;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Inicio de sesión exitoso!", {
          position: "top-center",
          style: {
            backgroundColor: "white",
            color: "#008000",
          },
        });

        await setCookie("userId", data.userId);

        router.push("/home");
      } else {
        toast.error(data.error || "Error en el inicio de sesión", {
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
          Iniciar Sesión
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
          <Button
            type="submit"
            variant={"submit"}
            className="w-full"
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? (
              <Loader2 className="animate-spin w-5 h-5 text-white" />
            ) : (
              "Iniciar Sesión"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          variant="link"
          onClick={onSwitchToSignUp}
          className="w-fit text-white"
        >
          No tenés cuenta? Regístrate
        </Button>
      </CardFooter>
    </Card>
  );
}
