import { User } from "@prisma/client";
import { prismaContext } from "../../lib/prismaContext";

// auth/register

export const registerUser = async (
  name: string,
  email: string,
  hashedPassword: string
): Promise<User | null> => {
  const password = hashedPassword;
  const user = await prismaContext.user
    .create({
      data: {
        name,
        email,
        password,
      },
    })
    .catch(() => {
      return null;
    });

  return user;
};

// auth/login

export const alreadyUserCheck = async (email: string): Promise<User | null> => {
  return await prismaContext.user.findUnique({
    where: {
      email: email,
    },
  });
};

export const fetchUserPassword = async (
  email: string
): Promise<string | undefined | null> => {
  const resultUser = await prismaContext.user
    .findFirstOrThrow({
      where: {
        email: email,
      },
      select: {
        password: true,
      },
    })
    .catch(() => {
      return null;
    });

  const existedUserPassword = resultUser?.password;

  return existedUserPassword;
};
