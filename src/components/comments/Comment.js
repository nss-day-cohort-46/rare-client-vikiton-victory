import React, { useContext } from "react"
import { useHistory } from "react-router-dom"
import { CommentContext } from "./CommentProvider"

export const CommentCard = ({ category }) => {

    const history = useHistory()
    const { deleteComment } = useContext(CommentContext)

    const handleDelete = () => {
        if (window.confirm('STOP! Do you want to delete this comment?')) {
        deleteComment(category.id)
            .then(() => {
                history.push("/comments")
            })
        }
    }

    return (
        <section className="comment_card_section">
        <h2 className="comment_subject"> {category?.subject} </h2>
        <div className="comment_content">Content: {category?.content}</div>
        <div className="comment_date_time">Date: {category?.created_on} </div>
        <div className="edit_comment">
            <button onClick={() => history.push(`/comments/edit/${category.id}`)}>Edit Comment</button>
        </div>
        <div className="delete_comment">
            <button onClick={handleDelete}>Delete Comment</button>
        </div>
        </section>
    )

}
