import { Board } from "@prisma/client";
import { prismaContext } from "../../lib/prismaContext";
import { CustomException } from "../handler/exception/customError";

export const getBoards = async () => {
  const board = await prismaContext.board.findMany({
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });
  return board;
};

export const createBoard = async (
  title: string,
  content: string,
  boardImage: string,
  userId: number
): Promise<Board | null> => {
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
      return null;
    });

  return board;
};

export const getBoard = async (existId: number): Promise<Board | null> => {
  const board = await prismaContext.board
    .findUniqueOrThrow({
      where: { id: existId },
      include: {
        user: {
          select: {
            name: true,
          },
        },
        comments: {
          select: {
            content: true,
            user: {
              select: {
                name: true,
              },
            },
          }
        }
      },
    })
    .catch(() => {
      return null;
    });

  return board;
};

export const updateBoard = async (
  existId: number,
  title: string,
  content: string,
  boardImage: string
): Promise<Board | null> => {
  const board = await prismaContext.board
    .update({
      where: { id: existId },
      data: { title, content, boardImage },
    })
    .catch(() => {
      return null;
    });
  return board;
};

export const destroyBoard = async (existId: number): Promise<Board | null> => {
  const board = await prismaContext.board
    .delete({
      where: { id: existId },
    })
    .catch(() => {
      return null;
    });

  return board;
};
