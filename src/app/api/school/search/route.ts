import prisma from "src/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url).searchParams;
  const query = url.get("query");

  const sort = url.get("sort");
  const city = url.get("city");
  const state = url.get("state");
  let orderBy = {};
  if (sort?.length) {
    orderBy = {
      [sort.split("-")[0]]: sort.split("-")[1],
    };
  }
  try {
    const schools = await prisma.school.findMany({
      where: {
        ...(query
          ? {
              OR: [
                { name: { contains: String(query), mode: "insensitive" } },
                { city: { contains: String(query), mode: "insensitive" } },
                { state: { contains: String(query), mode: "insensitive" } },
                { notes: { contains: String(query), mode: "insensitive" } },

                // Add more fields as needed
              ],
            }
          : {}),
        ...(city ? { city: { equals: city } } : {}),
        ...(state ? { state: { equals: state } } : {}),
      },
      include: {
        heads: true,
        organization: true,
        lastModifiedBy: true,
        createdBy: true,
        images: true,
      },
      orderBy,
    });

    return new Response(JSON.stringify(schools), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
