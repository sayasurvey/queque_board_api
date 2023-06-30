import { Comment } from "@prisma/client";
import { prismaContext } from "../../lib/prismaContext";
import { privateDecrypt } from "crypto";

export const getComments = async () => {
  const Comment = await prismaContext.Comment.findMany();
  return Comment;
};

export const createComment = async (
  title: string,
  content: string,
  CommentImage: string,
  userId: number
): Promise<Comment> => {
  const Comment = await prismaContext.Comment
    .create({
      data: {
        title,
        content,
        CommentImage,
        userId,
      },
    })
    .catch(() => {
      throw new Error("not post Comment");
    });

  return Comment;
};
export const existCheckId = async (id: number): Promise<number> => {
  const checkId = await prismaContext.Comment.findUnique({
    where: { id: id },
    select: { id: true },
  });

  if (checkId === null) {
    throw new Error("this Comment does not exist");
  }

  return checkId.id;
};

export const getComment = async (existId: number): Promise<Comment | null> => {
  const Comment = await prismaContext.Comment
    .findUnique({
      where: { id: existId },
    })
    .catch(() => {
      throw new Error("not get Comment");
    });

  return Comment;
};

export const updateComment = async (
  existId: number,
  title: string,
  content: string,
  CommentImage: string
): Promise<Comment> => {
  const Comment = await prismaContext.Comment
    .update({
      where: { id: existId },
      data: { title, content, CommentImage },
    })
    .catch(() => {
      throw new Error("not update Comment");
    });

  return Comment;
};

export const destroyComment = (existId: number): Promise<Comment | void> => {
  const Comment = prismaContext.Comment
    .delete({
      where: { id: existId },
    })
    .catch(() => {
      throw new Error("not delete Comment");
    });

  return Comment;
};
