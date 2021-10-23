import prisma from "./index";
const addLink = async (route: string, url: string, userId: string) => {
  await prisma.link.upsert({
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
};
export default addLink;
