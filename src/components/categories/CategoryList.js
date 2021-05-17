import React, {useContext, useEffect} from "react"
import {CategoryContext} from "../categories/CategoryProvider"
import {CategoryCard} from "../categories/Category"
import "../categories/Category.css"
import { useHistory } from "react-router-dom"

export const CategoryList = () => {

  //  // The useHistory hook tells React which route to visit. Tells React to render the category form component.
  const history = useHistory()

    // This state changes when `getCategories()` is invoked below
    const { categories, getCategories } = useContext(CategoryContext)
  
    //useEffect - reach out to the world for something - API call for the categories; wil only run one time at intial render because array is empty
    useEffect(() => {
    //   console.log("CategoryList: useEffect - getCategories")
      getCategories()

    }, [])
    const sortedCategories = categories.sort((a, b) => a.label > b.label ? 1 : -1)

  
    return (
      <div className="categories">
        <h2>Categories</h2>
        <button className="button category__button" onClick={() => {history.push("/categories/create")}}>
            Create Category
          </button>
        
        {
            // using .map method to iterate the array of categories and generate HTML for each one by invoking the "CategoryCard" comp
          sortedCategories.map(category=> {
            //   key and location become properties on the object passed in as in argument
            return <CategoryCard key={category.id} category={category} />
          })
        }
      </div>
    )
  }