import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";
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

interface UserType {
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

export const RegisterUserSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setRegisterUser: (state, action: PayloadAction<Partial<UserData>>) => {
      state.data = { ...state.data, ...action.payload };
    },
  },
});

export function userRegister(dataUser: UserData) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataUser),
          cache: "no-store",
        }
      );

      const result = await response.json();

      dispatch(setRegisterUser(result.data));
    } catch (error: any) {
      toast(error.message);
    }
  };
}

export const { setRegisterUser } = RegisterUserSlice.actions;

export default RegisterUserSlice.reducer;
