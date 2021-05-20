import React, { useState, useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { ProfileContext } from "./ProfileProvider"
import Profile from "./Profile"
import "./Profile.css"

export const ProfileList = () => {
    const { getProfiles, profiles } = useContext(ProfileContext)


    const history = useHistory()

    useEffect(() => {
        getProfiles()
    }, [])


    console.log(profiles)


    return (
        <div className="profileList">
          {
            profiles.map(profile => <Profile key={profile.id} profile={profile}/>)
          }
        </div>
    )
}