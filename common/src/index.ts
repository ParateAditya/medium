import { z } from "zod";

export const signUpBody = z.object({
  name: z.string().optional(),
  password: z.string(),
  email: z.string().email(),
});

export const signInBody = z.object({
    password: z.string(),
    email: z.string().email(),
});

export const createPostBody = z.object({
    title: z.string(),
    content : z.string()
});

export const updatePostBody = z.object({
    id: z.string(),
    title: z.string().optional(),
    content: z.string().optional(),
});

export type SignUpBody = z.infer<typeof signUpBody>;
export type SignInBody = z.infer<typeof signInBody>;
export type CreatePostBody = z.infer<typeof createPostBody>;
export type UpdatePostBody = z.infer<typeof updatePostBody>;