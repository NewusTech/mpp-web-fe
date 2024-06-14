"use client";

import CardHistoryComponent from "@/components/histories/cardHistoryComponent/cardHistoryComponent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchRiwayatPermohonan } from "@/store/action/actionHistoryPermohonan";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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

  useEffect(() => {
    dispatch(fetchRiwayatPermohonan());
  }, [dispatch]);

  console.log(historyData, "==");

  return (
    <div className="flex flex-col justify-center items-center mt-[56px] mx-[35px] h-full">
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
              <CardHistoryComponent
                name="Nomor Antrian"
                date="Tanggal"
                time="Waktu"
                status="Status"
                value="antrian"
                permohonan="Hello"
              />
            </TabsContent>
            <TabsContent className="flex flex-col gap-4" value="permohonan">
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
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
