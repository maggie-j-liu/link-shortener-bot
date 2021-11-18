import prisma from "./index";
const getStats = async (route: string) => {
  const stats = await prisma.link.findUnique({
    where: {
      slug: route,
    },
    select: {
      clicks: true,
    },
  });
  return stats;
};
export default getStats;
