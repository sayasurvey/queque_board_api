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
  const board = await prismaContext.board
    .create({
      data: {
        title,
        content,
        boardImage,
        userId,
      },
    })
    .catch(() => {
      throw new Error("not post board");
    });

  return board;
};
export const existCheckId = async (id: number): Promise<number> => {
  const checkId = await prismaContext.board.findUnique({
    where: { id: id },
    select: { id: true },
  });

  if (checkId === null) {
    throw new Error("this board does not exist");
  }

  return checkId.id;
};

export const getBoard = async (existId: number): Promise<Board | null> => {
  const board = await prismaContext.board
    .findUnique({
      where: { id: existId },
    })
    .catch(() => {
      throw new Error("not get board");
    });

  return board;
};

export const updateBoard = async (
  existId: number,
  title: string,
  content: string,
  boardImage: string
): Promise<Board> => {
  const board = await prismaContext.board
    .update({
      where: { id: existId },
      data: { title, content, boardImage },
    })
    .catch(() => {
      throw new Error("not update board");
    });

  return board;
};

export const destroyBoard = (existId: number): Promise<Board | void> => {
  const board = prismaContext.board
    .delete({
      where: { id: existId },
    })
    .catch(() => {
      throw new Error("not delete board");
    });

  return board;
};
