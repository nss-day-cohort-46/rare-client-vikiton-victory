import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "./PostProvider"
import { CommentContext } from "../comments/CommentProvider"
import { useHistory, useParams } from "react-router-dom"
import "./Posts.css"
import { TagContext } from "../tags/TagsProvider"

export const PostDetail = () => {

    const { deletePost, getPostById } = useContext(PostContext)
    const { tags } = useContext(TagContext)
    const {deleteComment} = useContext(CommentContext)

    const [post, setPost] = useState({})

    const history = useHistory()

    const { postId } = useParams()

    const handleDelete = () => {
        deletePost(post.id)
        .then(() => {
            history.push("/posts")
        })
    }


    const handleDeleteComment = () => {
        deleteComment(post.comment_set.id)
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
                <h2 className="postTitle">{post.title}</h2>
                <div className="postImageDetailDiv">
                    <img className="postImage" src={post.image_url} alt="postImage"></img>
                </div>
                <div className="postPublication_date">Date Published: {post.publication_date}</div>
                <div className="postContent">Content: {post.content}</div>
                <div className="postAuthor">Author: {post.user?.first_name} {post.user?.last_name}</div>
                <div className="postCategory">Category: {post.category?.label}</div>
                <div className="tagDiv">
                    <h4 className="postTag">Tags: </h4>
                    {
                        post.tags?.map(tag => {
                            return <div className="postTag" key={tag.id}>{tag.label},</div>
                        })
                    }
                    </div>
                <h4>Comments: </h4>
                <div className="post__comment">
                {post.comment_set?.map((comment) => {
                    return (
                    <div className="individual_comment">
                        <section key={`comment--${comment.id}`} className="comment">
                            <div className="comment__content">
                                {comment.content} 
                                <button className="button">edit</button>
                                <button className="button">X</button>
                            </div>
                        </section>
                    </div>
                )
            })
            }
        </div>
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
            </div>
        </section>
    )
}