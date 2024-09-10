"use client";

import DOMPurify from "dompurify";
import { useEffect, useState } from "react";

interface RichTextDisplayProps {
  content: string;
  keys?: boolean | undefined;
}

export const RichTextDisplay = ({ content, keys }: RichTextDisplayProps) => {
  const [sanitizedContent, setSanitizedContent] = useState<any>("");

  useEffect(() => {
    setSanitizedContent(DOMPurify.sanitize(content));
  }, [content]);

  return (
    <div
      className={`${keys === true ? "prose-mpp" : "prose"}`}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};
