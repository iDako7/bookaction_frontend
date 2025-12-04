"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ImageWithFallbackProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export function ImageWithFallback({
  src,
  alt,
  className,
  fallbackSrc = "/media/image_not_found.png",
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [prevSrc, setPrevSrc] = useState(src);

  if (src !== prevSrc) {
    setImgSrc(src);
    setHasError(false);
    setPrevSrc(src);
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      src={hasError ? fallbackSrc : imgSrc}
      alt={alt}
      className={cn("transition-opacity duration-300", className)}
      onError={() => {
        setHasError(true);
        setImgSrc(fallbackSrc);
      }}
    />
  );
}
