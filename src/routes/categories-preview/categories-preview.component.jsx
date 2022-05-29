import { Fragment } from "react";
import { useSelector } from "react-redux";

import Spinner from "../../components/spinner/spinner.component";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import {
  selectCategoriesisLoading,
  selectCategoriesMap,
} from "../../store/categories/category.selector";

const CategoriesPreview = () => {
  const isLoading = useSelector(selectCategoriesisLoading);
  const categoriesMap = useSelector(selectCategoriesMap);

  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title];
          return (
            <CategoryPreview key={title} title={title} products={products} />
          );
        })
      )}
    </Fragment>
  );
};

export default CategoriesPreview;
