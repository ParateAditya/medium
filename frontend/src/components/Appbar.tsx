import { useRecoilValue } from "recoil";
import { Avatar } from "./BlogCard";
import { userSelector } from "../recoil/userSelector";
import { Link } from "react-router-dom";

export const Appbar = () => {
    const token = localStorage.getItem("token") || "";
    const user = useRecoilValue(userSelector(token));

    return (
        <div className="flex items-center justify-between px-10 py-4 mb-8 bg-slate-200">
            <Link to={"/blog"} className="text-4xl font-bold">
                Medium
            </Link>
            <div>
                <Avatar name={user?.name?.toUpperCase() || "U"} size={10}></Avatar>
            </div>
        </div>
    )
}