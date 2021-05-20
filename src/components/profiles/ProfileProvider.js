import React, {useState} from "react"

export const ProfileContext = React.createContext()
export const ProfileProvider = (props) =>{
    const [profiles, setProfiles] = useState([])

    const getProfiles = () => {
      return fetch("http://localhost:8000/profiles", {
          headers:{
              "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
          }
      })
          .then(response => response.json())
          .then(setProfiles)
    }

    const getProfileById = (profileId) => {
      return fetch(`http://localhost:8000/profiles/${profileId}`, {
          headers:{
              "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
          }
      })
      .then(res => res.json())
  }
    return (
      <ProfileContext.Provider value={{
          profiles, getProfiles, getProfileById
      }}>
          {props.children}
      </ProfileContext.Provider>
  )
}