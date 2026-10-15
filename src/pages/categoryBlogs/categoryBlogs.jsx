import React from "react";
import Banner from "../../components/banner/banner";
import TrendingBlogs from "../../components/trendingBlogs/trendingBlogs";
import blogs from "../../utils/mockData";
import './categoryBlogs.css'
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function CategoryBlogs() {
    const [currentCategory, setCurrentCategory] = useState('');
    const { category } = useParams();
    useEffect(() => {
        if (category) {
            setCurrentCategory(category);
        }
    }, [category]);
    return (
        <>
            <Banner />
            <div>
                <h2>{currentCategory}</h2>
                <div className="flex flex-wrap gap-4">
                    {blogs
                        .filter(blog => blog.category === currentCategory)
                        .map(blog => (
                            <TrendingBlogs
                                key={blog.id}
                                blog={blog}
                            />
                        ))}
                </div>
            </div>
        </>
    )
}

export default CategoryBlogs;