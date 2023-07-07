import { Comment } from "@prisma/client";
import { prismaContext } from "../../lib/prismaContext";
import { privateDecrypt } from "crypto";

export const getComment = async (existId: number): Promise<Comment | null> => {
  const comment = await prismaContext.comment
    .findUnique({
      where: { id: existId },
    })
    .catch(() => {
      throw new Error("not get comment");
    });

  return comment;
};

export const createComment = async (
  content: string,
  userId: number,
  boardId: number
): Promise<Comment> => {
  const comment = await prismaContext.comment
    .create({
      data: {
        content,
        boardId,
        userId
      }
    })
    .catch(() => {
      throw new Error("not board comment");
    });

  return comment;
};

export const updateComment = async (
  existId: number, //既に登録されているboardのidという意味
  content: string,
  userId: number,
  boardId: number
): Promise<Comment> => {
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
      throw new Error("not update comment");
    });

  return comment;
};

export const destroyComment = (existId: number): Promise<Comment | void> => {
  const comment = prismaContext.comment
    .delete({
      where: { id: existId },
    })
    .catch(() => {
      throw new Error("not delete comment");
    });

  return comment;
};

export const existCheckId = async (id: number): Promise<number> => {
  const checkId = await prismaContext.comment.findUnique({
    where: { id: id },
    select: { id: true },
  });

  if (checkId === null) {
    throw new Error("this comment does not exist");
  }

  return checkId.id;
};
