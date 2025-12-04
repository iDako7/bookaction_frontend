"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const DEFAULT_FALLBACK_SRC = "/media/image_not_found.png";

export type FallbackImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  fallbackSrc?: string;
};

export function FallbackImage({
  src,
  alt,
  className,
  fallbackSrc = DEFAULT_FALLBACK_SRC,
  onError,
  ...rest
}: FallbackImageProps) {
  const [currentSrc, setCurrentSrc] = React.useState(src ?? fallbackSrc);

  React.useEffect(() => {
    setCurrentSrc(src ?? fallbackSrc);
  }, [src, fallbackSrc]);

  const handleError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    if (currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    }

    onError?.(event);
  };

  return (
    <img
      src={currentSrc ?? fallbackSrc}
      alt={alt ?? "BookAction media"}
      onError={handleError}
      className={cn(className)}
      {...rest}
    />
  );
}
