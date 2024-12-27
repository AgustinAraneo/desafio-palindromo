import Link from "next/link";
import { Button } from "../ui/button";

export const Init = () => {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-tl from-black-primary to-black p-4 w-full">
      <div className="max-w-3xl mx-auto py-8 text-white">
        <h1 className="text-3xl text-center md:text-6xl font-bold  bg-clip-text text-transparent bg-gradient-to-r from-pink-primary to-pink-500 pb-4">
          Desafio palíndromo
        </h1>
        <div className="flex justify-center">
          <Link href={"/login"}>
            <Button
              className="hover:shadow-[0px_0px_50px_5px_#ab0e5f] font-medium px-8"
              variant={"submit"}
            >
              Comenzar!
            </Button>
          </Link>
        </div>

        <hr className="w-full bg-pink-primary my-12 text-pink-primary" />

        <div className="flex flex-auto justify-between">
          <h1 className="text-4xl font-bold underline underline-offset-4  bg-clip-text  text-transparent bg-gradient-to-t from-pink-primary to-pink-500">
            Introducción al Proyecto
          </h1>
        </div>
        <p>
          <span className="block mt-2 ">
            <br />
            <span className="">Breve descripción:</span> Qué objetivos se
            plantearon para este proyecto?
          </span>
          <br />
        </p>
        <p>
          Este proyecto fue desarrollado como parte de un desafío técnico. Su
          objetivo principal fue crear una interfaz gráfica en Next.js junto con
          un endpoint en Node.js para verificar si una frase o palabra es un
          palíndromo.
          <br /> Los puntos clave abordados en la aplicación incluyen:
        </p>
        <br />
        <ul className="list-disc pl-6 mt-2">
          <li>
            <span className="font-bold">Pantalla de Login:</span> Implementación
            de una pantalla pública con un formulario para iniciar sesión, que
            utiliza la base de datos para validar las credenciales.
          </li>
          <li>
            <span className="font-bold">Registro de Usuario:</span> Creación de
            una pantalla con un formulario para registrar nuevos usuarios
            mediante la base de datos.
          </li>
          <li>
            <span className="font-bold">Consultar palíndromo:</span> Se
            desarrollo de una pantalla que permite a los usuarios autenticados
            consultar si una frase o palabra es un palíndromo.
          </li>
        </ul>
        <h2 className="text-2xl  mt-6 font-bold text-pink-600">
          Características Adicionales ✨
        </h2>
        <ul className="list-disc pl-6 mt-2">
          <li>
            <strong>Responsive Design:</strong> El proyecto es completamente
            responsive, lo que significa que se puede acceder desde dispositivos
            móviles y computadoras de escritorio sin comprometer la experiencia
            del usuario.
          </li>
          <li>
            <strong>Validación de URLs:</strong> Se implementó una validación en
            las URLs mediante un middleware para garantizar que solo se pueda
            acceder a las rutas privadas si el usuario está autenticado.
          </li>
          <li>
            <strong>Hosteado en Vercel:</strong> La aplicación está hosteada en
            Vercel y se puede acceder en línea desde la siguiente URL:{" "}
            <a
              href="https://desafio-palindromo-dusky.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 underline font-bold"
            >
              https://desafio-palindromo-dusky.vercel.app/
            </a>
          </li>
          <li>
            <strong>Hosteado en Railway:</strong> La base de datos de este
            proyectyo esta en Railway, lo que permite mantener la informacion de
            forma cloud y acceder a ella desde cualquier lugar.
          </li>
        </ul>
        <h2 className="text-2xl  mt-6 font-bold text-pink-600">
          Tecnologías / Herramientas Utilizadas 💻
        </h2>
        <ul className="list-disc pl-6 mt-2">
          <li>
            <strong>Next.js</strong>
          </li>
          <li>
            <strong>Typescript</strong>
          </li>
          <li>
            <strong>Node.js (Con sintaxis de Next)</strong>
          </li>
          <li>
            <strong>Tailwind.css</strong>
          </li>
          <li>
            <strong>Shadcn</strong>
          </li>
          <li>
            <strong>Prisma</strong>
          </li>
          <li>
            <strong>PostgreSQL</strong>
          </li>
        </ul>
        <h2 className="text-2xl mt-6 font-bold text-pink-600">
          Dependencias y Configuración 📖
        </h2>
        <p>Para ejecutar este proyecto, sigue estos pasos:</p>

        <h3 className="text-xl mt-4 font-semibold text-pink-500">
          1. Configuración del archivo <code>.env</code>
        </h3>
        <p className="mt-2">
          Es necesario crear un archivo <code>.env</code> en la raíz del
          proyecto y agregar los siguientes valores:
        </p>
        <pre className="bg-gray-800 text-white p-2 mt-2 rounded overflow-x-auto">
          <code className="text-xs whitespace-pre-wrap break-all">
            NODE_ENV=&apos;development&apos;{"\n"}
            {"\n"}
            DATABASE_URL=&quot;postgresql://postgres:RqAaRlwrIAxSKvVbzRSvgmfOWIPWQgXR@junction.proxy.rlwy.net:52291/railway&quot;
          </code>
        </pre>

        <p className="mt-2">
          La base de datos utilizada en este proyecto está alojada en Railway,
          lo que significa que toda la información se almacena en la nube. Esto
          facilita la accesibilidad y gestión de los datos sin necesidad de
          configuraciones locales adicionales.
        </p>

        <h3 className="text-xl mt-4 font-semibold text-pink-500">
          2. Instalación de dependencias
        </h3>
        <pre className="bg-gray-800 text-white p-2 mt-2 rounded md:w-full w-fit">
          <code className="text-sm">$ pnpm i</code>
        </pre>
        <p className="mt-2">
          Ejecuta el comando <code>pnpm i</code> para descargar todas las
          dependencias necesarias del proyecto.
        </p>

        <h2 className="text-2xl  mt-6 font-bold text-pink-600">
          Despliegue 🚀
        </h2>
        <p>Sigue estos pasos para desplegar la aplicación:</p>
        <pre className="bg-gray-800 text-white p-2 mt-2 rounded md:w-full w-fit">
          <code className="text-sm">$ pnpm dev</code>
        </pre>
        <p className="mt-2">
          Se ejecuta el comando pnpm dev para levantar el proyecto de forma
          local. <br />
          Puedes visitar la aplicación abriendo tu navegador y accediendo a:{" "}
          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-600 underline font-bold"
          >
            http://localhost:3000
          </a>
        </p>
        <h2 className="text-2xl  mt-6">Autor 😎</h2>
        <p>
          Desarrollado por:{" "}
          <a
            href="https://github.com/AgustinAraneo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-600 underline font-bold"
          >
            @AgustinAraneo
          </a>
        </p>
      </div>
    </main>
  );
};
