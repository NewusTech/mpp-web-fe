import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface DataInput {
  layananform_id: number;
  data: string;
}

const initialState = {
  id: 0,
  datainput: [] as DataInput[],
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
      localStorage.setItem("dataInput", JSON.stringify(action.payload));
    },
  },
});

export const { setId, setDataInput } = PermohonanSlice.actions;

export default PermohonanSlice.reducer;
