import { Board } from "@prisma/client";
import { prismaContext } from "../../lib/prismaContext";
import { privateDecrypt } from "crypto";

export const allBoard = async () => {
  const board = await prismaContext.board.findMany();
  return board;
};

export const createBoard = async (
  title: string,
  body: string,
  boardImage: string,
  userId: number
): Promise<Board> => {
  const board = await prismaContext.board.create({
    data: {
      title,
      body,
      boardImage,
      userId,
    },
  });

  return board;
};

export const updateBoard = (
  id: number,
  title: string,
  body: string,
  boardImage: string
): Promise<Board> => {
  const board = prismaContext.board.update({
    where: { id },
    data: { title, body, boardImage },
  });

  return board;
};

export const destroyBoard = (id: number): Promise<Board> => {
  const board = prismaContext.board.delete({
    where: { id },
  });

  return board;
};
