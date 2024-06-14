"use client";

import { createContext, useContext, useState } from "react";

const GlobalContext = createContext<any>([]);

export default function MultipleForm({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState([]);
  const [survei, setSurvei] = useState([]);
  const [finalData, setFinalData] = useState([]);

  return (
    <GlobalContext.Provider
      value={{ data, setData, survei, setSurvei, finalData, setFinalData }}>
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () => useContext(GlobalContext);
