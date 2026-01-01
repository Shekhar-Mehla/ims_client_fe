import { configureStore, combineReducers } from "@reduxjs/toolkit";
import internshipReducer from "../features/internship/internshipslice.js";
import userReducer from "../features/user/userslice.js";
import applicationReducer from "../features/application/applicationslice.js";
import notificationReducer from "../features/notification/notificationslice.js";

const rootReducer = combineReducers({
  internshipInfo: internshipReducer,
  userInfo: userReducer,
  applicationInfo: applicationReducer,
  notificationInfo: notificationReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export default store;
