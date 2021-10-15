import { PrismaClient } from "@prisma/client";
const prismaClient = new PrismaClient();

const genRandom = (len: number) => {
  return Math.random().toString(36).substr(2, len);
};
const prisma = {
  addLink: async (route: string, url: string) => {
    await prismaClient.link.upsert({
      where: {
        slug: route,
      },
      update: {
        url,
      },
      create: {
        slug: route,
        url,
      },
    });
  },
  addRandomLink: async (url: string) => {
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
          },
        });
        failed = false;
      }
    }
    return id;
  },
};

export default prisma;
