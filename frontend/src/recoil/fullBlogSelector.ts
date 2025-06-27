// recoil/selectors/fullBlogSelector.ts
import { selectorFamily } from 'recoil';
import axios from 'axios';
import type { Blog } from '../pages/blog'; //

export const fullBlogSelector = selectorFamily<Blog , string>({
  key: 'fullBlogSelector',
  get: (id: string) => async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`http://localhost:8787/api/v1/blog/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },
});
