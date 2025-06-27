import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
interface BlogCardProps {
    id: string;
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate,
}: BlogCardProps) => {

    return (
        <Link to={`/blog/${id}`}>
            <div className="flex justify-center mb-10">
                <div className="flex flex-col  xl:w-3/5 w-3/4 text-lg border-b ">
                    <div className="flex items-center mt-2 m-1">
                        <Avatar name={authorName.toUpperCase()} size={8} />
                        <div className="flex flex-col items-center pl-2">{capitalizeWords(authorName)}</div>
                        <div className="pl-2 flex ">
                            <div className="relative inline-flex items-center justify-center w-1 h-1 overflow-hidden bg-slate-100 rounded-full dark:bg-slate-600 ">
                                <span className="text-xs text-slate-600 dark:text-slate-300"></span>
                            </div>
                        </div>
                        <div className="flex items-center pl-2 text-slate-600">
                            {publishedDate}
                        </div>
                    </div>

                    <div className="font-bold text-3xl mt-2 mb-2 capitalize">{title}</div>
                    <Content content={content} />
                    <div className="mt-6 mb-10 text-slate-600">
                        {Math.ceil(content.split(" ").length / 250)} min read
                    </div>
                </div>
            </div>
        </Link>
    );
};

export const Content = ({ content }: { content: string }) => {
    const [charLimit, setCharLimit] = useState(300);

    useEffect(() => {
        const updateCharLimit = () => {
            setCharLimit(window.innerWidth < 800 ? 150 : 300);
        };

        updateCharLimit(); // initial check
        window.addEventListener("resize", updateCharLimit);

        return () => window.removeEventListener("resize", updateCharLimit);
    }, []);

    const displayedContent =
        content.length > charLimit ? content.slice(0, charLimit) + " ..." : content;

    return <div className="text-xl mt-2 mb-2">{displayedContent}</div>;
};

export const Avatar = ({ name, size }: { name: string; size: number }) => {
    return (
        <div
            className={`relative inline-flex items-center justify-center overflow-hidden bg-slate-100 rounded-full dark:bg-slate-600 ${size <= 9 ? "w-8 h-8" : "w-10 h-10"}`}
        >
            <span
                className={` ${size <= 9 ? "text-xs" : "text-lg font-bold"
                    } text-slate-600 dark:text-slate-300`}
            >
                {name.charAt(0)}
                {name.split(" ")[2]?.charAt(0) || name.split(" ")[1]?.charAt(0) || ""}
            </span>
        </div>
    );
};

function capitalizeWords(str: string) {
    return str
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}