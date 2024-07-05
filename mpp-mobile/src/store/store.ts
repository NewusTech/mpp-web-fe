import { configureStore } from "@reduxjs/toolkit";
import surveySlice from "./action/actionSurvei";
import PermohonanSlice from "./action/actionPermohonanLayanan";
import UpdateProfileSlice from "./action/actionUpdateProfile";
import HistoryPermohonanSlice from "./action/actionHistoryPermohonan";
import HistoryAntrianSlice from "./action/actionHistoryAntrian";

export const store = configureStore({
  reducer: {
    survey: surveySlice,
    permohonan: PermohonanSlice,
    updateProfile: UpdateProfileSlice,
    historyPermohonan: HistoryPermohonanSlice,
    historyAntrian: HistoryAntrianSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
