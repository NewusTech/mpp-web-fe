import { configureStore } from "@reduxjs/toolkit";
import surveySlice from "./action/actionSurvei";
import PermohonanSlice from "./action/actionPermohonanLayanan";
import UpdateProfileSlice from "./action/actionUpdateProfile";
import HistoryPermohonanSlice from "./action/actionHistoryPermohonan";
import defaultMiddlewares from "./middlewares/defaultMiddlewares";

export const store = configureStore({
  reducer: {
    survey: surveySlice,
    permohonan: PermohonanSlice,
    updateProfile: UpdateProfileSlice,
    historyPermohonan: HistoryPermohonanSlice,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(defaultMiddlewares),
});

// const savedSurveyState = localStorage.getItem("surveyState");
// if (savedSurveyState) {
//   const parsedState = JSON.parse(savedSurveyState);
//   store.dispatch({
//     type: "survey/setInitialState",
//     payload: parsedState,
//   });
// }

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
