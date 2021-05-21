import React, {useEffect, useContext} from "react"
import { Link, useHistory } from "react-router-dom"
import {ProfileContext} from "../profiles/ProfileProvider"
import "./NavBar.css"
import Logo from "./rare.jpeg"

export const NavBar = () => {
    const history = useHistory()
    const {getProfiles, profiles} = useContext(ProfileContext)

    useEffect(() =>{
        getProfiles()
        .then()
    }, [])

    const isAdmin = JSON.parse(localStorage.getItem("admin"))
    return (
        <ul className="navbar">
            <li className="navbar__item">
                <img className="navbar__logo" src={Logo} />
            </li>
            <button className="navbar__item button" onClick={() => history.push("/")}>
                Home
            </button>
            <button className="navbar__item button" onClick={() => history.push("/categories")}>
                Category Management
            </button>
            <button className="navbar__item button" onClick={() => history.push("/tags")}>
                Tag Management
            </button>
            <button className="navbar__item button" onClick={() => history.push("/posts")}>
                My Posts
            </button>
            
            {!!isAdmin ? 
            <button className="navbar__item button" onClick={() => history.push("/profiles")}>
                User Management
            </button> : ""}

            {
                (localStorage.getItem("rare_user_id") !== null) ?
                        <button className="navbar__item button"
                            onClick={() => {
                                localStorage.removeItem("rare_user_id")
                                history.push({ pathname: "/" })
                            }}
                        >Logout</button>
                    :
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>

                    </>
            }        
        </ul>
    )
}
