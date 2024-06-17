import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import Cookies from "js-cookie";

const initialState = {
  data: [],
};

export const HistoryAntrianSlice = createSlice({
  name: "riwayatAntrian",
  initialState,
  reducers: {
    setHistoryAntrian: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setHistoryAntrian } = HistoryAntrianSlice.actions;

export function fetchRiwayatAntrian() {
  return async (dispatch: any) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/antrian`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("Authorization")}`,
          },
          cache: "no-store",
        }
      );
    } catch {
      toast("Tidak berhasil mendapatkan riwayat antrian!");
    }
  };
}

export default HistoryAntrianSlice.reducer;
