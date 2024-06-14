import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { toast } from "sonner";

interface UserData {
  name: string;
  nik: string;
  telepon: string;
  email?: string;
  kec?: string;
  desa?: string;
  rt?: string;
  rw?: string;
  alamat: string;
}

interface UpdateProfileState {
  data: UserData;
}

const initialState = {
  data: {
    name: "",
    nik: "",
    telepon: "",
    email: "",
    kec: "",
    desa: "",
    rt: "",
    rw: "",
    alamat: "",
  },
};

export const UpdateProfileSlice = createSlice({
  name: "updateProfile",
  initialState,
  reducers: {
    setUpdateProfile: (state, action: PayloadAction<Partial<UserData>>) => {
      state.data = { ...state.data, ...action.payload };
    },
  },
});

export function updateProfileUser(profileUser: UserData, id: number) {
  return async (dispatch: any) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/userinfo/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("Authorization")}`,
          },
          body: JSON.stringify(profileUser),
        }
      );

      const result = await response.json();

      dispatch(setUpdateProfile(result.data));
    } catch (error) {
      toast("Tidak berhasil mengupdate profile!");
    }
  };
}

export const { setUpdateProfile } = UpdateProfileSlice.actions;

export default UpdateProfileSlice.reducer;
