import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const removeAccents = (str: string) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const isPalindrome = (str: string) => {
  const cleanStr = removeAccents(str)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
  return cleanStr === cleanStr.split("").reverse().join("");
};

export async function POST(req: Request) {
  const { phrase, userId } = await req.json();

  if (!userId) {
    return NextResponse.json(
      { error: "Usuario no encontrado" },
      { status: 401 }
    );
  }

  if (!phrase || phrase.trim() === "") {
    return NextResponse.json(
      { error: "Por favor ingresa una palabra o frase" },
      { status: 400 }
    );
  }

  const result = isPalindrome(phrase);

  await prisma.palindrome.create({
    data: {
      phrase,
      isPalindrome: result,
      userId: Number(userId),
    },
  });

  return NextResponse.json({ isPalindrome: result });
}

export async function GET(req: Request) {
  const userId = req.url.split("?")[1]?.split("=")[1];

  if (!userId) {
    return NextResponse.json(
      { error: "Usuario no encontrado" },
      { status: 401 }
    );
  }

  try {
    const palindromes = await prisma.palindrome.findMany({
      where: { userId: Number(userId) },
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    return NextResponse.json({ palindromes });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
