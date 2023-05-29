import { User } from "@prisma/client";
import { prismaContext } from "../../lib/prismaContext";

export const showUser = async (
  id: number
): Promise<User | null> => {
  const user = await prismaContext.user.findUnique({
    where: {
      id
    },
    include: {
      boards: true
    }
  });

  return user;
};

export const updateUser = (
  id: number,
  name: string,
  email: string,
  iconImage: string
): Promise<User> => {
  const user = prismaContext.user.update({
    where: { id },
    data: { name, email, iconImage },
  });

  return user;
};

export const destroyUser = (id: number): Promise<User> => {
  const user = prismaContext.user.delete({
    where: { id },
  });

  return user;
};
