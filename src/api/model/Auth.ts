import { User } from "@prisma/client";
import { prismaContext } from "../../lib/prismaContext";

// auth/register

export const registerUser = async (
  name: string,
  email: string,
  hashedPassword: string
): Promise<User> => {
  const password = hashedPassword;
  const user = await prismaContext.user.create({
    data: {
      name,
      email,
      password,
    },
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
  const resultUser = await prismaContext.user.findFirst({
    where: {
      email: email,
    },
    select: {
      password: true,
    },
  });

  const existedUserPassword = resultUser?.password;

  return existedUserPassword;
};