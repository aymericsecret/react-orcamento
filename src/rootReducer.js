import { combineReducers } from 'redux';
import products from './scenes/Quotation/components/ProductList/reducer';
import quotation from './scenes/Quotation/components/QuoteSystem/reducer';

const rootReducer = combineReducers({
  quotation,
  products,
});

export default rootReducer;
