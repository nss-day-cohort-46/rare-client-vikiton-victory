import React, { useState, useContext, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { PostContext } from "./PostProvider"
import { CategoryContext } from "../categories/CategoryProvider"
import "./Posts.css"

export const PostForm = () => {

    const { addPost, getPostById, updatePost } = useContext(PostContext)
    const { categories, getCategories } = useContext(CategoryContext)
    const currentUser = localStorage.getItem("rare_user_id")

    const [ post, setPost ] = useState({
        user_id: parseInt(currentUser),
        category_id: 0,
        title: "",
        image_url: "",
        content: "",
        approved: true
    })

    const [ isLoading, setIsLoading ] = useState(true)

    const history = useHistory()
    const { postId } = useParams()
    
    useEffect(() => {
        getCategories()
    }, [])

    const handleControlledInputChange = (event) => {
        const newPost = { ...post }
        newPost[event.target.id] = event.target.value
        setPost(newPost)
    }


    const  handleSavePost = () => {
        if (post.title === "" && post.title === "" ) {
            window.alert("Please complete all fields")
        } else {
            setIsLoading(true)
            if (postId) {
                updatePost({
                    id: post.id,
                    user_id: post.user_id,
                    category_id: parseInt(post.category_id),
                    title: post.title,
                    image_url: post.image_url,
                    content: post.content,
                    approved: post.approved
                })
                    .then(() => history.push(`/posts/detail/${post.id}`))
            } else {
                addPost({
                    user_id: post.user_id,
                    category_id: parseInt(post.category_id),
                    title: post.title,
                    image_url: post.image_url,
                    content: post.content,
                    approved: post.approved
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
                    setPost(post)
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
                        <label htmlFor="category_id"></label>
                        <select value={post.category_id} id="category_id"
                            placeholder="Select a Category"
                            className="formControl"
                            onChange={handleControlledInputChange}>
                            <option value="0">Select a category</option>
                            {categories.map(cat => (
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