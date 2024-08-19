"use client";

import pdf from "@/../../public/assets/pdfFile.png";
import word from "@/../../public/assets/microsoft-word.png";
import excel from "@/../../public/assets/microsoft-excel.png";
import ppt from "@/../../public/assets/microsoft-ppt.jpg";
import jpg from "@/../../public/assets/jpg-image.jpg";

export const getFileExtension = (url: string) => {
  const parts = url?.split(".");
  return parts[parts.length - 1].toLowerCase();
};

export const formatFileNameAndDesc = (extension: string) => {
  switch (extension) {
    case "pdf":
      return { name: "PDF", description: "This is a PDF file", image: pdf };
    case "docx":
      return {
        name: "DOCX",
        description: "This is a DOCX document",
        image: word,
      };
    case "xlsx":
      return {
        name: "Excel",
        description: "This is an Excel file",
        image: excel,
      };
    case "jpeg":
    case "jpg":
    case "png":
      return {
        name: "Image",
        description: "This is an image file",
        image: jpg,
      };
    case "pptx":
    case "ppsx":
      return {
        name: "PowerPoint",
        description: "This is a PowerPoint presentation",
        image: ppt,
      };
    default:
      return { name: "File", description: "This is a file", image: pdf };
  }
};
