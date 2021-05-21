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
}

return (
  <>
    <section className="singleTag">
      <article className="tagsArticle">
        <h3 className="tag__title">
          {tag.label}
        </h3>
        <button className="button" value={tag.id} onClick={handleAddTag}>Add to Post</button>
      </article>
      <article className="addedTagsArticle">
        
      </article>
    </section>
  </>
)
}