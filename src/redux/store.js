import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import sagas from './sagas';
import reducers from "./reducers";

const sagaMiddleware= createSagaMiddleware();
const middlewares=[sagaMiddleware]
const ConfigureStore = (initialState) => {
  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(...middlewares)
   
  );
  sagaMiddleware.run(sagas)



  return store;
};

export default ConfigureStore;