import React from "react";
import './banner.css'

function Banner() {
    return (
        <>
            <div className="banner-div h-[500px] rounded-md m-2">
                <div className="overlay h-[500px]">
                    <h3 className="banner-title">Welcome to Blogs Page</h3>
                </div>
                <img src="/media/butterfly.jpg" alt="" className="rounded-md w-full p-2 h-[500px] object-cover" style={{ObjectFit: 'cover'}} />
            </div>
        </>
    )
}

export default Banner;