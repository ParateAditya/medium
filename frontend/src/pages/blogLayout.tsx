// components/BlogLayout.tsx
import { Outlet } from 'react-router-dom';
import { Appbar } from '../components/Appbar';

export const BlogLayout = () => {
  return (
    <>
      <Appbar/>
      <Outlet />
    </>
  );
};
