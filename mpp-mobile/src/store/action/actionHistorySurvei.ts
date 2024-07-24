import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface PermissionType {
  id: number;
  code: number;
  instansi_id: number;
  layanan_id: number;
  userinfo_id: number;
  status: boolean;
  tanggal: string;
  waktu: string;
  Instansi: {
    name: string;
  };
  Layanan: {
    name: string;
  };
  createdAt: string;
}

interface HistorySurveiType {
  data: PermissionType[];
}

const initialState: HistorySurveiType = {
  data: [],
};

export const HistorySurveiSlice = createSlice({
  name: "riwayatSurvei",
  initialState,
  reducers: {
    setHistorySurvei: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setHistorySurvei } = HistorySurveiSlice.actions;

export function fetchRiwayatSurvei(
  search?: string,
  start_date?: string,
  end_date?: string
) {
  return async (dispatch: any) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/userhistorysurvey?search=${search}&start_date=${start_date}&end_date=${end_date}`,
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

      dispatch(setHistorySurvei(result.data));
    } catch (error) {
      console.log(error);
    }
  };
}

export default HistorySurveiSlice.reducer;
