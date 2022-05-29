import { createSelector } from "reselect";  //This will memoize things meaning that if the input going into a function reamains the same
// then the output (considering it's a pure function) will also remain the same negating the need to run the calculation again.

const selectCategoryReducer = (state) => state.categories; // Get the slice of the entire state (here this is categories)

//Now we create a memoized selector for this slice of data. As long as nothing changes in the categories state then nothing will rerun
export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
)


// Now this is memoized - as long as the categories array does not change then don't rerun - this will optimize the app
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => {
    console.log('Categories selector fired')
    return categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
  }
);


// Creating a new selector to use to check the isLoading state and display the spinner
export const selectCategoriesisLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
)
  
  

