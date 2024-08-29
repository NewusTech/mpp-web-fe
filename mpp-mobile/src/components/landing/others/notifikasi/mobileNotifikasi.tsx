import React from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { NotificationsType } from "@/types/type";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };

  return date.toLocaleDateString('id-ID', options);
};

interface NotifikasiWebisteProps {
  notification: NotificationsType;
}

export default function MobileNotifikasi({ notification }: NotifikasiWebisteProps) {

  const handleClick = async (id: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_MPP}/notifications`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("Authorization")}`,
          },
          body: JSON.stringify({
            id: id,
            isopen: 1,
          }),
        }
      );

    } catch (error) {
      console.error("Failed to update isopen:", error);
      // Jika terjadi error, tetap redirect ke URL
    }
  };

  return (
    <div className={`w-full flex flex-col gap-y-2 border border-neutral-900 p-2 rounded-lg  ${notification.isopen === 0 ? 'bg-blue-200' : 'bg-white'} `}>
      <Link href={notification?.url}
        onClick={() =>
          handleClick(notification?.id)
        }>
        <div className="w-full flex flex-row justify-between">
          <h5 className="text-neutral-900 font-semibold text-[14px]">
            {notification?.title}
          </h5>

          <p className="text-neutral-900 text-opacity-90 font-normal text-[13px]">
            {formatDate(notification?.date)}
          </p>
        </div>

        <p className="text-neutral-900 font-normal text-[13px]">
          {notification?.description}
        </p>
      </Link>
    </div>
  );
}
