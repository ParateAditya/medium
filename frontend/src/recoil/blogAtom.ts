// recoil/atoms/blogAtom.ts
import { atom } from 'recoil';
import type { Blog } from "../pages/blog";

export const blogListAtom = atom({
  key: 'blogListAtom',
  default: [] as Blog[]
});
