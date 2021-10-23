import prisma from "./index";
const genRandom = (len: number) => {
  return Math.random().toString(36).substr(2, len);
};
const addRandomLink = async (url: string, userId: string) => {
  let failed = true;
  let id;
  while (failed) {
    id = genRandom(6);
    let existingRecord = await prisma.link.findUnique({
      where: {
        slug: id,
      },
    });
    if (!existingRecord) {
      await prisma.link.create({
        data: {
          slug: id,
          url,
          addedBy: userId,
        },
      });
      failed = false;
    }
  }
  return id;
};
export default addRandomLink;
