import AddCategories from "../manageCategories/AddCategories";
import { useState } from "react";

const CategoryManager = () => {
  const [categories, setCategories] = useState([]); // Maintain state for categories

  // This function will handle the newly created category
  const handleCategoryCreated = (newCategory) => {
    setCategories((prevCategories) => [...prevCategories, newCategory]); // Update the state with the new category
    console.log("Category created successfully!", newCategory); // Optionally log the new category
  };

  return (
    <div>
      <h1>Manage Categories</h1>
      {/* Pass the handleCategoryCreated function to AddCategories as a prop */}
      <AddCategories onCategoryCreated={handleCategoryCreated} />

      {/* Optionally display the list of categories */}
      <div>
        <h2>Categories List:</h2>
        <ul>
          {categories.map((category) => (
            <li key={category._id}>{category.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryManager;
