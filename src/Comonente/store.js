import userDetails from "./Reduser";
import { createStore } from "redux";

const store = createStore(userDetails, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;