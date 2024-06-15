"use client";

import AccordingComponent from "../others/accordionComponent";
import { useEffect, useState } from "react";

interface faqType {
  id: number;
  question: string;
  answer: string;
}

export default function FAQScreen() {
  const [faqs, setFaqs] = useState([]);

  const fetchFaq = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/faq/get`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    const result = await response.json();

    setFaqs(result.data);
  };

  useEffect(() => {
    fetchFaq();
  }, []);

  return (
    <div className="flex flex-col items-center mt-[56px]">
      <div className="flex flex-col items-center gap-[8px]">
        <h3 className="text-primary-800 md:text-[32px] font-semibold text-[16px]">
          FAQ MPP
        </h3>

        <p className="text-[10px] md:text-[16px] text-primary-700 font-light px-[30px] text-center">
          Pertanyaan yang sering diajukan terkait dengan Mal Pelayanan Publik
        </p>
      </div>

      <div className="flex flex-col md:w-full justify-center gap-[8px] mt-[16px] mx-[30px] md:mx-[70px]">
        {faqs.map((faq: faqType, i: number) => {
          return <AccordingComponent key={i} faq={faq} />;
        })}
      </div>
    </div>
  );
}
