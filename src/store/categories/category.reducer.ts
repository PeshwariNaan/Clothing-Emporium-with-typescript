import { AnyAction } from "redux";
import { Category } from "./category.types";
import { fetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesFailed } from "./category.action";


export type CategoriesState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
}

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

//Replaced switch statement with if statements in this now matchable reducer
export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action: AnyAction
): CategoriesState => {
  if(fetchCategoriesStart.match(action)) {
    return {...state, isLoading: true}
  }
  if(fetchCategoriesSuccess.match(action)) {
    return {...state, categories: action.payload, isLoading: false}
  }
  if(fetchCategoriesFailed.match(action)) {
    return { ...state, error: action.payload, isLoading: false };
  }

  return state
}

// export const categoriesReducer = (
//   state = CATEGORIES_INITIAL_STATE,
//   action = {} as CategoryAction //This pattern is called a discriminanting union - it will only respond to the 3 actions inside
// ) => { 
//     switch (action.type) {
//     case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
//       return { ...state, isLoading: true };

//     case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
//       return {
//         ...state,
//         categories: action.payload,
//         isLoading: false
//       };

//     case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
//       return { ...state, error: action.payload, isLoading: false };
//     default:
//       return state;
//   }
// };
