import React from "react";
function Videos() {
    let videoList = ["React.JS", "Node.JS", "Express.JS", "MongoDB", "MERN Stack"];
    return (
        <>
            {
                videoList.map((video, index) => {
                    return <li key={index}>{video} - {index + 1}</li>
                })
            }
        </>  
    )
}

export default Videos;