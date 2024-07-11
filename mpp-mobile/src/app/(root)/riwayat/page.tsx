"use client";

import CardHistoryComponent from "@/components/histories/cardHistoryComponent/cardHistoryComponent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchRiwayatPermohonan } from "@/store/action/actionHistoryPermohonan";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import Image from "next/legacy/image";
import sad from "@/../../public/assets/undraw_feeling_blue_-4-b7q.svg";
import TablePermohonanComponent from "@/components/histories/others/tablePermohonanComponent/tablePermohonanComponent";
import TableAntrianComponent from "@/components/histories/others/tableAntrianComponent/tableAntrianComponent";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CardHistoryAntrian from "@/components/histories/cardHistoryAntrian/cardHistoryAntrian";
import PaginationComponent from "@/components/pagination/paginationComponent";
import { AntrianDataType, PermohonanDataType } from "@/types/type";
import { fetchRiwayatAntrian } from "@/store/action/actionHistoryAntrian";

export default function RiwayatPage() {
  const dispatch = useDispatch<AppDispatch>();
  const historyData = useSelector(
    (state: RootState) => state.historyPermohonan.data
  );
  const historyAntrianData = useSelector(
    (state: RootState) => state.historyAntrian.data
  );
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [antrianPage, setAntrianPage] = useState<number>(1);
  const [permohonanPage, setPermohonanPage] = useState<number>(1);
  const itemsPerPage = 10;
  const token = Cookies.get("Authorization");

  useEffect(() => {
    if (!token) {
      redirect("/login");
    }
    dispatch(fetchRiwayatPermohonan());
    dispatch(fetchRiwayatAntrian());

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 678);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch, token]);

  const paginate = (items: any[], pageNumber: number, itemsPerPage: number) => {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  const currentAntrians = paginate(
    historyAntrianData || [],
    antrianPage,
    itemsPerPage
  );
  const currentPermohonans = paginate(
    historyData || [],
    permohonanPage,
    itemsPerPage
  );

  return (
    <section className="flex flex-col justify-center bg-primary-100 pt-4 md:mt-3 md:mb-0 pb-32 md:pb-[120px] mx-[35px] md:mx-0 md:px-[167px]">
      <div className="flex self-start md:mb-9">
        <h5 className="text-[20px] md:text-[26px] font-semibold text-primary-800">
          History
        </h5>
      </div>

      <div className="flex flex-row w-full gap-[12px] md:px-[38px] md:bg-primary-50 md:pb-[50px] md:rounded-2xl md:shadow-md">
        <Tabs
          defaultValue="antrian"
          className="flex flex-col w-full gap-[10px]">
          {isDesktop ? (
            <div className="md:flex md:w-full md:mt-[26px]">
              <TabsList className="md:flex md:justify-start md:items-start md:gap-10">
                <TabsTrigger value="antrian">Antrian</TabsTrigger>
                <TabsTrigger value="permohonan">Permohonan</TabsTrigger>
              </TabsList>
            </div>
          ) : (
            <div className="flex mt-[26px]">
              <TabsList className="grid grid-cols-2 w-full gap-[10px]">
                <TabsTrigger value="antrian">Antrian</TabsTrigger>
                <TabsTrigger value="permohonan">Permohonan</TabsTrigger>
              </TabsList>
            </div>
          )}

          <div>
            {isDesktop ? (
              <>
                <TabsContent value="antrian">
                  {currentAntrians && currentAntrians.length > 0 ? (
                    <>
                      <Table className="md:flex md:flex-col md:w-full md:pb-6 md:pt-4">
                        <TableHeader className="md:flex md:w-full">
                          <TableRow className="md:flex md:flex-row md:w-full">
                            <TableHead className="w-1/2">
                              Nomor Antrian
                            </TableHead>
                            <TableHead className="w-full">Instansi</TableHead>
                            <TableHead className="w-1/2">Waktu</TableHead>
                            <TableHead className="w-1/2">Tanggal</TableHead>
                            <TableHead className="w-3/12">Aksi</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {currentAntrians?.map(
                            (antrian: AntrianDataType, i: number) => {
                              return (
                                <TableAntrianComponent
                                  key={i}
                                  antrian={antrian}
                                />
                              );
                            }
                          )}
                        </TableBody>
                      </Table>

                      <PaginationComponent
                        totalItems={historyAntrianData.length}
                        itemsPerPage={itemsPerPage}
                        currentPage={antrianPage}
                        onPageChange={setAntrianPage}
                      />
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

                <TabsContent value="permohonan">
                  {currentPermohonans && currentPermohonans.length > 0 ? (
                    <>
                      <Table className="md:flex md:flex-col md:w-full md:pb-6 md:pt-4">
                        <TableHeader className="md:flex md:w-full">
                          <TableRow className="md:flex md:flex-row md:w-full">
                            <TableHead className="w-1/2">
                              Nomor Permohonan
                            </TableHead>
                            <TableHead className="w-full">Instansi</TableHead>
                            <TableHead className="w-1/2">Tanggal</TableHead>
                            <TableHead className="w-1/2">Status</TableHead>
                            <TableHead className="w-3/12">Aksi</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {currentPermohonans?.map(
                            (permohonan: PermohonanDataType, i: number) => {
                              return (
                                <TablePermohonanComponent
                                  key={i}
                                  permohonan={permohonan}
                                />
                              );
                            }
                          )}
                        </TableBody>
                      </Table>

                      <PaginationComponent
                        totalItems={historyData.length}
                        itemsPerPage={itemsPerPage}
                        currentPage={permohonanPage}
                        onPageChange={setPermohonanPage}
                      />
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
              </>
            ) : (
              <>
                <TabsContent value="antrian">
                  {currentAntrians && currentAntrians.length > 0 ? (
                    <>
                      {currentAntrians?.map(
                        (antrian: AntrianDataType, i: number) => {
                          return (
                            <div key={i}>
                              <CardHistoryAntrian antrian={antrian} />
                            </div>
                          );
                        }
                      )}
                    </>
                  ) : (
                    <div className="flex flex-col justify-center items-center h-[311px]">
                      <Image src={sad} width={100} height={100} alt="sad" />
                      <p className="text-center text-neutral-900 text-[12px] font-thin mt-4">
                        Data tidak ditemukan!
                      </p>
                    </div>
                  )}
                  <PaginationComponent
                    totalItems={historyAntrianData.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={antrianPage}
                    onPageChange={setAntrianPage}
                  />
                </TabsContent>

                <TabsContent className="flex flex-col gap-4" value="permohonan">
                  {currentPermohonans && currentPermohonans.length > 0 ? (
                    <>
                      {currentPermohonans?.map(
                        (permohonan: PermohonanDataType, i: number) => {
                          return (
                            <div key={i}>
                              <CardHistoryComponent permohonan={permohonan} />
                            </div>
                          );
                        }
                      )}
                    </>
                  ) : (
                    <div className="flex flex-col justify-center items-center h-[311px]">
                      <Image src={sad} width={100} height={100} alt="sad" />
                      <p className="text-center text-neutral-900 text-[12px] font-thin mt-4">
                        Data tidak ditemukan!
                      </p>
                    </div>
                  )}
                  <PaginationComponent
                    totalItems={historyData.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={permohonanPage}
                    onPageChange={setPermohonanPage}
                  />
                </TabsContent>
              </>
            )}
          </div>
        </Tabs>
      </div>
    </section>
  );
}
