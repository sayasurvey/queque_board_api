import { Board } from "@prisma/client";
import { prismaContext } from "../../lib/prismaContext";
import { CustomException } from "../handler/exception/customError";

export const getBoards = async () => {
  const board = await prismaContext.board.findMany().catch(() => {
    throw new CustomException(
      400,
      "this board does not get all caused prisma error",
      "info"
    );
  });
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
      throw new CustomException(
        400,
        "this board does not create caused prisma error",
        "info"
      );
    });

  return board;
};

export const getBoard = async (existId: number): Promise<Board | null> => {
  const board = await prismaContext.board
    .findUniqueOrThrow({
      where: { id: existId },
    })
    .catch(() => {
      throw new CustomException(
        400,
        "this board does not get caused prisma error",
        "info"
      );
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
      throw new CustomException(
        400,
        "this board does not update caused prisma error",
        "info"
      );
    });
  return board;
};

export const destroyBoard = (existId: number): Promise<Board | void> => {
  const board = prismaContext.board
    .delete({
      where: { id: existId },
    })
    .catch(() => {
      throw new CustomException(
        400,
        "this board does not delete caused prisma error",
        "info"
      );
    });

  return board;
};
