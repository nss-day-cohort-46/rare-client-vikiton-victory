import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import {TagContext} from "./TagsProvider"
import { PostContext } from "../posts/PostProvider"
import "./Tag.css"


export default ({ tag }) => {

const history = useHistory()
const { postId } = useParams()

const { deleteTag } = useContext(TagContext)
const { getPostById, updatePostTags } = useContext(PostContext)
const [post, setPost] = useState()

let tagsArray = []

const handleDeleteTag = () => {
  console.log("click")
  deleteTag(tag.id)

}

useEffect(() => {
  getPostById(postId)
    .then(res => {
      setPost(res)
    })
}, [])

const handleAddTag = (event) => {
  const newTag = parseInt(event.target.value)
  tagsArray.push(newTag)
  updatePostTags(post, newTag)

  console.log(tagsArray)
}

return (
  <>
    <section className="singleTag">
        <h3 className="tag__title">
          {tag.label}
        </h3>
        <button className="button" onClick={() => {history.push(`/tags/edit/${tag.id}`)}}>Edit</button>
        <button className="button" onClick={handleDeleteTag}>Delete</button>
        <button className="button" value={tag.id} onClick={handleAddTag}>Add to Post</button>
    </section>
        <button className="button" onClick={handleAddTag}>Save Tags</button>

  </>
)
}