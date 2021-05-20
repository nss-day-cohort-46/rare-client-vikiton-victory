import React, {useState, createContext} from "react"

//create global variable
export const CommentContext = createContext()

export const CommentProvider = (props) => {
    const [comments, setComments] = useState([])
    
    const getComments = () =>  {
        return fetch("http://localhost:8000/comments", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
                }
        })
            .then(res => res.json())
            .then(setComments)
    }

    const addComment = commentObj => {
        return fetch ("http://localhost:8000/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
            body: JSON.stringify(commentObj)
        })
            .then(getComments)
    }

    const deleteComment = commentId => {
        return fetch(`http://localhost:8000/comments/${commentId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(getComments)
    }

    const editComment = comment=> {
        return fetch (`http://localhost:8000/comments/${comment.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
            body: JSON.stringify(comment)
        })
            .then(getComments)
    }

    const getCommentById = (id) => {
        return fetch(`http://localhost:8000/comments/${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(res => res.json())        
    }


    return (
        <CommentContext.Provider value={{
            comments, getComments, addComment, deleteComment, editComment, getCommentById 
        }}>
            {props.children}
        </CommentContext.Provider>
    )
}