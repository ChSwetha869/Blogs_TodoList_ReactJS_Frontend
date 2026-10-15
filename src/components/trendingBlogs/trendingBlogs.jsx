import React from "react";
import './trendingBlogs.css';
import { Link } from "react-router-dom";

function TrendingBlogs({blog}) {
    let image = '';
    switch(blog.category) {
        case "Mountains":
            image='mountains.jpg'
            break;
        case "Nature":
            image='lake.jpg'
            break;
        case "Himalayas":
            image='himalayas.jpg'
            break;
        default:
            image='tree.jpg'
    }
    return (
        <Link to={`/Blog/${blog.id}`}>
            <div className="rounded-lg shadow-md overflow-hidden w-72 p-2">
                <img src={`/media/${image}`} className="w-full" alt={blog.title} />
                <div className="p-4">
                    <h5 className="text-xl font-semibold">{blog.title}</h5>
                    <p className="text-gray-500">{blog.category}</p>
                    <p className="text-gray-600">{blog.previewDescription}</p>
                </div>
            </div>
        </Link>
    )
}

export default TrendingBlogs;