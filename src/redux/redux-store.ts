import {
  Action,
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from "redux";
import authReducer from "./auth-reducer.ts";
import dialogsReducer from "./dialogs-reducer.ts";
import profileReducer from "./profile-reducer.ts";
import sidebarReducer from "./sidebar-reducer.ts";
import usersReducer from "./users-reducer.ts";
import thunkMiddleware, { ThunkAction } from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import appReducer from "./app-reducer.ts";
import chatReducer from "./chat-reducer.ts";

let rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
  chat: chatReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;
let state: AppStateType;

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type InferActionsTypes<
  T extends { [key: string]: (...args: any[]) => any }
> = ReturnType<PropertiesTypes<T>>;

export type BaseThunkType<
  A extends Action = Action,
  R = Promise<void>
> = ThunkAction<R, AppStateType, unknown, A>;
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);
// @ts-ignore
window.__store__ = store;

export default store;
