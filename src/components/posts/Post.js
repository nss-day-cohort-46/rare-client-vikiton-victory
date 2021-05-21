import React from "react"
import "./Posts.css"
import { Link } from "react-router-dom"

export const Post = ({ post }) => (
    <section className="singlePost">
        <div className="postImageDiv">
            <img className="postImage" src={post.image_url} alt="postImage"></img>
        </div>
        <h3 className="post__title">
            <Link to={`/posts/detail/${post.id}`}>
                {post.title}
            </Link>
        </h3>
        <div className="post__publication_date">{post.publication_date}</div>
        <div className="post__content">{post.content}</div>
        <div className="post__category">{post.category.label}</div>
        <div className="post__author">Author: {post.user?.first_name} {post.user?.last_name}</div>
        <div className="post__comment">
            {post.comment_set?.map((comment) => {
                return (
                    <div className="individualcomment">
                        <section key={`comment--${comment.id}`} className="comment">
                            <div className="comment__content">
                                Comment: {comment.content}
                            </div>
                        </section>
                    </div>
                )
            })
            }
        </div>
    </section>
)