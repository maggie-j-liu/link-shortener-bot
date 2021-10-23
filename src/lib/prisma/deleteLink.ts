import prisma from ".";
const deleteLink = async (route: string, userId: string, isAdmin: boolean) => {
  // admin can delete any link
  if (isAdmin) {
    try {
      const deletedLink = await prisma.link.delete({
        where: {
          slug: route,
        },
      });
      return {};
    } catch (e) {
      return {
        error: "not found",
      };
    }
  }
  const linkRecord = await prisma.link.findUnique({
    where: {
      slug: route,
    },
    select: {
      addedBy: true,
    },
  });
  if (!linkRecord) {
    return {
      error: "not found",
    };
  }
  if (linkRecord.addedBy !== userId) {
    return {
      error: "not authorized",
    };
  }
  await prisma.link.delete({
    where: {
      slug: route,
    },
  });
  return {};
};

export default deleteLink;
