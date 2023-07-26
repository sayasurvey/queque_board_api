import { User } from "@prisma/client";
import { prismaContext } from "../../lib/prismaContext";

export const getUsers = async () => {
  const users = await prismaContext.user.findMany();
  return users;
};

export const getUser = async (id: number): Promise<User | null> => {
  const user = await prismaContext.user
    .findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        boards: true,
      },
    })
    .catch(() => {
      return null;
    });

  return user;
};

export const updateUser = (
  id: number,
  name: string,
  email: string,
  iconImage: string
): Promise<User | null> => {
  const user = prismaContext.user
    .update({
      where: { id },
      data: { name, email, iconImage },
    })
    .catch(() => {
      return null;
    });

  return user;
};

export const destroyUser = (id: number): Promise<User | null> => {
  const user = prismaContext.user
    .delete({
      where: { id },
    })
    .catch(() => {
      return null;
    });

  return user;
};
