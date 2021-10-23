import prisma from "./index";
const addLink = async (
  route: string,
  url: string,
  userId: string,
  pub: boolean
) => {
  await prisma.link.upsert({
    where: {
      slug: route,
    },
    update: {
      url,
      addedBy: userId,
      public: pub,
    },
    create: {
      slug: route,
      url,
      addedBy: userId,
      public: pub,
    },
  });
};
export default addLink;
