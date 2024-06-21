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
      localStorage.setItem("dinasId", action.payload.toString());
    },
    setLayananId: (state, action: PayloadAction<number>) => {
      state.layananId = action.payload;
      localStorage.setItem("layananId", action.payload.toString());
    },
    setTanggal: (state, action: PayloadAction<string>) => {
      state.tanggal = action.payload;
      localStorage.setItem("dataTanggal", action.payload);
    },
    setDataSurvei: (state, action: PayloadAction<DataInputSurvey[]>) => {
      state.datainput = action.payload;
      localStorage.setItem("dataSurvei", JSON.stringify(action.payload));
    },
  },
});

export const { setDinasId, setLayananId, setTanggal, setDataSurvei } =
  surveySlice.actions;

export default surveySlice.reducer;
