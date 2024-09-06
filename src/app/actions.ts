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

export const createUserAvailability = async (
  userId: string,
  availability: Record<string, DayAvailability>
) => {
  const newAvailability = Object.entries(availability).map(
    ([day, { enabled, from, to }]) => ({
      day,
      enabled,
      from,
      to,
    })
  );

  const data = {
    name: "default name",
    userId,
    days: newAvailability,
  };
  return await prisma.availability.create({
    data,
  });
};

export const DeleteUserAvailability = async (userId: string, name: string) => {
  return await prisma.availability.delete({
    where: {
      id: userId,
      name,
    },
  });
};

export const getUserAvailability = async (userId: string) => {
  const data = await prisma.user.findUnique({
    where: { id: userId },
    include: { Availability: true },
  });

  return data?.Availability;
};

export const createEvent = async (
  name: string,
  StartDate: Date,
  EndDate: Date,
  start: string,
  end: string,
  userIds: string[]
) => {
  const data = {
    name,
    StartDate,
    EndDate,
    start,
    end,
    EventUser: {
      create: userIds.map((userId) => ({ userId })),
    },
  };

  return await prisma.event.create({
    data,
  });
};

export const getEvents = async () => {
  return await prisma.event.findMany({
    include: { EventUser: true },
  });
};

export const getUserEvents = async (userId: string) => {
  return await prisma.event.findMany({
    where: { EventUser: { some: { userId } } },
    include: { EventUser: true },
  });
};

export const getAllUsers = async () => {
  return await prisma.user.findMany();
};
