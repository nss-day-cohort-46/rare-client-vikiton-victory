import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "./PostProvider"
import { useHistory, useParams } from "react-router-dom"
import "./Posts.css"

export const PostDetail = () => {

    const { deletePost, getPostById } = useContext(PostContext)

    const [post, setPost] = useState({})

    const history = useHistory()

    const { postId } = useParams()

    const handleDelete = () => {
        deletePost(post.id)
        .then(() => {
            history.push("/posts")
        })
    }

    useEffect(() => {
        getPostById(postId)
            .then((res) => {
                setPost(res)
            })
    }, [])
    
    return (
        <section className="postDetail">
                <h3 className="postTitle">{post.title}</h3>
                <div className="postPublication_date">Date Published: {post.publication_date}</div>
                <div className="postContent">Content: {post.content}</div>
                <div className="postAuthor">Author: {post.user?.first_name} {post.user?.last_name}</div>
                <div className="postCategory">Category: {post.category?.label}</div>
            <div className="postDetailButtonDiv">
                <button className="button" onClick={() => {
                    history.push(`/posts/edit/${post.id}`)
                }}>Edit</button>
                <button className="button" onClick={handleDelete} >Delete</button>
                <button className="button" onClick={() => history.push("/posts")}>Back</button>
            </div>
            <div className="commentButtonDiv">
                <button className="button commentButton" onClick={() => history.push(`/posts/${post.id}/createcomment`)}>Comment</button>
            </div>
        </section>
    )
}