import prisma from "@/lib/prisma";

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
    return await prisma.user.create({
      data,
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
