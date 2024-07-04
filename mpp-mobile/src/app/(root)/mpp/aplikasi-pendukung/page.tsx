"use client";

import fetchAppSupport from "@/components/fetching/appSupport/appSupport";
import CardAplikasiPendukung from "@/components/landing/aboutScreen/cardAplikasiPendukung/cardAplikasiPendukung";
import PaginationComponent from "@/components/pagination/paginationComponent";
import { AppType } from "@/types/type";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AplikasiPendukung() {
  const [apps, setApps] = useState<AppType[]>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;
  const limitData = 1000000;
  const fetchPendukungApp = async (page: number, limit: number) => {
    try {
      const app = await fetchAppSupport(page, limit);

      setApps(app.data);
    } catch (error) {
      toast("Gagal mendapatkan data!");
    }
  };

  useEffect(() => {
    fetchPendukungApp(1, limitData);
  }, []);

  const paginate = (
    items: AppType[],
    pageNumber: number,
    itemsPerPage: number
  ) => {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  const supportApps = paginate(apps || [], currentPage, itemsPerPage);

  return (
    <div className="flex flex-col justify-between pt-8 md:px-28 mx-8 md:mx-0 md:gap-y-8">
      <div className="flex flex-col md:flex-row md:grid md:grid-cols-3 flex-wrap gap-x-2 gap-y-4">
        {supportApps &&
          supportApps?.map((app: AppType, i: number) => {
            return <CardAplikasiPendukung key={i} app={app} />;
          })}
      </div>

      <PaginationComponent
        totalItems={apps?.length || 0}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
