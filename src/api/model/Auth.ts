import { User } from "@prisma/client";
import { prismaContext } from "../../lib/prismaContext";
// import { typeRegisterReq } from "../../types/auth/index";

// users

export const usersGet = async () => {
  const allUsers = await prismaContext.user.findMany();

  return allUsers;
};

// auth/register

export const registerUser = async (
  body: User,
  hashedPassword: string
): Promise<User> => {
  let { name, email, password } = body;
  password = hashedPassword;
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