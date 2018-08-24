import { combineReducers } from 'redux';
import app from './scenes/Quotation/reducer';
import session from './scenes/Login/components/reducer';
import quotation from './scenes/Quotation/components/QuoteSystem/reducer';
import categoryList from './scenes/Quotation/components/ProductSyst/components/CategoryList/reducer';

const rootReducer = combineReducers({
  app,
  session,
  categoryList,
  quotation,
});

export default rootReducer;
