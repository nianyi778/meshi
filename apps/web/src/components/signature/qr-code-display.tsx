"use client";

import { useEffect, useRef } from "react";
import QRCode from "qrcode";

interface QRCodeDisplayProps {
  url: string;
  size?: number;
  color?: string;
}

export function QRCodeDisplay({
  url,
  size = 60,
  color = "#000000",
}: QRCodeDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !url) return;
    QRCode.toCanvas(canvasRef.current, url, {
      width: size,
      margin: 1,
      color: {
        dark: color,
        light: "#FFFFFF",
      },
    });
  }, [url, size, color]);

  if (!url) return null;

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      style={{ display: "block" }}
    />
  );
}
