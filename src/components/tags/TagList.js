import React, { useState, useContext, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { TagContext } from "./TagsProvider"
import Tag from "./Tag"
import "./Tag.css"

// Handles adding tags to an individual post.

export const TagList = () => {
    const { getTags, tags} = useContext(TagContext)
    const { postId } = useParams()

    const [ filteredTags, setFilteredTags] = useState([])

    const history = useHistory()

    useEffect(() => {
        getTags()
    }, [])

    return (
        <>
            <section className="tagSection">
                <div className="createTagButtonDiv" onClick={() => history.push("/tags/create")}>
                    <button className="button createTagButton">Create a Tag</button>
                </div>
                <div className="tags">
                    {
                        tags.map(tag => <Tag key={tag.id} tag={tag} />)
                    }
                </div>
                <button className="button" id="saveTagButton" onClick={() => history.push(`/posts/detail/${postId}`)}>Save Tags</button>
            </section>
        </>
    )
}





