import React, { useState, useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { TagContext } from "./TagsProvider"
import { TagCard } from "./TagCard"
import "./Tag.css"

// Handles crud on the main list of tags.

export const TagManagement = () => {
    const { getTags, tags} = useContext(TagContext)

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
                        tags.map(tag => <TagCard key={tag.id} tag={tag} />)
                    }
                </div>
            </section>
        </>
    )
}