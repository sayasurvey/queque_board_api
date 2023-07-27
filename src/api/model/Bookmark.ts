import { Bookmark } from "@prisma/client";
import { prismaContext } from "../../lib/prismaContext";

export const getBookmark = async (user_id: number): Promise<any> => {
  const bookmark = await prismaContext.bookmark
    .findMany({
      where: { userId: user_id },
      select: {
        id: true,
        board: true,
      },
    })
    .catch(() => {
      return null;
    });
  console.log({ bookmark });

  return bookmark;
};

export const findExistedBookmark = async (
  user_id: number,
  board_id: number
): Promise<Bookmark | null> => {
  const bookmark = await prismaContext.bookmark
    .findFirst({
      where: {
        AND: [{ userId: user_id }, { boardId: board_id }],
      },
    })
    .catch(() => {
      return null;
    });

  return bookmark;
};

export const createBookmark = async (
  user_id: number,
  board_id: number
): Promise<Bookmark | null> => {
  const bookmark = await prismaContext.bookmark
    .create({
      data: {
        boardId: board_id,
        userId: user_id,
      },
    })
    .catch(() => {
      return null;
    });

  return bookmark;
};

export const destroyBookmark = async (
  bookmark_id: number
): Promise<Bookmark | null> => {
  const bookmark = await prismaContext.bookmark
    .delete({
      where: { id: bookmark_id },
    })
    .catch(() => {
      return null;
    });

  return bookmark;
};
