import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET - buscar usuário por ID
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const params = await context.params;
  const { id } = params;

  //verifica se não é id
  if (!id || isNaN(Number(id))) {
    return NextResponse.json(
      { error: `ID inválido ou não informado: ${id}` },
      { status: 400 },
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "Usuário encontrado", user });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro no servidor" }, { status: 500 });
  }
}

// DELETE - deletar usuário por ID
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const params = await context.params;
  const { id } = params;

  if (!id || isNaN(Number(id))) {
    return NextResponse.json(
      { error: "ID inválido ou não informado" },
      { status: 400 },
    );
  }

  try {
    const deletedUser = await prisma.user.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({
      message: "Usuário deletado",
      user: deletedUser,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Usuário não encontrado ou ID inválido" },
      { status: 404 },
    );
  }
}

// PUT - atualizar usuário por ID
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const params = await context.params;
  const { id } = params;

  if (!id || isNaN(Number(id))) {
    return NextResponse.json(
      { error: "ID inválido ou não informado" },
      { status: 400 },
    );
  }

  try {
    const { name, email, password } = await req.json();

    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { name, email, password },
    });

    return NextResponse.json({ message: "Usuário atualizado", user });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Usuário não encontrado ou dados inválidos" },
      { status: 404 },
    );
  }
}
