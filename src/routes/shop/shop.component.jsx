import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {getCategoriesAndDocuments} from '../../utils/firebase/firebase.utils'
import { setCategoriesMap } from '../../store/categories/category.action'

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

const Shop = () => {
const dispatch = useDispatch()

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesArray = await getCategoriesAndDocuments('categories');
      
      dispatch(setCategoriesMap(categoriesArray));
    };

    getCategoriesMap();
  }, [dispatch]);
  return (
    
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  );
};

export default Shop;
