import React, { useEffect, useContext } from "react"
import { EventContext } from "../event/EventProvider.js"
import { HumanDate } from "../utils/HumanDate.js"
import { ProfileContext } from "../auth/AuthProvider.js"
import "./Profile.css"


export const Profile = (props) => {
    const { profile, getProfile } = useContext(ProfileContext)
    const { leaveEvent } = useContext(EventContext)

    useEffect(() => {
        getProfile()
    }, [])

    return (
        <div className="profile">
            <h3 className="userName">
                
            </h3>
        </div>
    )
}