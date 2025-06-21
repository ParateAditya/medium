import { string, z } from "zod";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import { Hono } from "hono";
import { signInBody, signUpBody } from "@aditya_parate/medium-common";

type Env = {
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables : {
        userId: string
    }
};

export const userRoutes = new Hono<Env>();

userRoutes.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signUpBody.safeParse(body);

  if (!success) {
    c.status(401);
    return c.json({
      error: "username password and firstName expected",
    });
  }

  const findOne = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  });

  if (findOne) {
    c.status(401);
    return c.json({
      error: "already exists",
    });
  }

  const response = await prisma.user.create({
    data: {
      name: body.name,
      password: body.password,
      email: body.email,
    },
  });

  const token = await sign({ id: response.id }, c.env.JWT_SECRET);

  return c.json(
    {
      ...response,
      token,
    },
    200
  );
});

userRoutes.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signInBody.safeParse(body);

  if (!success) {
    c.status(401);
    return c.json({
      error: "username password and firstName expected",
    });
  }
  
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password,
    },
  });

  if (!user) {
    c.status(403);
    return c.json({ error: "user not found" });
  }

  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({ jwt });
});