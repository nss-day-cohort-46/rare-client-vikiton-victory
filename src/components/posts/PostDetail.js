import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "./PostProvider"
import { useHistory, useParams } from "react-router-dom"
import "./Posts.css"
import { TagContext } from "../tags/TagsProvider"

export const PostDetail = () => {

    const { deletePost, getPostById } = useContext(PostContext)
    const { tags, getTags } = useContext(TagContext)

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
                .then(getTags)
    }, [])
    
    return (
        <section className="postDetail">
                <h3 className="postTitle">{post.title}</h3>
                <div className="postImageDetailDiv">
                    <img className="postImage" src={post.image_url} alt="postImage"></img>
                </div>
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
                <button className="button" onClick={() => history.push(`/tags/${post.id}`)}>Tag Management</button>
                {/* <fieldset>
                    <div>
                        <label htmlFor="tag"></label>
                        <select id="tag"
                            placeholder="Select a Tag"
                            className="formControl">
                            <option value="0">Select a Tag</option>
                            {
                                tags.map(tag => (
                                    <option key={tag.id} value={tag.id}>
                                        {tag.label}
                                    </option>
                            ))}
                        </select>
                    </div>
                </fieldset> */}
            </div>
        </section>
    )
}