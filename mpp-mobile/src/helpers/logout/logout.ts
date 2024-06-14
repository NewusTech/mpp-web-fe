"use server";
import { cookies } from "next/headers";

export default async function isLogout() {
  cookies().delete("Authorization");
}
