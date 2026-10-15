import React from "react";
import './registration.css';

function Registration() {
    return (
        <div className="registration-page flex justify-center items-center">
            <form className="registration-form flex flex-col gap-y-2 justify-center items-center">
                <h4 className="font-bold p-2 text-2xl text-center">Registeration Form</h4>
                <div className="mb-3 flex flex-col">
                    <label htmlFor="name">Name</label>
                    <input className="w-95 border border-gray-300 text-gray-900 transition bg-white rounded-lg p-2" type="text" placeholder="Enter Name"/>
                </div>
                <div className="mb-3 flex flex-col">
                    <label htmlFor="phone">Phone Number</label>
                    <input className="w-95 border border-gray-300 text-gray-900 transition bg-white rounded-lg p-2" type="tel" placeholder="Enter Phone Number"/>
                </div>
                <div className="mb-3 flex flex-col">
                    <label htmlFor="email">Email address</label>
                    <input className="w-95 border border-gray-300 text-gray-900 transition bg-white rounded-lg p-2" type="email" placeholder="name@example.com"/>
                </div>
                <div className="mb-3 flex flex-col">
                    <label htmlFor="password">Password</label>
                    <input className="w-95 border border-gray-300 text-gray-900 transition bg-white rounded-lg p-2" type="password" placeholder="Enter Password"/>
                </div>
                <button className="w-52 rounded-md bg-blue-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-600">Registration</button>
            </form>
        </div>
    )
}

export default Registration;