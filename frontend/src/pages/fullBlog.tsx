import { useRecoilValueLoadable } from 'recoil';
import { fullBlogSelector } from '../recoil/fullBlogSelector';
import { useParams } from 'react-router-dom';
import { Avatar } from '../components/BlogCard';
import { FullBlogSkeleton } from '../components/FullBlogSkeleton';


export const FullBlog = () => {
    const { id } = useParams();

    const blogLoadable = useRecoilValueLoadable(fullBlogSelector(id!));

    if (blogLoadable.state == "loading") {
        return <div><FullBlogSkeleton /></div>
    }

    if (blogLoadable.state === 'hasError') {
        return (
            <div className="flex items-center justify-center bg-gray-100">
                <p className="text-xl text-gray-800">Error Loading the Page</p>
            </div>
        )
    }

    const blog = blogLoadable.contents;

    return (

        <div className='flex flex-col items-center '>

            <div className="m-4  grid grid-cols-4  xl:w-3/5 w-3/4 justify-center">

                <div className='col-span-3 px-2'>
                    <div className='font-bold md:text-5xl text-2xl capitalize'>

                        {blog.title}
                    </div>
                    <div className="py-4 text-slate-600">
                        Posted on 12/2/2025
                    </div>
                    <div className="text-xl">
                        <div className="space-y-4">
                            {blog.content.split('\n\n').map((para: string) => (
                                <p className="">
                                    {para.trim()}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='col-span-1 px-2'>
                    <div className='text-slate-600 mb-4'>
                        Author
                    </div>
                    <div className='flex items-center'>
                        <Avatar name={blog.author.name.toUpperCase()} size={8} ></Avatar>
                        <div className='ml-4 font-semibold text-xl'>
                            {blog.author.name.toUpperCase()}
                        </div>

                    </div>
                </div>
            </div>

        </div>

    );
};
