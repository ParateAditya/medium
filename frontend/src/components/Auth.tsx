import { useEffect, useState } from "react";
import type { SignUpBody, SignInBody } from "@aditya_parate/medium-common";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Auth = ({ type }: { type: "SignIn" | "SignUp" }) => {
    const navigate = useNavigate();
    const [Error, setError] = useState("");
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    useEffect(() => {
        if (Error) {
            const timer = setTimeout(() => {
                setError(""); // Clear error after 5 seconds
            }, 5000);
            return () => clearTimeout(timer); // Cleanup on re-render
        }
    }, [Error]);

    async function signInReq() {
        try {
            setError(""); // Clear previous error
            const reqBody: SignInBody = {
                email: Email,
                password: Password
            };
            const response = await axios.post(
                "http://localhost:8787/api/v1/user/signin",
                reqBody
            )
            const jwt = response.data.token;
            localStorage.setItem("token", jwt);
            navigate("/blog");
        } catch (error: any) {
            setError(error?.response?.data?.message || "Failed to sign in");
        }
    }

    async function signUpReq() {
        try {
            setError(""); // Clear previous error
            const reqBody: SignUpBody = {
                name: Name,
                email: Email,
                password: Password
            };

            const response = await axios.post(
                "http://localhost:8787/api/v1/user/signup",
                reqBody
            )
            const jwt = response.data.token;
            localStorage.setItem("token", jwt);
            navigate("/blog");
        } catch (error: any) {
            console.log(error);
            setError(error?.response?.data?.message || "Failed to sign in");
        }
    }


    return (
        <>

            <div className="h-screen flex flex-col justify-center items-center ">
                {Error.length > 0 &&

                    <div className="flex items-center p-4 text-sm text-slate-800 border border-gray-300 rounded-lg bg-slate-50 dark:bg-slate-800 dark:text-gray-300 dark:border-gray-600" role="alert">
                        <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <span className="sr-only">Info</span>
                        <div>
                            <span className="font-medium">Error : </span> {Error}
                        </div>
                    </div>    

                }
                        <div className="flex flex-col items-center  p-4">
                            <div className="text-4xl font-extrabold p-2 ">
                                {type === "SignIn" ? "Login" : "Create an Account"}
                            </div>
                            <div className="text-xl font-normal">
                                {
                                    type === "SignUp" ? (
                                        <>
                                            Already have an account? <a href="/signin" className="text-blue-500 hover:underline">Login</a>
                                        </>
                                    ) : (
                                        <>
                                            Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">SignUp</a>
                                        </>
                                    )
                                }
                            </div>

                        </div>
                        <div className=" sm:mx-auto sm:w-full sm:max-w-sm">

                            {type === "SignUp" && <LabelledInput label="Name" placeholder="xyz123" type="text" onChange={e => setName(e.target.value)} />}
                            <LabelledInput label="Email" placeholder="xyz@example.com" type="email" onChange={e => setEmail(e.target.value)} />

                            <LabelledInput label="Password" placeholder="*********" type="password" onChange={e => setPassword(e.target.value)} />
                            <div className="m-5 mt-10">
                                <button type="submit" className="flex w-full justify-center rounded-md bg-slate-900 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-slate-200 hover:text-black hover:font-extrabold  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={type === "SignIn" ? signInReq : signUpReq} >{type === "SignIn" ? <>Sign In</> : <>Sign Up</>}</button>
                            </div>
                        </div>


                    </div>
        </>
            )

}
            type LabelledInputProps = {
                label: string;
            placeholder?: string;
            onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
                type: string;
}

                function LabelledInput({label, placeholder, onChange, type}: LabelledInputProps) {
    return (
                <div className=" text-xl font-bold m-5">
                    <label className="">{label}</label>
                    <div className="mt-2 ">
                        <input onChange={onChange} type={type} placeholder={placeholder} required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-slate-600 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600  border border-slate-500" />
                    </div>
                </div>
                )
}
