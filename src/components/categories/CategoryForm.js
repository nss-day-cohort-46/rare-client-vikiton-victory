import React, { useContext, useEffect, useState } from "react"
import { CategoryContext } from "../categories/CategoryProvider"
import "../categories/Category.css"
import { useHistory, useParams } from 'react-router-dom';

export const CategoryForm = () => {
  const { addCategory, updateCategory, getCategories, getCategoryById } = useContext(CategoryContext)

  //for edit, hold on to state of categories in this view

  const [categories, setCategories] = useState({
    label: "",
    id: 0,

  });

  //wait for data before button is active. Look at the button to see how it's setting itself to disabled or not based on this state
  const [isLoading, setIsLoading] = useState(true);

  // Now that the form can be used for editing as well as adding a category, you need access to the category id for fetching the category you want to edit
  const { categoryId } = useParams();
  const history = useHistory();

  /*
  Reach out to the world and get categories state
  on initialization.
  */
  useEffect(() => {
    getCategories().then(() => {
      if (categoryId) {
        getCategoryById(categoryId)
          // giving whatever I grabbed from the database
          .then(categories => {
            setCategories(categories)
            // isLoading state variable set to false so button can't be clicked
            setIsLoading(false)
          })
      } else {
        setIsLoading(false)
      }
    })
  }, [])
  //when a field changes, update state. The return will re-render and display based on the values in state

  //Controlled component
  const handleControlledInputChange = (event) => {
    /* When changing a state object or array,
    always create a copy, make changes, and then set state.*/
    const newCategory = { ...categories }
    let selectedVal = event.target.value
    // forms always provide values as strings. But we want to save the ids as numbers. 
    if (event.target.id.includes("Id")) {
      selectedVal = parseInt(selectedVal)
    }
    /* Category is an object with properties.
    Set the property to the new value
    using object bracket notation. */
    newCategory[event.target.id] = selectedVal
    // update state
    setCategories(newCategory)
  }

  const handleSaveCategory = () => {
    if (categoryId) {
      //PUT - update
      updateCategory({
        id: categories.id,
        label: categories.label

      })
        .then(() => history.push(`/categories`))
    } else {
      //disable the button - no extra clicks
      setIsLoading(true);
      // This is how we check for whether the form is being used for editing or creating. If the URL that got us here has an id number in it, we know we want to update an existing record of a category

      {
        //POST - add
        addCategory({
          label: categories.label

        })
          .then(() => history.push("/categories"))
      }
    }
  }



  return (
    <form className="category__form">
      <h2 className="categoryForm__title">New Category</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="category__label">Category Name:</label>
          <input className="category__label" type="text" id="label" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Category Name" value={categories.label} />
        </div>
      </fieldset>


      <button className="button save_new_cat_button"
        disabled={isLoading}
        onClick={event => {

          event.preventDefault() // Prevent browser from submitting the form and refreshing the page
          handleSaveCategory()
        }}>
        {categoryId ? "Save" : "Add Category"}
        </button>
           
    </form>
  )
}