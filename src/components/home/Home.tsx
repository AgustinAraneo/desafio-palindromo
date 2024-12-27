"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CircleCheck, CircleX, Search } from "lucide-react";
import { toast } from "sonner";
import { getCookie } from "cookies-next";
import { LogOutButton } from "./ui/LogOutButton";

interface PalindromeProps {
  id: number;
  userId: number;
  created_At: string;
  phrase: string;
  isPalindrome: boolean;
}

export default function Home() {
  const [word, setWord] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [recentPalindromes, setRecentPalindromes] = useState<PalindromeProps[]>(
    []
  );
  const [userId, setUserid] = useState<number | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handleSearch = async () => {
    if (word.trim() === "") {
      setResult("Por favor, ingresa una palabra o frase.");
      return;
    }

    if (!userId) {
      toast.error("Usuario no encontrado. Iniciar sesion para continuar", {
        position: "top-center",
        style: {
          backgroundColor: "white",
          color: "#ef4444",
        },
      });
      return;
    }

    try {
      const response = await fetch("/api/palindromo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phrase: word, userId: String(userId) }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(
          data.isPalindrome
            ? "¡Sí, es un palíndromo!"
            : "No, no es un palíndromo."
        );
        fetchRecentPalindromes(String(userId));
      } else {
        toast.error(data.error || "Hubo un error al verificar el palindromo.", {
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
    }
  };

  const fetchRecentPalindromes = async (userId: string) => {
    try {
      const response = await fetch(`/api/palindromo?userId=${userId}`);
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setRecentPalindromes(data.palindromes);
      } else {
        console.error("Error al obtener las últimas búsquedas");
      }
    } catch {
      console.error("Error al obtener las últimas búsquedas");
    }
  };

  useEffect(() => {
    setUserid(Number(getCookie("userId")));

    if (userId) {
      fetchRecentPalindromes(String(userId));
    }
  }, [userId]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-tl from-black-primary to-black p-4">
      <LogOutButton />
      <div className="max-w-5xl w-full text-center space-y-6 md:space-y-8 relative z-10">
        <h1 className="text-3xl md:text-6xl font-bold  bg-clip-text text-transparent bg-gradient-to-r from-pink-primary to-pink-500">
          Es palíndromo o no?
        </h1>
        <p className="text-lg md:text-xl md:pb-4 opacity-80 transition-opacity duration-500 hover:opacity-100 text-gray-300">
          Fijate si tu palabra o frase se puede leer igual de adelante hacia
          atrás.
        </p>
        <div
          className={`flex w-full hover:shadow-[0px_0px_100px_-8px_#ab0e5f] max-w-lg mx-auto transition duration-300 ease-in-out ${
            isFocused ? "shadow-[0px_0px_100px_-8px_#ab0e5f]" : ""
          }`}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          <Input
            type="text"
            placeholder="Escribe una palabra o frase..."
            value={word}
            onChange={(e) => setWord(e.target.value)}
            className="flex-grow rounded-r-none !border-pink-primary text-white"
          />
          <Button
            onClick={handleSearch}
            className="rounded-l-none bg-gradient-to-r from-pink-primary to-pink-500 "
          >
            <Search className="h-4 w-4 mr-2" />
            Buscar
          </Button>
        </div>
        {result && (
          <div className=" p-4 bg-gray-800 bg-opacity-50 rounded-lg text-white animate__animated animate__fadeIn absolute">
            {result}
          </div>
        )}

        {recentPalindromes.length > 0 && (
          <div className="pt-2 md:pt-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Últimas búsquedas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {recentPalindromes.map((palindrome, index) => (
                <div
                  key={index}
                  className={`bg-gray-800/50 p-6 rounded-lg transition-shadow 
                    ${
                      palindrome.isPalindrome
                        ? "hover:shadow-[0px_0px_50px_-10px_rgba(34,_197,_94,_0.5)] "
                        : "hover:shadow-[0px_0px_50px_-20px_#ef4444]"
                    }`}
                >
                  <p className="text-white text-sm font-medium italic truncate mb-2">
                    {palindrome.phrase}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400">
                      {palindrome.isPalindrome
                        ? "Si, es un palindromo!"
                        : "No es un palindromo"}
                    </p>
                    <div>
                      {palindrome.isPalindrome ? (
                        <CircleCheck className="text-green-400" />
                      ) : (
                        <CircleX className="text-[#ef4444]" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
