import React, { useContext, useEffect, useState } from "react";
import { CommentContext } from "./CommentProvider";
import { useHistory, useParams } from "react-router-dom"

export const CommentForm = () => {
    
    const {addComment, editComment, getCommentById } = useContext(CommentContext)
    const { postId, commentId } = useParams()
    
    const [comment, setComment] = useState({
        subject:"",
        content: "",
        created_on: new Date().toISOString(),
        post_id: +postId,
        author_id: +localStorage.getItem("rare_user_id")
    })

    const [isloading, setIsLoading] = useState(true)

    const history = useHistory()

    const handleControlledInputChange = (event) => {
        console.log(comment, "comment")
        const newComment = { ...comment }
        newComment[event.target.id] = event.target.value
        newComment.created_on = new Date().toISOString()
        setComment(newComment)
    }

    const handleSaveComment = (postId) => {
            setIsLoading();

            if (commentId) {
                editComment({
                    id: parseInt(commentId),
                    subject:comment.subject,
                    content: comment.content,
                    created_on: comment.created_on,
                    post_id: comment.post_id,
                    author_id: localStorage.getItem("rare_user_id")
                })
                    .then(() => history.push(`/posts/detail/${postId}`))
            } else {
                addComment(comment)
                    .then(() => history.push(`/posts/detail/${postId}`))
            }
        }

    useEffect(() => {
        if(commentId) {
            getCommentById(commentId)
                .then(comment => {
                    setComment(comment)
                    setIsLoading(false)
                })
            } else {
                setIsLoading(false)
            }
    }, [])

    return (
        <form className="commentForm">
            <h2 className="comment_form">{commentId ? "Edit Comment" : "Add Comment"}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="subject">Subject</label>  
                    <textarea type="text" id="subject" required autoFocus className="form-control" onChange={handleControlledInputChange} defaultValue={comment.subject} />
                    <label htmlFor="content">Content</label>  
                    <textarea type="text" id="content" required autoFocus className="form-control" onChange={handleControlledInputChange} defaultValue={comment.content} />
                </div>
            </fieldset>

            <button className="btn btn-primary"
                onClick={event => {
                    event.preventDefault()
                    handleSaveComment(comment.post_id)
                }}>
                    {commentId ? "Save Comment" : "Add Comment"}
            </button>
        </form>
    )
}