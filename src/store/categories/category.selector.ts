import { createSelector } from "reselect";  //This will memoize things meaning that if the input going into a function remains the same

import { CategoriesState } from "./category.reducer";

import { CategoryMap } from "./category.types";

const selectCategoryReducer = (state): CategoriesState => state.categories; // Get the slice of the entire state (here this is categories)


export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
)


export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => {
    console.log('Categories selector fired')
    return categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {} as CategoryMap)
  }
);


export const selectCategoriesisLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
)
  
  

