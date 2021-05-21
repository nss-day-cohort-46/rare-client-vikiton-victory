import React, {useContext, useEffect} from "react"
import {CategoryContext} from "../categories/CategoryProvider"
import {CategoryCard} from "../categories/Category"
import { useHistory } from "react-router-dom"
import "../categories/Category.css"

export const CategoryList = () => {
  
  const { categories, getCategories, deleteCategory } = useContext(CategoryContext)
  //  // The useHistory hook tells React which route to visit. Tells React to render the category form component.
  const history = useHistory()

    // This state changes when `getCategories()` is invoked below
  
    //useEffect - reach out to the world for something - API call for the categories; wil only run one time at intial render because array is empty
    useEffect(() => {
      getCategories()

    },[]);
  
    return (
      <article className="categoryHolder">
    <button
        className="button"
        onClick={() => {
          history.push({ pathname: "/categories/new" });
        }}
      >
        Register New category
      </button>
      <article className="category">
      {categories.map((category) => {      
        return (
          <div className="individualCategories">
          <section key={`category--${category.id}`} className="category">
            <div className="category__label">
              Name of the category: {category.label}
            </div>
            <button className="editCatButton"
        onClick={() => {
          history.push(`/categories/edit/${category.id}`);
        }}
      >
        Edit
      </button>
      <button className="deleteButtonClass"
        onClick={() =>
          deleteCategory(category.id).then(() => history.push("/categories"))
        }
      >
        Delete category
      </button>
          </section>
          </div>
        );
      })}</article>
 
     </article>
    )
  }