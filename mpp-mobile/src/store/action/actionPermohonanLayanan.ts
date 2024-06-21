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
      localStorage.setItem("instanceId", action.payload.toString());
    },
    setDataInput: (state, action: PayloadAction<DataInput[]>) => {
      state.datainput = action.payload;
    },
    setInputFile: (state, action: PayloadAction<DataFileInput[]>) => {
      state.datafile = action.payload;
    },
  },
});

export const { setId, setDataInput, setInputFile } = PermohonanSlice.actions;

export default PermohonanSlice.reducer;
