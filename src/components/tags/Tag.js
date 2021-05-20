import React, { useContext } from "react"
import "./Tag.css"
import { useHistory, useParams } from "react-router-dom"
import {TagContext} from "./TagsProvider"


export default ({ tag }) => {

const history = useHistory()
const { postId } = useParams()
const {deleteTag} = useContext(TagContext)

const handleDeleteTag = () => {
  console.log("click")
  deleteTag(tag.id)

}




return (
    <section className="singleTag">
        <h3 className="tag__title">
          {tag.label}
        </h3>
        <button className="button" onClick={() => {history.push(`/tags/edit/${tag.id}`)}}>Edit</button>
        <button className="button" onClick={handleDeleteTag}>Delete</button>
        <button className="button" >Add to Post</button>
    </section>
)
}