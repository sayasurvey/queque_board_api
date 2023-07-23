import { User } from "@prisma/client";
import { prismaContext } from "../../lib/prismaContext";
import { CustomException } from "../handler/exception/customError";

// auth/register

export const registerUser = async (
  name: string,
  email: string,
  hashedPassword: string
): Promise<User> => {
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
      throw new CustomException(
        500,
        "failed to hash the password caused prisma error",
        "error"
      );
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
): Promise<string | undefined> => {
  const resultUser = await prismaContext.user
    .findFirst({
      where: {
        email: email,
      },
      select: {
        password: true,
      },
    })
    .catch(() => {
      throw new CustomException(
        404,
        "this password dose not get caused prisma error",
        "warning"
      );
    });

  const existedUserPassword = resultUser?.password;

  return existedUserPassword;
};
