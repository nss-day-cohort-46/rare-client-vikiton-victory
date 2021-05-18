import React, {useState} from "react"

export const ProfileContext = React.createContext()
export const ProfileProvider = () =>{
    const [profiles, setProfiles] = useState([])

    const getProfiles = () => {
      return fetch("http://localhost:8000/profiles", {
          headers:{
              "Authorization": `Token ${localStorage.getItem("lu_token")}`
          }
      })
          .then(response => response.json())
          .then(setProfiles)
    }
}