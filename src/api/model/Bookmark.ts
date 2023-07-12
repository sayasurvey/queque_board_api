import { Bookmark } from "@prisma/client";
import { prismaContext } from "../../lib/prismaContext";

export const getBookmark = async (user_id: number): Promise<Bookmark[]> => {
  const bookmark = await prismaContext.bookmark.findMany({
    where: { userId: user_id },
  });

  return bookmark;
};

export const createBookmark = async (
  user_id: number,
  board_id: number
): Promise<Bookmark> => {
  const bookmark = await prismaContext.bookmark.create({
    data: {
      boardId: board_id,
      userId: user_id,
    },
  });
  return bookmark;
};

export const destroyBookmark = async (
  bookmark_id: number
): Promise<Bookmark> => {
  const bookmark = await prismaContext.bookmark.delete({
    where: { id: bookmark_id },
  });

  return bookmark;
};
