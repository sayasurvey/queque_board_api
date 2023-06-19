import { Board } from "@prisma/client";
import { prismaContext } from "../../lib/prismaContext";
import { privateDecrypt } from "crypto";

export const getBoards = async () => {
  const board = await prismaContext.board.findMany();
  return board;
};

export const createBoard = async (
  title: string,
  content: string,
  boardImage: string,
  userId: number
): Promise<Board> => {
  const board = await prismaContext.board.create({
    data: {
      title,
      content,
      boardImage,
      userId,
    },
  });

  return board;
};

export const getBoard = async (id: number): Promise<Board | null> => {
  const board = await prismaContext.board.findUnique({
    where: { id },
  });

  return board;
};

export const updateBoard = (
  id: number,
  title: string,
  content: string,
  boardImage: string
): Promise<Board> => {
  const board = prismaContext.board.update({
    where: { id },
    data: { title, content, boardImage },
  });

  return board;
};

export const destroyBoard = (id: number): Promise<Board> => {
  const board = prismaContext.board.delete({
    where: { id },
  });

  return board;
};
