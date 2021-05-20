import React, { useState } from "react"


export const TagContext = React.createContext()


export const TagProvider = (props) => {
    const [tags, setTags] = useState([])
    const [searchTerms, setSearchTerms] = useState("")

    const getTags = () => {
        return fetch("http://localhost:8000/tags", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
            .then(response => response.json())
            .then(setTags)
    }
    
    const getTagById = (tagId) => {
        return fetch(`http://localhost:8000/tags/${tagId}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
        .then(res => res.json())
    }

    const addTag = (tag) => {
        return fetch("http://localhost:8000/tags", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
            body: JSON.stringify(tag)
        })
            .then(getTags)
    }

    const updateTag = tag => {
    return fetch(`http://localhost:8000/tags/${tag.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
        },
        body: JSON.stringify(tag)
    })
        .then(getTags)
}

    const deleteTag = (tagId) => {
    return fetch(`http://localhost:8000/tags/${tagId}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
        }
    })
        .then(getTags)
}



    return (
        <TagContext.Provider value={{
            tags, addTag, getTags, updateTag, deleteTag, getTagById
        }}>
            {props.children}
        </TagContext.Provider>
    )
}