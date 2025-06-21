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
  const header = c.req.header("Authorization");
  if (!header || !header.startsWith("Bearer ")) {
    return c.json(
      {
        error: "Unauthorized",
      },
      403
    );
  }
  const token = header.split(" ")[1];
  const payload = await verify(token, c.env.JWT_SECRET);
  if (!payload.id) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  // Attach userId to the context's variable for downstream handlers
  (c as any).userId = payload.id;
  await next();
});

blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = (c as any).userId;
  const body = await c.req.json();

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
});

blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const userId = (c as any).userId;
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

  return c.json(response, 201);
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = (c as any).userId;

  const response = await prisma.post.findMany();
  return c.json(response, 201);
});

blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const response = await prisma.post.findUnique({
    where: {
      id: c.req.param("id"),
    },
  });

  if (!response) {
    return c.json({ error: "Post not found" }, 404);
  } else {
    return c.json(response, 201);
  }
});
