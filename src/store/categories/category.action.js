import { createAction } from "../../utils/reducer.utils";
import { CATEGORY_ACTION_TYPES } from "./category.types";

export const setCategoriesMap = (categoriesMap) => {
  return createAction(CATEGORY_ACTION_TYPES.SET_CATEGORY_MAP, categoriesMap)
}
