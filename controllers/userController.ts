import { NextResponse } from "next/server";
import { userService } from "@/services/userService";

export const userController = {
  async getAll() {
    const users = await userService.getAllUsers();
    return NextResponse.json(users);
  },

  async getById(id: number) {
    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { error: `ID inválido ou não informado: ${id}` },
        { status: 400 },
      );
    }

    try {
      const user = await userService.getUserById(id);

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
  },

  async create(req: Request) {
    const { email, password, name } = await req.json();
    const user = await userService.createUser({ name, email, password });
    return NextResponse.json(user);
  },

  async delete(id: number) {
    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { error: "ID inválido ou não informado" },
        { status: 400 },
      );
    }

    try {
      const deletedUser = await userService.deleteUser(id);
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
  },

  async update(id: number, req: Request) {
    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { error: "ID inválido ou não informado" },
        { status: 400 },
      );
    }

    try {
      const { name, email, password } = await req.json();

      const user = await userService.updateUser(id, { name, email, password });

      return NextResponse.json({ message: "Usuário atualizado", user });
    } catch (err) {
      console.error(err);
      return NextResponse.json(
        { error: "Usuário não encontrado ou dados inválidos" },
        { status: 404 },
      );
    }
  },
};
