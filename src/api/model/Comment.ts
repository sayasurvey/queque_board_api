import { Comment } from "@prisma/client";
import { prismaContext } from "../../lib/prismaContext";

export const createComment = async (
  content: string,
  userId: number,
  boardId: number
): Promise<Comment | null> => {
  const comment = await prismaContext.comment
    .create({
      data: {
        content,
        userId,
        boardId
      }
    })
    .catch(() => {
      return null;
    });

  return comment;
};

export const updateComment = async (
  existId: number,
  content: string,
  userId: number,
  boardId: number
): Promise<Comment | null> => {
  const comment = await prismaContext.comment
    .update({
      where: { id: existId },
      data: {
        content,
        userId,
        boardId
      },
    })
    .catch(() => {
      return null;
    });

  return comment;
};

export const destroyComment = async (existId: number): Promise<Comment | null> => {
  const comment = await prismaContext.comment
    .delete({
      where: { id: existId },
    })
    .catch(() => {
      return null;
    });

  return comment;
};
