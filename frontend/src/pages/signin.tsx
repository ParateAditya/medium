import { Auth } from "../components/Auth";
import { Quote } from "../components/Quote";

export function SignIn() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
            <Auth type="SignIn" />
            <Quote />
        </div>
    )
}