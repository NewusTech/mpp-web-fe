import Image from "next/image";
import Link from "next/link";
import { Raleway } from "next/font/google";
import logo from "@/../public/assets/DesignLogoMpp.svg";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell } from "lucide-react";
import MobileNotifikasi from "../notifikasi/mobileNotifikasi";
import Cookies from "js-cookie";
import fetchNotifications from "@/components/fetching/notifications/notifications";
import { NotificationsType } from "@/types/type";
import { io, Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const auth = Cookies.get("Authorization");

interface JwtPayload {
  userId: string;
}

export default function NavbarMobile() {
  let socket: Socket;
  const auth = Cookies.get("Authorization");
  const [notifications, setNotifications] = useState<NotificationsType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [decoded, setDecoded] = useState<JwtPayload | null>(null);

  useEffect(() => {
    const auth = Cookies.get("Authorization");

    let socket: Socket | null = null;

    if (auth) {
      try {
        const decodedToken = jwtDecode<JwtPayload>(auth);

        socket = io(`${process.env.NEXT_PUBLIC_API_URL_MPP_GOOGLE}`);

        // Dengarkan event dari server
        socket.on("UpdateStatus", (pesansocket: any) => {
          if (pesansocket.iduser == decodedToken?.userId) {
            fetchNotifications(currentPage);
          }
        });

        setDecoded(decodedToken);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }

    // Cleanup ketika komponen di-unmount
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  const fetchNotifications = async (page: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_MPP}/notifications?page=${page}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("Authorization")}`,
          },
        }
      );
      const data = await response.json();
      setNotifications(data?.data);
      setTotalPages(Math.ceil(data?.pagination?.totalCount / 10));
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications(currentPage);
  }, [currentPage]);

  return (
    <div className="w-full flex flex-row">
      <Link
        href="/"
        className="flex justify-center self-center w-full py-4 gap-x-4 bg-primary-100 flex-row md:hidden">
        <div className="w-2/12">
          <Image
            src={logo}
            alt="Lampung Timur"
            className="w-full h-full object-cover"
            width={100}
            height={100}
          />
        </div>

        <div className="flex flex-col self-center justify-center w-6/12 h-full leading-none">
          <h3
            className={`${raleway.className} font-bold text-[14px] text-secondary-700 py-[4px]`}>
            MAL PELAYANAN PUBLIK
          </h3>

          <h3
            className={`${raleway.className} font-normal text-primary-700 text-[12px]`}>
            Kabupaten Lampung Timur
          </h3>
        </div>
      </Link>

      {auth && (
        <div className="flex flex-row bg-primary-100 justify-center pr-5">
          <Popover>
            <PopoverTrigger>
              <div className="relative">
                <Bell className="w-6 h-6 text-primary-800 hover:text-secondary-700" />
                {notifications?.some(
                  (notification) => notification.isopen === 0
                ) && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center w-2 h-2 p-1.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full"></span>
                )}
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-full max-w-[270px] bg-primary-100 border border-primary-900 shadow-lg rounded-lg max-h-[550px] overflow-y-scroll mr-3">
              <div className="w-full flex flex-col gap-y-3">
                <div className="w-full border-b border-neutral-900">
                  <h3 className="text-neutral-900 font-semibold text-[20px]">
                    Notifikasi
                  </h3>
                </div>

                <div className="w-full flex flex-col overflow-y-auto gap-y-3 verticalScroll max-h-screen">
                  {notifications?.map((notification, i) => (
                    <MobileNotifikasi key={i} notification={notification} />
                  ))}
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-between mt-4 px-2">
                  <button
                    className="px-4 py-2 bg-primary-700 text-white rounded disabled:opacity-50"
                    onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
                    disabled={currentPage <= 1}>
                    Previous
                  </button>
                  {/* <span className="self-center text-neutral-900">
                      Page {currentPage} of {totalPages}
                    </span> */}
                  <button
                    className="px-4 py-2 bg-primary-700 text-white rounded disabled:opacity-50"
                    onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                    disabled={currentPage >= totalPages}>
                    Next
                  </button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
}
