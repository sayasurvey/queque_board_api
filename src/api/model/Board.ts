import { Board } from "@prisma/client";
import { prismaContext } from "../../lib/prismaContext";

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

export const getBoard = async (existId: number): Promise<Board | null> => {
  const board = await prismaContext.board.findUnique({
    where: { id: existId },
  });

  return board;
};

export const updateBoard = async (
  existId: number,
  title: string,
  content: string,
  boardImage: string
): Promise<Board> => {
  const board = await prismaContext.board.update({
    where: { id: existId },
    data: { title, content, boardImage },
  });

  return board;
};

export const destroyBoard = (existId: number): Promise<Board | void> => {
  const board = prismaContext.board.delete({
    where: { id: existId },
  });

  return board;
};
