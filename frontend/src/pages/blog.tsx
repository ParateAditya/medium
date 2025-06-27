import { useEffect, useState } from "react";
import { BlogCard } from "../components/BlogCard";
import axios from "axios";
import { useRecoilState } from "recoil";
import { blogListAtom } from "../recoil/blogAtom";
import { BulkSkeleton } from "../components/BulkSkeleton";

export interface Blog {
    id: string
    title: string;
    content: string;
    author: {
        name: string;
    }
}
export function Blog() {
    const [loading, setLoading] = useState<boolean>(true);
    const [blogList, setBlogList] = useRecoilState(blogListAtom);

    useEffect(
        () => {
            if (blogList.length > 0) {
                setLoading(false);
                return;
            }
            const token = localStorage.getItem("token");
            if (token) {
                const response = axios.get("http://localhost:8787/api/v1/blog/bulk", {
                    headers: {
                        Authorization: 'Bearer ' + token
                    },
                });
                response.then((res) => {
                    setBlogList(res.data);
                    setLoading(false);
                })
            }
        }
        , [])


    if (loading) {
        return (
            <div>
                <BulkSkeleton></BulkSkeleton>
                <BulkSkeleton></BulkSkeleton>
                <BulkSkeleton></BulkSkeleton>
            </div>
        )
    }

    return (
        <>
            {
                blogList.map((blog, index

                ) => {
                    return <BlogCard
                        key={index}
                        id={blog.id}
                        title={blog.title}
                        content={blog.content}
                        authorName={blog.author.name}
                        publishedDate={"12/2/2025"}
                    />
                })

            }

        </>
    )
}