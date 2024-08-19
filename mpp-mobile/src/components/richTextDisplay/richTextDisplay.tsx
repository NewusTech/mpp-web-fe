"use client";

import DOMPurify from "dompurify";
import { useEffect, useState } from "react";

interface RichTextDisplayProps {
  content: string;
}

export const RichTextDisplay = ({ content }: RichTextDisplayProps) => {
  const [sanitizedContent, setSanitizedContent] = useState<any>("");

  useEffect(() => {
    setSanitizedContent(DOMPurify.sanitize(content));
  }, [content]);

  return (
    <div
      className="prose"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};
