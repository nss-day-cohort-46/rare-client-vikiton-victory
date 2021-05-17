import React, { useState, useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { PostContext } from "./PostProvider"
import { CategoryContext } from "../categories/CategoryProvider"
import { Post } from "./Post"
import "./Posts.css"

export const PostList = () => {
    const { getPosts, posts, searchTerms } = useContext(PostContext)
    const { getCategories, categories } = useContext(CategoryContext)

    const [ filteredPosts, setFilteredPosts] = useState([])

    const history = useHistory()

    useEffect(() => {
        getCategories()
        .then(getPosts)
    }, [])

    useEffect(() => {
        const matchingPosts = posts.filter(post => post.title.toLowerCase().includes(searchTerms.toLowerCase()))
        setFilteredPosts(matchingPosts)
    }, [searchTerms])

    useEffect(() => {
        setFilteredPosts(posts)
    }, [posts])

    
    return (
        <>
            <div className="createPostButtonDiv" onClick={() => history.push("posts/create")}>
                <button className="button createPostButton">Create a Post</button>
            </div>
            <div className="posts">
                {
                    filteredPosts.map(post => <Post key={post.id} post={post} />)
                }
            </div>
        </>
    )
}