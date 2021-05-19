import React, { useEffect, useContext } from "react"
import { HumanDate } from "../utils/HumanDate.js"
import { ProfileContext } from "../auth/AuthProvider.js"
import "./Profile.css"


export default ({ profile }) => {




    return (
        <div className="profile">
            <h3 className="fullName">
                {profile.user.first_name}{profile.user.last_name}
            </h3>
            <h4 className="displayName">
                {profile.user.username}
            </h4>
            <div className="email">
                {profile.user.email}
            </div>
            <div className="creationDate">
                {profile.created_on}
            </div>
            <div className="profileType">
                {
                    profile.user.is_staff === true ? "admin":"pleb"
                }
            </div>
        </div>
    )
}