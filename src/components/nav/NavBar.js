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
            <li className="navbar__item">
                <Link className="navbar__link" to="/">Home</Link>
            </li>
            <li className="navbar__item">
                <Link className="nav-link" to="/categories">Category Management</Link>
            </li>
            <li className="navbar__item">
                <Link className="nav-link" to="/tags">Tag Management</Link>
            </li>
            <li className="navbar__item">
                <Link className="nav-link" to="/posts">My Posts</Link>
            </li>
            
            {!!isAdmin ? 
            <li className="navbar__item">
                <Link className="nav-link" to="/profiles">User Management</Link>
            </li> : ""}

            {
                (localStorage.getItem("rare_user_id") !== null) ?
                    <li className="navbar__item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("rare_user_id")
                                history.push({ pathname: "/" })
                            }}
                        >Logout</button>
                    </li> :
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
