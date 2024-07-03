import { UpdateUserType } from "@/types/type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { toast } from "sonner";

interface UserData {
  id?: number;
  name?: string;
  nik?: string;
  telepon?: string;
  email?: string;
  keamatan_id?: string;
  desa_id?: string;
  rt?: string;
  rw?: string;
  alamat?: string;
}

const initialState = {
  data: {
    name: "",
    nik: "",
    telepon: "",
    email: "",
    kecamatan_id: "",
    desa_id: "",
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

export function updateProfileUser(profileUser: UpdateUserType, slug: string) {
  return async (dispatch: any) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/userinfo/update/${slug}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Cookies.get("Authorization")}`,
          },
          body: JSON.stringify(profileUser),
          cache: "no-store",
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
