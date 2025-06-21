import { createPostBody, updatePostBody } from "@aditya_parate/medium-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

type Env = {
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
};

export const blogRouter = new Hono<Env>();

blogRouter.use("/*", async (c, next) => {
  try {
    const header = c.req.header("Authorization");
    if (!header || !header.startsWith("Bearer ")) {
      return c.json(
        {
          error: "Unauthorized",
        },
        401
      );
    }
    const token = header.split(" ")[1];
    const payload = await verify(token, c.env.JWT_SECRET);
    if (!payload.id) {
      c.status(401);
      return c.json({ error: "Unauthorized" });
    }
    // Attach userId to the context's variable for downstream handlers
    (c as any).userId = payload.id;
    await next();
  } catch (error) {
    console.error(error);
    c.status(401); // 401 Unauthorized if there's an issue verifying the token
    return c.json({ error: "Unauthorized" });
  }
});

blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = (c as any).userId;
  const body = await c.req.json();

  try {
    const { success } = createPostBody.safeParse(body);
    if (!success) {
      return c.json({ error: "Invalid request body" }, 400);
    }

    const response = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    });

    return c.json(response, 201);
  } catch (error) {
    console.error("Error creating post:", error);
    return c.json({ error: "Failed to create post" }, 500);
  }
});

blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const userId = (c as any).userId;
  try {
    const { success } = updatePostBody.safeParse(body);
    if (!success) {
      return c.json({ error: "Invalid request body" }, 400);
    }

    const response = await prisma.post.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    if (!response) {
      return c.json({ error: "Post not found" }, 404);
    }
    return c.json(response, 200);
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as any).code === "P2025"
    ) {
      // Prisma error code for record not found
      return c.json({ error: "Post not found" }, 404); // 404 Not Found if post doesn't exist
    }
    console.error(error);
    return c.json({ error: "Failed to update post" }, 500); // 500 Internal Server Error
  }
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const response = await prisma.post.findMany();
    return c.json(response, 200); // 200 OK, even if the result is empty
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to fetch posts" }, 500); // 500 Internal Server Error
  }
});

blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const response = await prisma.post.findUnique({
      where: {
        id: c.req.param("id"),
      },
    });

    if (!response) {
      return c.json({ error: "Post not found" }, 404); // 404 Not Found if post doesn't exist
    } else {
      return c.json(response, 200); // 200 OK for successful fetch
    }
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to fetch post" }, 500); // 500 Internal Server Error
  }
});
