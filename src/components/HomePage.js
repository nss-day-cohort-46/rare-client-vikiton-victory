import React, {useContext, useState, useEffect} from "react"
import {ProfileContext} from "./profiles/ProfileProvider"
import "./HomePage.css"


export const HomePage = () => {
  const { getProfileById, profiles } = useContext(ProfileContext)
const userId = localStorage.getItem("rare_current_user_id")
const [currentUser, setCurrentUser] = useState({})

useEffect(() => {
    getProfileById(userId)
    .then((res => 
      setCurrentUser(res)))
      .then( () => (console.log(currentUser)))
}, [])

return (
  <>
    <section className="homePage">
        <div className="title">Rare</div>
        <img className="homeImage" src="https://res.cloudinary.com/dwqyn2atu/image/upload/v1621622136/diary-3299128_1920_b0bk0b.jpg" alt="homePageImage"/>
        <p className="welcomeUser">Welcome {currentUser.user?.first_name}</p>

    </section>
  </>
)
}