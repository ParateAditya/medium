import { Hono } from "hono";
import { userRoutes } from "./routes/user";
import { blogRouter } from "./routes/blog";
import { cors } from "hono/cors";

type Env = {
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
};

const app = new Hono<Env>();
app.use('/api/*', cors())

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/api/v1/user", userRoutes);
app.route("/api/v1/blog", blogRouter);

export default app;
