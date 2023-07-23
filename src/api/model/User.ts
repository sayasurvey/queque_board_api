import { User } from "@prisma/client";
import { prismaContext } from "../../lib/prismaContext";
import { CustomException } from "../handler/exception/customError";

export const getUsers = async () => {
  const users = await prismaContext.user.findMany().catch(() => {
    throw new CustomException(
      400,
      "this user does not get all caused prisma error",
      "info"
    );
  });
  return users;
};

export const getUser = async (id: number): Promise<User | null> => {
  const user = await prismaContext.user
    .findUnique({
      where: {
        id,
      },
      include: {
        boards: true,
      },
    })
    .catch(() => {
      throw new CustomException(
        400,
        "this user does not get caused prisma error",
        "info"
      );
    });

  return user;
};

export const updateUser = (
  id: number,
  name: string,
  email: string,
  iconImage: string
): Promise<User> => {
  const user = prismaContext.user
    .update({
      where: { id },
      data: { name, email, iconImage },
    })
    .catch(() => {
      throw new CustomException(
        400,
        "this user does not update caused prisma error",
        "info"
      );
    });

  return user;
};

export const destroyUser = (id: number): Promise<User> => {
  const user = prismaContext.user
    .delete({
      where: { id },
    })
    .catch(() => {
      throw new CustomException(
        400,
        "this user does not delete caused prisma error",
        "info"
      );
    });

  return user;
};
