import { combineReducers } from "redux";
import SearchReducer from "./search";
import ModalReducer from "./modalPhoto";
const allReducers = combineReducers({
  search: SearchReducer,
  modal: ModalReducer,
});

export default allReducers;
