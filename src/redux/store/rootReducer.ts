import { combineReducers, ReducersMapObject } from 'redux';
import { userReducer } from "@redux/slices/userSlice";
import { RootState } from "@models/dataModel";
import { appReducer } from "@redux/slices/appSlice";
import { loadingReducer } from "@redux/slices/loadingSlice";
import { apiReducer } from "@services/dataService";

const reducerMap: ReducersMapObject<RootState> = {
  app: appReducer,
  loading: loadingReducer,
  user: userReducer,
  ...apiReducer
};
export const rootReducer = combineReducers(reducerMap);
