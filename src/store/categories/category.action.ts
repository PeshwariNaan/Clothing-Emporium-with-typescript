import { CATEGORIES_ACTION_TYPES, Category } from './category.types';

import {
  createAction,
  Action,
  ActionWithPayload,
} from '../../utils/reducer.utils';

// export const setCategoriesMap = (categoriesArray) => {
//   return createAction(CATEGORY_ACTION_TYPES.SET_CATEGORIES, categoriesArray)
// }

export type CategoryAction =
  | FetchCategoriesStart
  | FetchCategoriesSuccess
  | FethcCategoriesFailed;

export type FetchCategoriesStart =
  Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>;

export type FetchCategoriesSuccess = ActionWithPayload<
  CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
  Category[]
>;

export type FethcCategoriesFailed = ActionWithPayload<
  CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
  Error
>;

export const fetchCategoriesStart = (): FetchCategoriesStart =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (
  categoriesArray: Category[]
): FetchCategoriesSuccess =>
  createAction(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    categoriesArray
  );

export const fetchCategoriesFailure = (error: Error) =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);
