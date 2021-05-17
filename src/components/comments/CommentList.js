import React, { useContext, useEffect, useState } from "react"
import { CommentContext } from "./CommentProvider"
import { CommentCard } from "./Comment"
import { useHistory } from "react-router-dom"


export const CommentList = () => {
    const history = useHistory()
   
    const { comments, getComments } = useContext(CommentContext)

    const [isloading, setIsLoading] = useState(true)


    useEffect(() => {
        getComments()
        .then(() => setIsLoading(false))
    }, [])

    if (isloading){
        return (<div>Loading Comments</div>)
    }

    return (
        <div className="comments">
          <h2>Comments</h2>
          <button className="btn category__button" onClick={() => {history.push("/comments/create")}}>
            Add Comment
          </button>

          { comments.map((comment, index) => {
              // {console.log("comments", comment)}
              return <CommentCard key={index} category={comment} />
            })
          }
        </div>
      )
    }