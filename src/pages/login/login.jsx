import React from "react";
import './login.css';

function Login() {
    return (
        <div className="login-page flex justify-center items-center">
            <form className="login-form flex flex-col gap-y-2 justify-center items-center">
                <h4 className="font-bold p-2 text-2xl text-center">Login Form</h4>
                <div className="mb-3 flex flex-col">
                    <label htmlFor="email">Email address</label>
                    <input className="w-95 border border-gray-300 text-gray-900 transition bg-white rounded-lg p-2" type="email" placeholder="name@example.com"/>
                </div>
                <div className="mb-3 flex flex-col">
                    <label htmlFor="password">Password</label>
                    <input className="w-95 border border-gray-300 text-gray-900 transition bg-white rounded-lg p-2" type="password" placeholder="Enter Password"/>
                </div>
                <button className="w-52 rounded-md bg-blue-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-600">Login</button>
            </form>
        </div>
    )
}

export default Login;