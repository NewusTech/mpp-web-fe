import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import Cookies from "js-cookie";

interface PermissionType {
  id: number;
  userinfo_id: number;
  name: string;
  status: number;
  layanan_id: number;
  layanan_name: string;
  layanan_image: string;
  instansi_id: number;
  instansi_name: string;
  instansi_image: string;
}

interface HistoryPermissiontype {
  data: PermissionType[];
}

const initialState: HistoryPermissiontype = {
  data: [],
};

export const HistoryPermohonanSlice = createSlice({
  name: "riwayatPermohonan",
  initialState,
  reducers: {
    setHistoryPermohonan: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setHistoryPermohonan } = HistoryPermohonanSlice.actions;

export function fetchRiwayatPermohonan() {
  return async (dispatch: any) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/historyform`,
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

      dispatch(setHistoryPermohonan(result.data));
    } catch (error) {
      console.log(error);
    }
  };
}

export default HistoryPermohonanSlice.reducer;
