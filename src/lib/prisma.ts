import { PrismaClient } from "@prisma/client";
const prismaClient = new PrismaClient();

const genRandom = (len: number) => {
  return Math.random().toString(36).substr(2, len);
};
const prisma = {
  addLink: async (route: string, url: string, userId: string) => {
    await prismaClient.link.upsert({
      where: {
        slug: route,
      },
      update: {
        url,
        addedBy: userId,
      },
      create: {
        slug: route,
        url,
        addedBy: userId,
      },
    });
  },
  addRandomLink: async (url: string, userId: string) => {
    let failed = true;
    let id;
    while (failed) {
      id = genRandom(6);
      let existingRecord = await prismaClient.link.findUnique({
        where: {
          slug: id,
        },
      });
      if (!existingRecord) {
        await prismaClient.link.create({
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
  },
};

export default prisma;
