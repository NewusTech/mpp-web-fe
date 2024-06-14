import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface DataInput {
  layananform_id: number;
  data: string;
}

export interface DataFileInput {
  layananform_id: number;
  data: File[];
}

const initialState = {
  id: 0,
  datainput: [] as DataInput[],
  datafile: [] as { layananform_id: number; data: File[] }[],
};

export const PermohonanSlice = createSlice({
  name: "permohonan",
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
      // localStorage.setItem("id", action.payload.toString());
    },
    setDataInput: (state, action: PayloadAction<DataInput[]>) => {
      state.datainput = action.payload;
      // localStorage.setItem("datainput", action.payload.toString());
    },
    setInputFile: (state, action: PayloadAction<DataFileInput[]>) => {
      state.datafile = action.payload;
      // localStorage.setItem("datafile", action.payload.toString());
    },
  },
});

export const { setId, setDataInput, setInputFile } = PermohonanSlice.actions;

export default PermohonanSlice.reducer;
