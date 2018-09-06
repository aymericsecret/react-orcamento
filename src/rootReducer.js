import { combineReducers } from 'redux';
import app from './scenes/Quotation/reducer';
import session from './scenes/Login/components/reducer';
import quotation from './scenes/Quotation/components/QuoteSystem/reducer';
import categoryList from './scenes/Quotation/components/ProductSyst/components/CategoryList/reducer';
import quoteRequest from './scenes/Quotation/components/QuoteRequest/reducer';
import search from './scenes/Quotation/components/ProductSearch/reducer';

const rootReducer = combineReducers({
  app,
  session,
  search,
  categoryList,
  quotation,
  quoteRequest,
});

export default rootReducer;
