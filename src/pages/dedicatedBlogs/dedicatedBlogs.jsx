import React, { use } from "react";
import './dedicatedBlogs.css';
import Banner from "../../components/banner/banner";
import { useState, useEffect } from "react";
import blogs from '../../utils/mockData';
import { useParams } from "react-router-dom";

function DedicatedBlogs() {
    const [ blogId, setBlogId ] = useState(1);
    const [ blog, setBlog ] = useState('');
    const { id } = useParams();
    let blogToDisplay = blogs.filter(blog => blog.id == blogId )[0];
    useEffect(() => {
        if(id) {
            setBlogId(id);
        }
    },[])

    return (
        <>
            <Banner />
            <h1>{ blogToDisplay.title }</h1>
            <h6>{ blogToDisplay.category }</h6>
            <p>{ blogToDisplay.content }</p>
        </>
    )
}

export default DedicatedBlogs;