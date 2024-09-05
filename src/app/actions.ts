"use server";

import { prisma } from "@/lib/db";
import { Event, Role } from "@prisma/client";

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
    userId,
    days: newAvailability,
  };
  return await prisma.availability.create({
    data,
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
  start: Date,
  end: Date,
  userIds: string[]
) => {
  return await prisma.event.create({
    data: {
      name,
      start,
      end,
      EventUser: {
        create: userIds.map((userId) => ({ userId })),
      },
    },
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
