import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface PermissionType {
  id: number;
  code: number;
  instansi_id: number;
  layanan_id: number;
  userinfo_id: number;
  status: boolean;
  qrcode: string;
  audio: string;
  tanggal: string;
  waktu: string;
  Instansi: {
    name: string;
  };
}

interface HistoryPermissiontype {
  data: PermissionType[];
}

const initialState: HistoryPermissiontype = {
  data: [],
};

export const HistoryAntrianSlice = createSlice({
  name: "riwayatPermohonan",
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
        `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/bookingantrian/getforuser`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("Authorization")}`,
          },
          cache: "no-store",
        }
      );

      const result = await response.json();

      dispatch(setHistoryAntrian(result.data));
    } catch (error) {
      console.log(error);
    }
  };
}

export default HistoryAntrianSlice.reducer;
