import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export const userService = {
  async getAllUsers() {
    return await prisma.user.findMany();
  },

  async getUserById(id: number) {
    return await prisma.user.findUnique({
      where: { id },
    });
  },

  async createUser(data: { name: string; email: string; password: string }) {
    const { name, email, password } = data;
    const hashedPassword = await bcrypt.hash(password, 10);
    return await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });
  },

  async updateUser(
    id: number,
    data: { name?: string; email?: string; password?: string },
  ) {
    return await prisma.user.update({
      where: { id },
      data,
    });
  },

  async deleteUser(id: number) {
    return await prisma.user.delete({
      where: { id },
    });
  },
};
