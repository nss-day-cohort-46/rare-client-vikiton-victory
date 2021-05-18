import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const CategoryContext = createContext()

// This component establishes what data can be used.
export const CategoryProvider = (props) => {
    const [categories, setCategories] = useState([{
        label: "Javascript"
    }])

    const getCategories = () => {
        return fetch("http://localhost:8000/categories", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
        // .then(res => res.json())
        // .then(setCategories)
    }

    const addCategory = categoryObj => {
        return fetch("http://localhost:8000/categories", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(categoryObj)
        })
        
    }

    const getCategoryById = (id) => {
        return fetch(`http://localhost:8000/categories/${id}`)
            .then(res => res.json())
    }


    const deleteCategory = categoryId => {
        return fetch(`http://localhost:8000/categories/${categoryId}`,{
            method: "DELETE"
        })
            .then(getCategories)
    }

    const updateCategory = category => {
        return fetch(`http://localhost:8000/categories/${category.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(category)
        })
          .then(getCategories)
      }
    /*
        You return a context provider which has the
        `categories` state, `getCategories`,
        `addCategory`  and get getCategoryById functions as keys. This
        allows any child elements to access them.
    */
    return (
        <CategoryContext.Provider value={{
            categories, getCategories, addCategory, getCategoryById, deleteCategory, updateCategory
        }}>
            {props.children}
        </CategoryContext.Provider>
    )
}