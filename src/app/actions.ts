"use server";

import { prisma } from "@/lib/db";
import { Role } from "@prisma/client";

export async function setUserRole(userId: string, role: Role) {
  return await prisma.user.update({
    where: { id: userId },
    data: { role },
  });
}

export const getUserRole = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  return user?.role;
};

export const saveUserAvailability = async (userId: string) => {};

export const showUserSession = async (userId: string) => {};
