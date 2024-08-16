import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface DataInput {
  layananform_id: number;
  data: string | number[];
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
      localStorage?.setItem("instanceId", action.payload.toString());
    },
    setDataInput: (state, action: PayloadAction<DataInput[]>) => {
      state.datainput = action.payload;
      localStorage?.setItem("dataInput", JSON.stringify(action.payload));
    },
    updateCheckboxData: (
      state,
      action: PayloadAction<{ layananform_id: number; data: number[] }>
    ) => {
      const { layananform_id, data } = action.payload;
      const index = state.datainput.findIndex(
        (input) => input.layananform_id === layananform_id
      );
      if (index !== -1) {
        const existingData = state.datainput[index].data;
        if (Array.isArray(existingData)) {
          // Update existing checkbox data array
          state.datainput[index].data = data;
        } else {
          // Initialize checkbox data array
          state.datainput[index].data = data;
        }
      } else {
        // Add new data input with checkbox data array
        state.datainput.push({ layananform_id, data });
      }
      localStorage.setItem("dataInput", JSON.stringify(state.datainput));
    },
  },
});

export const { setId, setDataInput, updateCheckboxData } =
  PermohonanSlice.actions;

export default PermohonanSlice.reducer;
