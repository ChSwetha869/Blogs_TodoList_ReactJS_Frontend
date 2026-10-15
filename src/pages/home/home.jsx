import React from "react";
import Banner from "../../components/banner/banner";
import TrendingBlogs from "../../components/trendingBlogs/trendingBlogs";
import blogs from "../../utils/mockData";
import { Link } from "react-router-dom";

function Home() {
    return (
        <>
            <Banner />
            <div className="my-2">
                <h2 className="bg-gray-300 text-center">Read Blogs From</h2>
                <div className="flex flex-wrap gap-4 p-2">
                    <Link to={'/Blogs/Mountains'}>
                        <div className="rounded-lg shadow-md overflow-hidden w-72" style={{ width: '18rem' }}>
                            <img src="/media/mountains.jpg" className="w-full" alt="..." />
                            <div className="p-4">
                                <h5 className="text-xl font-semibold">Mountains</h5>
                            </div>
                        </div>
                    </Link>
                    <Link to={'/Blogs/Nature'}>
                        <div className="rounded-lg shadow-md overflow-hidden w-72" style={{ width: '18rem' }}>
                            <img src="/media/lake.jpg" className="w-full" alt="..." />
                            <div className="p-4">
                                <h5 className="text-xl font-semibold">Nature</h5>
                            </div>
                        </div>
                    </Link>
                    <Link to={'/Blogs/Himalayas'}>
                        <div className="rounded-lg shadow-md overflow-hidden w-72" style={{ width: '18rem' }}>
                            <img src="/media/himalayas.jpg" className="w-full" alt="..." />
                            <div className="p-4">
                                <h5 className="text-xl font-semibold">Himalayas</h5>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
            <div>
                <h2 className="bg-gray-300 text-center">Trending Blogs</h2>
                <div className="flex flex-wrap gap-4">
                    {blogs.map(blog =>
                        <TrendingBlogs blog={blog} />
                    )}
                </div>
            </div>
        </>
    )
}

export default Home;