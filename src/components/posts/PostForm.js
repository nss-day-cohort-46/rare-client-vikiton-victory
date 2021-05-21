import React, { useState, useContext, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { PostContext } from "./PostProvider"
import { CategoryContext } from "../categories/CategoryProvider"
import { TagContext } from "../tags/TagsProvider"
import "./Posts.css"

export const PostForm = () => {

    const { addPost, getPostById, updatePost } = useContext(PostContext)
    const { categories, getCategories } = useContext(CategoryContext)
    const { tags, getTags } = useContext(TagContext)
    const currentUser = localStorage.getItem("rare_user_id")

    const [ post, setPost ] = useState({
        user_id: parseInt(currentUser),
        category: 0,
        title: "",
        image_url: "",
        content: "",
        approved: true,
        tags: ""
    })

    const [ isLoading, setIsLoading ] = useState(true)

    const history = useHistory()
    const { postId } = useParams()
    
    useEffect(() => {
        getCategories()
            .then(getTags)
    }, [])

    const handleControlledInputChange = (event) => {
        const newPost = { ...post }
        newPost[event.target.id] = event.target.value
        setPost(newPost)
    }


    const  handleSavePost = () => {
        if (post.title === "" && post.content === "" ) {
            window.alert("Please complete all fields")
        } else {
            setIsLoading(true)
            if (postId) {
                updatePost({
                    id: parseInt(postId),
                    user_id: post.user_id,
                    category: parseInt(post.category),
                    title: post.title,
                    image_url: post.image_url,
                    content: post.content,
                    approved: post.approved,
                    tags: post.tags
                })
                    .then(() => history.push(`/posts/detail/${post.id}`))
            } else {
                    addPost({
                        user_id: post.user_id,
                        category: parseInt(post.category),
                        title: post.title,
                        image_url: post.image_url,
                        content: post.content,
                        approved: post.approved,
                        tags: post.tags
                    })
                    .then(() => history.push("/posts"))
            }
        }
    } 

    useEffect(() => {
        getCategories()
        .then(() => {
            if (postId) {
                getPostById(postId)
                .then(post => {
                    setPost({
                        id: post.id,
                        user_id: post.user_id,
                        category: parseInt(post.category.id),
                        title: post.title,
                        image_url: post.image_url,
                        content: post.content,
                        approved: post.approved,
                        tags: parseInt(post.tags.id)
                    })
                    setIsLoading(false)
                })
            } else {
                setIsLoading(false)
            }
        })
    }, [])

    return (
        <section className="postFormSection">
            <form className="postForm">
                <h2 className="postFormTitle">{postId ? "Update Post" : "Create a Post"}</h2>
                <fieldset>
                    <label htmlFor="title">Title: </label>
                    <input type="text" id="title" required autoFocus
                        placeholder="Post Title"
                        defaultValue={post.title}
                        onChange={handleControlledInputChange}
                        ></input>
                </fieldset>
                <fieldset>
                    <label htmlFor="content"></label>
                    <textarea type="text" id="content" required autoFocus className="formControl postTextArea"
                        placeholder="Enter Text Here"
                        onChange={handleControlledInputChange}
                        defaultValue={post.content}></textarea>
                </fieldset>
                <fieldset>
                    <div>
                        <label htmlFor="category"></label>
                        <select value={post.category} id="category"
                            placeholder="Select a Category"
                            className="formControl"
                            onChange={handleControlledInputChange}>
                            <option value="0">Select a Category</option>
                            {
                                categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.label}
                                    </option>
                            ))}
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <label htmlFor="image_url">Image Link: </label>
                    <input type="text" id="image_url" required autoFocus
                        placeholder="Image URL"
                        defaultValue={post.image_url}
                        onChange={handleControlledInputChange}
                        ></input>
                </fieldset>
                <button disabled={isLoading}
                        className="button savePostButton"
                        onClick={evt => {
                            evt.preventDefault()
                            handleSavePost()
                        }}>
                    {postId ? "Save Updates" : "Create Post"}
                </button>
                <button className="button cancelButton" onClick={() => history.push("/posts")}>Cancel</button>
            </form>
        </section>
    )

}