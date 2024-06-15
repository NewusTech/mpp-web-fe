import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SurveyState {
  dinasId: number;
  layananId: number;
  tanggal: string;
}

interface DataInputSurvey {
  surveyform_id: number;
  nilai: string;
}

const initialState = {
  dinasId: 1,
  layananId: 1,
  tanggal: "",
  datainput: [] as DataInputSurvey[],
};

export const surveySlice = createSlice({
  name: "survey",
  initialState,
  reducers: {
    setDinasId: (state, action: PayloadAction<number>) => {
      state.dinasId = action.payload;
    },
    setLayananId: (state, action: PayloadAction<number>) => {
      state.layananId = action.payload;
    },
    setTanggal: (state, action: PayloadAction<string>) => {
      state.tanggal = action.payload;
    },
    setDataSurvei: (state, action: PayloadAction<DataInputSurvey[]>) => {
      state.datainput = action.payload;
    },
  },
});

export const { setDinasId, setLayananId, setTanggal, setDataSurvei } =
  surveySlice.actions;

export default surveySlice.reducer;
