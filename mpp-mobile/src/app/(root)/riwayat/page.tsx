"use client";

import CardHistoryComponent from "@/components/histories/cardHistoryComponent/cardHistoryComponent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchRiwayatPermohonan } from "@/store/action/actionHistoryPermohonan";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import Image from "next/image";
import sad from "@/../../public/assets/undraw_feeling_blue_-4-b7q.svg";

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

export default function RiwayatPage() {
  const dispatch = useDispatch<AppDispatch>();
  const historyData = useSelector(
    (state: RootState) => state.historyPermohonan.data
  );

  const token = Cookies.get("Authorization");

  useEffect(() => {
    if (!token) {
      redirect("/login");
    }
    dispatch(fetchRiwayatPermohonan());
  }, [dispatch]);

  console.log(historyData, "==");

  return (
    <div className="flex flex-col justify-center mt-[56px] mx-[35px]">
      <div className="flex self-start">
        <h5 className="text-[20px] font-semibold text-primary-800">History</h5>
      </div>

      <div className="flex flex-row w-full gap-[12px]">
        <Tabs
          defaultValue="antrian"
          className="flex flex-col w-full gap-[10px]">
          <div className="flex mt-[26px]">
            <TabsList className="grid grid-cols-2 w-full gap-[10px]">
              <TabsTrigger value="antrian">Antrian</TabsTrigger>
              <TabsTrigger value="permohonan">Permohonan</TabsTrigger>
            </TabsList>
          </div>

          <div>
            <TabsContent value="antrian">
              {historyData && historyData.length > 0 ? (
                <>
                  {historyData?.map((histori: PermissionType, i: number) => {
                    return (
                      <div key={i}>
                        <CardHistoryComponent
                          name="Nomor Antrian"
                          date="Tanggal"
                          time="Waktu"
                          status="Status"
                          value="antrian"
                          permohonan="Hello"
                        />
                      </div>
                    );
                  })}
                </>
              ) : (
                <div className="flex flex-col justify-center items-center h-[311px]">
                  <Image src={sad} width={100} height={100} alt="sad" />

                  <p className="text-center text-neutral-900 text-[12px] font-thin mt-4">
                    Data tidak ditemukan!
                  </p>
                </div>
              )}
            </TabsContent>
            <TabsContent className="flex flex-col gap-4" value="permohonan">
              {historyData && historyData.length > 0 ? (
                <>
                  {historyData?.map((histori: PermissionType, i: number) => {
                    return (
                      <div key={i}>
                        <CardHistoryComponent
                          name="Nomor Permohonan"
                          date="Tanggal"
                          time="Waktu"
                          status="Status"
                          value="permohonan"
                          permohonan={histori}
                        />
                      </div>
                    );
                  })}
                </>
              ) : (
                <div className="flex flex-col justify-center items-center h-[311px]">
                  <Image src={sad} width={100} height={100} alt="sad" />

                  <p className="text-center text-neutral-900 text-[12px] font-thin mt-4">
                    Data tidak ditemukan!
                  </p>
                </div>
              )}
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
