"use client";

import doc from "@/../../public/assets/icons/doc.png";
import ppt from "@/../../public/assets/icons/ppt.png";
import xlx from "@/../../public/assets/icons/xls.png";
import pdf from "@/../../public/assets/icons/pdf.png";
import mapLogo from "@/../../public/assets/map-logo.svg";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/grid";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay, Grid } from "swiper/modules";
import Image from "next/legacy/image";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import loginDong from "@/../../public/assets/undraw_back_home_nl-5-c.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Cookies from "js-cookie";
import { LogIn } from "lucide-react";
import wrapText from "@/utils/formatText";
import { formatTime } from "@/utils/formatTime";
import {
  AppIntansiType,
  AppType,
  detailType,
  InformatiDinasType,
  InstansiSopType,
  LayanansType,
  SopDinasType,
} from "@/types/type";
import fetchAppSupport from "@/components/fetching/appSupport/appSupport";
import { truncateTitle } from "@/utils/formatTitle";
import { useMediaQuery } from "@/hooks/useMediaQuery/useMediaQuery";
import CardStandarPelayanan from "@/components/fetching/instansi/cardStandarPelayanan";
import { RichTextDisplay } from "@/components/richTextDisplay/richTextDisplay";
import CardAplikasiTerkaitDinas from "@/components/fetching/instansi/cardAplikasiTerkaitDinas";
import InstansiDetailFetch from "@/components/fetching/instansi/instansiDetail";
import SopDinasFetch from "@/components/fetching/sopDinas/sopDinas";
import {
  formatFileNameAndDesc,
  getFileExtension,
} from "@/helpers/logout/ekstention";
import DinasInfomationFetch from "@/components/fetching/dinasInfomation";
import dynamic from "next/dynamic";
import { formatLongDate } from "@/helpers/logout/formatted";

export default function InstansiDetail({
  params,
}: {
  params: { slug: string };
}) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [apps, setApps] = useState<AppType[]>();
  const [detailins, setDetailIns] = useState<detailType>();
  const [sops, setSops] = useState<SopDinasType>();
  const [info, setInfo] = useState<InformatiDinasType>();
  const [activeTab, setActiveTab] = useState("Persyaratan");
  const [token, setToken] = useState<string | undefined>(undefined);
  const limitData = 1000000;
  const [isSwiperInitialized, setIsSwiperInitialized] = useState(false);
  const [isSwiperInitializedTwo, setIsSwiperInitializedTwo] = useState(false);

  const fetchPendukungApp = async (page: number, limit: number) => {
    try {
      const app = await fetchAppSupport(page, limit);

      setApps(app.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPendukungApp(1, limitData);
  }, []);

  useEffect(() => {
    if (detailins?.Apkinstansis && detailins?.Apkinstansis?.length > 0) {
      setIsSwiperInitialized(true);
    }
  }, [detailins]);

  useEffect(() => {
    if (sops?.Sopinstansis && sops?.Sopinstansis?.length > 0) {
      setIsSwiperInitializedTwo(true);
    }
  }, [sops]);

  const fetchDetail = async (slug: string) => {
    try {
      const result = await InstansiDetailFetch(slug);

      setDetailIns(result?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetail(params.slug);
    setToken(Cookies.get("Authorization"));
  }, [params.slug]);

  const fetchSopInstansi = async (id: number) => {
    try {
      const result = await SopDinasFetch(id);
      const res = await DinasInfomationFetch(id);

      setSops(result?.data);
      setInfo(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (detailins?.id) {
      fetchSopInstansi(detailins?.id);
    }
  }, [detailins?.id]);

  const email = wrapText(detailins?.email || "", 15);

  const buka = formatTime(detailins?.jam_buka || "");
  const tutup = formatTime(detailins?.jam_tutup || "");

  return (
    <div className="bg-primary-100 md:h-full pb-32">
      <div className="flex flex-col bg-neutral-50 rounded-xl md:shadow-md mx-8 md:mx-[70px] md:px-[70px] my-6 md:mt-4 md:my-0 items-center justify-center mb-[29px] md:pb-[30px] md:mb-0 md:pt-4">
        <div className="flex flex-col md:items-center md:flex-row w-full bg-neutral-50 p-4 rounded-xl md:gap-x-10">
          <div className="flex flex-col items-center border border-neutral-700 w-full md:w-10/12 h-full justify-center md:mx-0 bg-neutral-50 shadow-lg rounded-xl">
            {detailins?.image && (
              <div className="flex w-full items-center justify-center min-h-[250px] md:min-h-[450px]">
                <Image
                  src={detailins?.image}
                  className="w-full h-full object-contain"
                  alt={detailins?.name || ""}
                  width={450}
                  height={230}
                />
              </div>
            )}

            <div className="grid grid-rows-1 w-full mt-2 bg-primary-700 place-items-center place-content-center rounded-b-xl py-3 md:py-5 px-3">
              <h6 className="text-[16px] md:text-[20px] text-center text-neutral-50 font-normal">
                {detailins?.name}
              </h6>
            </div>
          </div>

          <div className="md:grid md:grid-rows-7 flex flex-col gap-y-3 md:gap-y-0 mt-8">
            <div className="grid grid-cols-2 items-start md:items-center mb-3">
              <h6 className="text-[12px] md:text-[16px] text-primary-800 font-semibold">
                Alamat
              </h6>

              <p className="text-[12px] md:text-[16px] text-neutral-900 font-normal pl-2">
                {detailins?.alamat || "-"}
              </p>
            </div>

            <div className="grid grid-cols-2 items-center mb-3">
              <h6 className="text-[12px] md:text-[16px] text-primary-800 font-semibold">
                Kontak
              </h6>

              <p className="text-[12px] md:text-[16px] text-neutral-900 font-normal pl-2">
                {detailins?.telp || "-"}
              </p>
            </div>

            <div className="grid grid-cols-2 items-center mb-3">
              <h6 className="text-[12px] md:text-[16px] text-primary-800 font-semibold">
                Email
              </h6>

              <p className="text-[12px] md:text-[16px] text-neutral-900 font-normal pl-2">
                {email || "-"}
              </p>
            </div>

            <div className="grid grid-cols-2 items-center mb-3">
              <h6 className="text-[12px] md:text-[16px] text-primary-800 font-semibold">
                Website
              </h6>

              <p className="text-[12px] md:text-[16px] text-neutral-900 font-normal pl-2">
                {detailins?.website || "-"}
              </p>
            </div>

            <div className="grid grid-cols-2 items-center mb-3">
              <h6 className="text-[12px] md:text-[16px] text-primary-800 font-semibold">
                Lokasi Dinas
              </h6>

              <div className="flex flex-row gap-x-3">
                <div className="h-full flex flex-row items-center justify-center">
                  <Image
                    src={mapLogo}
                    alt="Lokasi Dinas"
                    width={30}
                    height={30}
                    className="w-full h-full"
                  />
                </div>

                {detailins && detailins?.linkmaps && (
                  <Link href={detailins?.linkmaps} target="_blank">
                    <p className="text-[12px] underline md:text-[16px] text-primary-700 font-normal pl-2">
                      Klik disini untuk melihat lokasi
                    </p>
                  </Link>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 items-center mb-3">
              <h6 className="text-[12px] md:text-[16px] text-primary-800 font-semibold">
                Jam Operasional
              </h6>

              <p className="text-[12px] md:text-[16px] text-neutral-900 font-normal pl-2">
                {buka} WIB - {tutup} WIB
              </p>
            </div>

            <div className="grid grid-cols-2 items-center mb-3">
              <h6 className="text-[12px] md:text-[16px] text-primary-800 font-semibold">
                Jumlah Layanan
              </h6>

              <p className="text-[12px] md:text-[16px] text-neutral-900 font-normal pl-2">
                {detailins?.jmlLayanan || "-"}
              </p>
            </div>

            <div className="flex flex-row w-full md:justify-between justify-center items-center gap-x-2 self-center">
              {!token ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="bg-secondary-700 text-[12px] md:text-[16px] px-5 flex items-center justify-center hover:bg-secondary-600 text-neutral-50 w-full h-[40px] rounded-full">
                      Booking Antrian
                    </div>
                  </DialogTrigger>
                  <DialogContent className="flex flex-col bg-neutral-50 rounded-xl items-center w-10/12 md:w-6/12 justify-center p-6">
                    <DialogHeader>
                      <div className="bg-neutral-50 w-full">
                        <Image
                          src={loginDong}
                          alt="Login Dong"
                          width={200}
                          height={200}
                        />

                        <p className="text-[14px] text-neutral-900 font-semibold mt-2">
                          Maaf, Anda tidak mempunyai akses!
                        </p>
                      </div>
                    </DialogHeader>
                    <DialogFooter className="w-full">
                      <div className="flex flex-row w-full gap-2 items-center justify-center mt-4">
                        <LogIn className="text-primary-800 w-[15px] h-[15px]" />

                        <Link href={"/login"} className="text-primary-800">
                          Login
                        </Link>
                      </div>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ) : (
                <>
                  {detailins?.active_offline === true ? (
                    <Button className="w-full flex justify-center font-normal items-center rounded-full bg-secondary-700 hover:bg-secondary-600 text-neutral-50 p-3">
                      <Link href={`/instansi/booking-antrian/${detailins?.id}`}>
                        Booking Antrian
                      </Link>
                    </Button>
                  ) : (
                    <Button
                      disabled
                      className="w-full flex justify-center font-normal items-center rounded-full bg-secondary-700 hover:bg-secondary-600 text-neutral-50 p-3">
                      <Link href={`/instansi/${detailins?.slug}`}>
                        Booking Antrian
                      </Link>
                    </Button>
                  )}
                </>
              )}

              {!token ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="bg-primary-700 px-5 text-center font-normal text-[12px] md:text-[16px] flex items-center justify-center hover:bg-primary-600 text-neutral-50 w-full h-[40px] rounded-full">
                      Permohonan Layanan
                    </div>
                  </DialogTrigger>
                  <DialogContent className="flex flex-col bg-neutral-50 rounded-xl items-center w-10/12 md:w-6/12 justify-center p-6">
                    <DialogHeader>
                      <div className="bg-neutral-50 w-full">
                        <Image
                          src={loginDong}
                          alt="Login Dong"
                          width={200}
                          height={200}
                        />

                        <p className="text-[14px] text-neutral-900 font-semibold mt-2">
                          Maaf, Anda tidak mempunyai akses!
                        </p>
                      </div>
                    </DialogHeader>
                    <DialogFooter className="w-full">
                      <div className="flex flex-row w-full gap-2 items-center justify-center mt-4">
                        <LogIn className="text-primary-800 w-[15px] h-[15px]" />

                        <Link href={"/login"} className="text-primary-800">
                          Login
                        </Link>
                      </div>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ) : (
                <>
                  {detailins?.active_online === true ? (
                    <Link
                      className="w-full h-[40px] flex flex-col justify-center font-normal items-center rounded-full bg-primary-700 hover:bg-primary-600 text-neutral-50 p-3"
                      href={`/instansi/permohonan-layanan/${detailins?.id}`}>
                      <div className="font-normal text-center">
                        Permohonan Layanan
                      </div>
                    </Link>
                  ) : (
                    <Button
                      disabled
                      className="w-full flex justify-center font-normal items-center rounded-full bg-primary-700 hover:bg-primary-600 text-neutral-50 p-3">
                      <Link href={`/instansi/${detailins?.slug}`}>
                        Permohonan Layanan
                      </Link>
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-primary-50 p-4 rounded-xl shadow-lg md:rounded-xl md:shadow-md mx-8 md:mx-[70px] md:px-[70px] my-6 md:mt-[36px] md:my-0 mb-[29px] md:mb-0 md:pt-9">
        <Tabs defaultValue="Aplikasi Dinas" className="pt-6">
          <TabsList className="w-full border border-neutral-400 rounded-full py-6 md:py-8 md:flex md:flex-row justify-between md:justify-start items-center">
            <TabsTrigger
              className="font-semibold rounded-full py-3 md:py-4 px-3 w-full data-[state=active]:bg-primary-700 data-[state=active]:text-neutral-50 text-primary-700 md:text-[20px]"
              value="Aplikasi Dinas">
              <p className="text-[12px] md:text-[18px]">
                Aplikasi Terkait Dinas
              </p>
            </TabsTrigger>
            <TabsTrigger
              className="font-semibold rounded-full py-3 md:py-4 px-4 w-full data-[state=active]:bg-primary-700 data-[state=active]:text-neutral-50 text-primary-700 md:text-[20px]"
              value="Informasi Dinas">
              <p className="text-[12px] md:text-[18px]">Informasi Dinas</p>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="Aplikasi Dinas" className="mt-4 md:mt-8">
            {detailins?.Apkinstansis && detailins?.Apkinstansis?.length <= 6 ? (
              <div className="w-full flex flex-col gap-y-3 md:grid md:grid-cols-3 mt-8 md:gap-x-5 md:pb-3">
                {detailins?.Apkinstansis &&
                  detailins?.Apkinstansis?.map(
                    (app: AppIntansiType, i: number) => {
                      return <CardAplikasiTerkaitDinas key={i} app={app} />;
                    }
                  )}
              </div>
            ) : (
              <>
                {isSwiperInitialized && (
                  <div className="w-full flex flex-row">
                    <Swiper
                      modules={[Grid, Pagination, Navigation, Autoplay]}
                      grid={{ rows: 2, fill: "row" }}
                      className="mySwiper"
                      spaceBetween={10}
                      slidesPerView={2}
                      loop={true}
                      autoplay={{ delay: 3000 }}
                      breakpoints={{
                        768: {
                          slidesPerView: 2,
                          spaceBetween: 5,
                          grid: { rows: 2 },
                        },
                        1024: {
                          slidesPerView: 3,
                          spaceBetween: 10,
                          grid: { rows: 2 },
                        },
                      }}>
                      {detailins?.Apkinstansis &&
                        detailins.Apkinstansis?.map(
                          (app: AppIntansiType, i: number) => {
                            const formatName = truncateTitle(app?.name, 42);
                            const formatDesc = truncateTitle(app?.desc, 30);
                            const formatDescMobile = truncateTitle(
                              app?.desc,
                              40
                            );

                            return (
                              <SwiperSlide key={i}>
                                <Link
                                  href={app?.link}
                                  target="_blank"
                                  className="slide-up-animation bg-neutral-50 min-h-[200px] md:min-h-[100px] w-full flex flex-col md:gap-x-5 md:flex-row items-center p-1 md:p-4 rounded-md shadow-md">
                                  <div className="h-full flex justify-center">
                                    <Image
                                      src={app?.file}
                                      width={100}
                                      height={100}
                                      className="w-full h-full object-cover rounded-full"
                                      alt={app.name}
                                    />
                                  </div>

                                  <div className="flex flex-col text-center md:text-start">
                                    <p className="font-semibold text-primary-700 text-[12px] md:text-[16px] hover:underline">
                                      {formatName}
                                    </p>
                                    <p className="font-normal text-neutral-900 text-[10px] md:text-[14px]">
                                      {isMobile ? formatDescMobile : formatDesc}
                                    </p>
                                  </div>
                                </Link>
                              </SwiperSlide>
                            );
                          }
                        )}
                    </Swiper>
                  </div>
                )}
              </>
            )}
          </TabsContent>

          <TabsContent value="Informasi Dinas" className="mt-8">
            {info && info.Infoinstansi && (
              <div className="flex flex-col w-full items-center justify-center gap-6">
                <div className="w-full md:w-full flex flex-col self-center">
                  <Image
                    src={info?.Infoinstansi?.image}
                    className="w-full h-full object-contain rounded-xl"
                    alt="Berita"
                    width={250}
                    height={250}
                  />
                </div>

                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row">
                      <p className="text-[12px] pr-4 md:text-[14px] text-neutral-900 font-normal">
                        {info && info?.name}
                      </p>

                      <ul>
                        <li className="text-[12px] list-disc md:text-[14px] text-neutral-900 font-normal">
                          {info && formatLongDate(info?.Infoinstansi.createdAt)}
                        </li>
                      </ul>
                    </div>

                    <h6 className="text-[16px] md:text-[26px] text-neutral-900 font-semibold">
                      {info && info?.Infoinstansi?.title}
                    </h6>
                  </div>

                  <div className="flex justify-center items-center w-full">
                    <div className="text-[10px] md:text-[16px] text-justify leading-8 font-normal text-neutral-900">
                      {info && (
                        <RichTextDisplay
                          content={info?.Infoinstansi?.content}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <div className="flex flex-col bg-primary-50 p-4 rounded-xl shadow-lg md:rounded-xl md:shadow-md mx-8 md:mx-[70px] md:px-[70px] my-6 md:mt-[36px] md:my-0 mb-[29px] md:mb-0 md:pt-9">
        <div className="w-full bg-primary-700 border border-neutral-400 rounded-full py-2 md:py-4 md:flex md:flex-row justify-center items-center">
          <h3 className="text-center font-semibold text-[14px] md:text-[18px] text-neutral-50">
            Standart Pelayanan (SOP)
          </h3>
        </div>

        {sops && sops?.Sopinstansis?.length <= 6 ? (
          <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-x-5 gap-y-5 mt-8">
            {sops &&
              sops?.Sopinstansis?.map((item: InstansiSopType, i: number) => {
                return <CardStandarPelayanan key={i} item={item} />;
              })}
          </div>
        ) : (
          <div className="w-full flex flex-row mt-8">
            {isSwiperInitializedTwo && (
              <div className="w-full flex flex-row pb-2">
                <Swiper
                  modules={[Grid, Pagination, Navigation, Autoplay]}
                  className="mySwiper my-1.5"
                  grid={{ rows: 4, fill: "row" }}
                  spaceBetween={10}
                  slidesPerView={4}
                  loop={true}
                  autoplay={{ delay: 3000 }}
                  breakpoints={{
                    768: {
                      slidesPerView: 4,
                      spaceBetween: 5,
                      grid: { rows: 2 },
                    },
                    1024: {
                      slidesPerView: 4,
                      spaceBetween: 10,
                      grid: { rows: 4 },
                    },
                  }}>
                  {sops &&
                    sops?.Sopinstansis?.map(
                      (item: InstansiSopType, i: number) => {
                        const extension = getFileExtension(item?.file);
                        const { name, description, image } =
                          formatFileNameAndDesc(extension);
                        let iconsImage;
                        if (extension === "pdf") {
                          return (iconsImage = (
                            <Link
                              href={item?.file}
                              target="_blank"
                              className="slide-up-animation bg-neutral-50 w-full flex flex-row items-center p-1 md:p-4 gap-x-2 rounded-md shadow-md">
                              <div className="w-1/12 md:w-4/12 flex justify-center">
                                <Image
                                  src={pdf}
                                  width={100}
                                  height={100}
                                  className="w-full h-full object-cover rounded-full"
                                  alt={name}
                                />
                              </div>

                              <div className="flex flex-col text-start">
                                <p className="font-semibold text-primary-700 text-[12px] md:text-[16px] hover:underline">
                                  {item && item?.name}
                                </p>
                                <p className="font-normal text-neutral-900 text-[10px] md:text-[14px]">
                                  {item && item?.desc}
                                </p>
                              </div>
                            </Link>
                          ));
                        } else if (extension === "docx") {
                          return (iconsImage = (
                            <Link
                              href={item?.file}
                              target="_blank"
                              className="slide-up-animation bg-neutral-50 w-full flex flex-row items-center p-1 md:p-4 gap-x-2 rounded-md shadow-md">
                              <div className="w-1/12 md:w-4/12 flex justify-center">
                                <Image
                                  src={doc}
                                  width={100}
                                  height={100}
                                  className="w-full h-full object-cover rounded-full"
                                  alt={name}
                                />
                              </div>

                              <div className="flex flex-col text-start">
                                <p className="font-semibold text-primary-700 text-[12px] md:text-[16px] hover:underline">
                                  {item && item?.name}
                                </p>
                                <p className="font-normal text-neutral-900 text-[10px] md:text-[14px]">
                                  {item && item?.desc}
                                </p>
                              </div>
                            </Link>
                          ));
                        } else if (extension === "ppsx") {
                          return (iconsImage = (
                            <Link
                              href={item?.file}
                              target="_blank"
                              className="slide-up-animation bg-neutral-50 w-full flex flex-row items-center p-1 md:p-4 gap-x-2 rounded-md shadow-md">
                              <div className="w-1/12 md:w-4/12 flex justify-center">
                                <Image
                                  src={ppt}
                                  width={100}
                                  height={100}
                                  className="w-full h-full object-cover rounded-full"
                                  alt={name}
                                />
                              </div>

                              <div className="flex flex-col text-start">
                                <p className="font-semibold text-primary-700 text-[12px] md:text-[16px] hover:underline">
                                  {item && item?.name}
                                </p>
                                <p className="font-normal text-neutral-900 text-[10px] md:text-[14px]">
                                  {item && item?.desc}
                                </p>
                              </div>
                            </Link>
                          ));
                        } else if (extension === "xlsx") {
                          return (iconsImage = (
                            <Link
                              href={item?.file}
                              target="_blank"
                              className="slide-up-animation bg-neutral-50 w-full flex flex-row items-center p-1 md:p-4 gap-x-2 rounded-md shadow-md">
                              <div className="w-1/12 md:w-4/12 flex justify-center">
                                <Image
                                  src={xlx}
                                  width={100}
                                  height={100}
                                  className="w-full h-full object-cover rounded-full"
                                  alt={name}
                                />
                              </div>

                              <div className="flex flex-col text-start">
                                <p className="font-semibold text-primary-700 text-[12px] md:text-[16px] hover:underline">
                                  {item && item?.name}
                                </p>
                                <p className="font-normal text-neutral-900 text-[10px] md:text-[14px]">
                                  {item && item?.desc}
                                </p>
                              </div>
                            </Link>
                          ));
                        }

                        return <SwiperSlide key={i}>{iconsImage}</SwiperSlide>;
                      }
                    )}
                </Swiper>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col bg-primary-50 p-4 rounded-xl shadow-lg md:rounded-xl md:shadow-md mx-8 md:mx-[70px] md:px-[70px] my-6 md:mt-[36px] md:my-0 mb-[29px] md:pb-[30px] md:mb-0 md:pt-9">
        <h5 className="text-[14px] md:text-[20px] text-primary-800 font-semibold mb-8">
          Informasi Layanan
        </h5>

        <Accordion type="single" collapsible>
          {detailins?.Layanans &&
            detailins?.Layanans?.map((item: LayanansType, i: number) => {
              return (
                <AccordionItem
                  key={i}
                  className="w-full h-full mb-2"
                  value={`item-${i}`}>
                  <AccordionTrigger className="text-[12px] hover:underline">
                    {item.name}
                  </AccordionTrigger>
                  <AccordionContent className="md:text-start text-justify w-full h-full md:px-[70px]">
                    <div className="grid grid-cols-3 w-full md:w-6/12 p-2 items-center justify-between border border-neutral-700 bg-neutral-50 rounded-full">
                      <button
                        className={`p-1 md:p-2 ${
                          activeTab === "Persyaratan"
                            ? "bg-primary-700 text-neutral-50 text-[12px] rounded-full w-full"
                            : "text-neutral-900 text-[12px]"
                        }`}
                        onClick={() => setActiveTab("Persyaratan")}>
                        Persyaratan
                      </button>

                      <button
                        className={`p-1 md:p-2 ${
                          activeTab === "Dasar Hukum"
                            ? "bg-primary-700 text-neutral-50 text-[12px] rounded-full w-full"
                            : "text-neutral-900 text-[12px]"
                        }`}
                        onClick={() => setActiveTab("Dasar Hukum")}>
                        Dasar Hukum
                      </button>

                      <button
                        className={`p-1 md:p-2 ${
                          activeTab === "Pelayanan"
                            ? "bg-primary-700 text-neutral-50 text-[12px] rounded-full w-full"
                            : "text-neutral-900 text-[12px]"
                        }`}
                        onClick={() => setActiveTab("Pelayanan")}>
                        Pelayanan
                      </button>
                    </div>

                    <div className="mt-6">
                      {activeTab === "Persyaratan" && (
                        <div>
                          <h5 className="text-neutral-900 font-semibold text-[14px] md:text-[20px] mb-2 md:mb-6">
                            Persyaratan
                          </h5>

                          <div>
                            <div className="text-neutral-900 font-normal text-[12px] md:text-[16px]">
                              {item?.syarat && (
                                <RichTextDisplay content={item?.syarat} />
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === "Dasar Hukum" && (
                        <div>
                          <h5 className="text-neutral-900 font-semibold text-[14px] md:text-[20px] mb-2 md:mb-6">
                            Dasar Hukum
                          </h5>

                          <div>
                            <div className="text-neutral-900 font-normal text-[12px] md:text-[16px] ml-2">
                              {item?.dasarhukum && (
                                <RichTextDisplay content={item?.dasarhukum} />
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === "Pelayanan" && (
                        <div>
                          <h5 className="text-neutral-900 font-semibold text-[14px] md:text-[20px] mb-2 md:mb-6">
                            Pelayanan
                          </h5>

                          <div className="flex flex-row justify-start">
                            <div className="text-neutral-900 font-normal text-[12px] md:text-[16px] ml-2">
                              {item?.desc && (
                                <RichTextDisplay content={item?.desc} />
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
        </Accordion>
      </div>
    </div>
  );
}
