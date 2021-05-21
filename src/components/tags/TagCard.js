import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import {TagContext} from "./TagsProvider"
import { PostContext } from "../posts/PostProvider"
import "./Tag.css"


export const TagCard = ({ tag }) => {

const history = useHistory()
const { postId } = useParams()

const { deleteTag } = useContext(TagContext)

let tagsArray = []

const handleDeleteTag = () => {
  console.log("click")
  deleteTag(tag.id)

}

return (
  <>
    <section className="singleTag">
        <h3 className="tag__title">
          {tag.label}
        </h3>
        <button className="button" onClick={() => {history.push(`/tags/edit/${tag.id}`)}}>Edit</button>
        <button className="button" onClick={handleDeleteTag}>Delete</button>
    </section>
  </>
)
}