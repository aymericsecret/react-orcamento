import { combineReducers } from 'redux';
import products from './scenes/Quotation/components/ProductSyst/components/ProductList/reducer';
import quotation from './scenes/Quotation/components/QuoteSystem/reducer';
import categoryList from './scenes/Quotation/components/ProductSyst/components/CategoryList/reducer';

const rootReducer = combineReducers({
  quotation,
  products,
  categoryList,
});

export default rootReducer;
