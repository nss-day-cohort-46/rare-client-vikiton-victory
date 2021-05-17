import React, { useContext, useEffect, useState } from "react"
import { CommentContext } from "./CommentProvider"
import { useParams, useHistory } from "react-router-dom"

export const CommentDetail = () =>  {
    const { getCommentByPostId, deleteComment } = useContext(CommentContext)

    const [comment, setComment] = useState({})

    const {commentId} = useParams();

    const history = useHistory();
    
    useEffect(() => {
        getCommentByPostId(commentId)
        .then((response) => {
            setComment(response)
        })
    }, [])
    
    
    console.log("State-comment", comment)
return (
    <section className="comment_detail">
      <h3 className="comment__subject">Subject {comment.subject}</h3>
      <div classname="comment_submission">
      <div className="comment_content">{comment.content}</div>
      <div className="comment_date">Date: {comment.created_on}</div>

      <div>
      <button className="btn edit_comment_button" onclick={() => { history.push(`/comments/edit/${comment.id}`)}}>Edit</button>
      </div>
      
     </div>
    </section>

)

}