import React, { useContext, useEffect, useState } from "react";
import { CategoryContext } from "./CategoryProvider";
import "./Category.css";

export const CategoryDetails = (props) => {
  const {
    deleteCategory,
    getCategoryById,
    getCategories
  } = useContext(CategoryContext);

  const [category, setCategory] = useState({});

  useEffect(() => {
    const categoryId = parseInt(props.match.params.categoryId);
    getCategoryById(categoryId).then(setCategory);
  }, []);

  useEffect(() => {
    getCategories()
  }, []);
  return (
    <section className="categoryDetail">
      <h1 className="categoryName">{category.label}</h1>
      
<div className="categoryCRUD">

        <button
          onClick={() => {
            props.history.push(`/categories/new`);
          }}
        >
          New Category
        </button>
      <button
        onClick={() =>
          deleteCategory(category.id).then(() => props.history.push("/"))
        }
      >
        Delete category
      </button>
      </div>
    </section>
  );
};
